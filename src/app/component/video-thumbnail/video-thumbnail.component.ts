import { Component, OnInit } from '@angular/core';
import { Home, Lectures } from '../../model/Home';
import { HomeService } from '../../service/home.service';
import { PlayerService } from '../../service/player.service';


declare var $: any;
declare var WowzaPlayer: any;

@Component({
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.css']
})
export class VideoThumbnailComponent implements OnInit {

  videos: Array<Lectures>;
  videosFull: Array<Lectures>;
  CurrentPlaying: Lectures;
  firstTime: boolean = false;


  constructor(private homeService: HomeService, private playerService: PlayerService) {
    this.videos = [];
  }

  ngOnInit() {
    this.Read();
  }

  Read() {
    this.homeService.read().subscribe(
      result => this.setCount(result)
    )
  }

  setCount(home: Home) {
    home.Table2.forEach(function (a) {
      a.Title = a.Title.toLowerCase()
    })
    this.videosFull = home.Table2.sort(this.Compare);
    this.videos=this.videosFull
    this.Play(this.videosFull[0]);

  }

  Compare(a, b) {
    if (a.SortOrder < b.SortOrder)
      return -1;
    if (a.SortOrder > b.SortOrder)
      return 1;
    return 0;
  }

  Play(video: Lectures) {

    if (WowzaPlayer.get('video-body') != null)
      WowzaPlayer.get('video-body').destroy()


   var myPlayer = WowzaPlayer.create('video-body',
      {

        "license": "PLAY1-dD8ur-NjfMh-andPW-beKnB-t4nYZ",

        "title": "",

        "description": "",

        "sourceURL": video.url,

        "autoPlay": this.firstTime,

        "volume": "75",

        "mute": false,

        "loop": false,

        "audioOnly": false,

        "uiShowQuickRewind": true,

        "uiQuickRewindSeconds": "30"

      });

    this.CurrentPlaying = video;

    
  /*  while(this.videos.length>0)
    {
      this.videos.length = this.videos.length - 1;
    }

    for (var i = 0; i < this.videosFull.length; i++)
      if (this.videosFull[i].ShiurID !== this.CurrentPlaying.ShiurID)
        {
          this.videos.push(this.videosFull[i]);
        }*/

    this.firstTime = true;

    this.currentTitle = video.Title
    this.currentSpeaker = video.Speaker
    this.currentMediaId = video.ShiurID.toString()

    this.GetSponsor()


   let self=this
    myPlayer.onLoad(function(){
       self.SetImageOnPlayer(video)
    });
  }


  //----------------------------------------------------------------------

  currentTitle: string = ''
  currentSpeaker: string = ''
  currentMediaId: string = ''
  sponsor: string = "Click Here To Sponsor"
  requesting: boolean = false


  GetSponsor() {
    if (this.sponsor == "Click Here To Sponsor" && !this.requesting) {

      this.requesting = true

      this.playerService.getMediaSponsor().subscribe(result => {

        this.requesting = false

        if (result == '')
          this.sponsor = "Click Here To Sponsor"
        else
          this.sponsor = result

      }, error => {
        this.requesting = false
        this.sponsor = "Click Here To Sponsor"
      }, () => { })

    }
  }

  SetImageOnPlayer(v: Lectures) {

    if (v.MediaType == "Audio") //show the picture of the speaker
    {
      $('.myVideoContainer #video-body-Container').css('background-image', 'url(./assets/build/css/images/images/speakers/' + this.getImageName(v) + ')')
    }

  }

  OpenSponsor() {

    if (this.isAuthenticated()) {

      this.playerService.setShiurFromPlayer({ title: this.currentTitle, id: this.currentMediaId })

      $('#sponsor').toggleClass('shown');
      $('#sponsorPlaceHolder').addClass('hidden')
      $('#form-sponsor-shiur').removeClass('hidden')
      $('#form-sponsor-day').addClass('hidden')
      $('#form-sponsor-play').addClass('hidden')

      window.scrollTo(0, 0)
    }

    //close the other popup
    this.CloseOtherPopu("#sponsor")
  }

  CloseOtherPopu(id: string) {
    $('.popup').each(function () {
      if ($(this).attr('id') != id.split("#")[1])
        $(this).removeClass("shown")
    })
  }

  isAuthenticated(): boolean {
    let self = this;
    if (localStorage.getItem('userItorah') == null || localStorage.getItem('userItorah') == "")//needs credentials to access
    {
      setTimeout(function () {

        $('.nav-access > li > .dropdown-signin').addClass('shown').show() //open the Sign in session

      }, 500)
      return false;
    }
    else
      return true;
  }

  getImageName(l: Lectures): string {
    var arr = l.Speaker.split(" ")
    return arr[1] + arr[2] + ".png"
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------

  slideConfig = {"slidesToShow": 5, "slidesToScroll": 1};

  /*slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"},
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];


  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  */

  afterChange(e) {
    console.log('afterChange');
  }
}
