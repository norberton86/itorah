import { Injectable } from '@angular/core';
declare var $: any;
declare var WowzaPlayer: any;

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from "rxjs/Subscription";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/timer";
import 'rxjs/add/operator/map';
import { Service } from '../model/service';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlayerService extends Service {

  private timerSubscription: AnonymousSubscription;
  private subject: Subject<any> = new Subject<any>();
  private subjectDay: Subject<string> = new Subject<string>();

  constructor(http: Http) {
    super(http);
  }

  StartPush(data: Netflix, isWow: boolean) {


    this.timerSubscription = Observable.interval(10000).subscribe(x => {

      if (isWow)
        data.position = Math.floor(WowzaPlayer.get('video-modal').getCurrentTime() / 1000)
      else {
        var position: any = document.getElementById('mediaAudio')
        data.position = Math.floor( position.currentTime)
      }

      if (data.position != 0) { //only push if the time is bigger than 0
        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());
        h.append('Content-Type', 'application/json');

        this.http.post("http://itorahapi.3nom.com/api/MediaPosition/save", data, { headers: h }).subscribe(response => {

          console.log(data.position)

        }, error => { }, () => { })
      }

    });
  }

  wow: any
  setLastPosition(data: Netflix) {

    let self = this
    this.wow.play()
    this.wow.onPlay(function (a) {

      self.getLastPosition(data).subscribe(result => {

        if (result == parseInt(result, 10)) //if is a integer number 
        {

          setTimeout(function () {
            var ad: any = document.getElementById('video-modal-Video')
            ad.currentTime = parseInt(result);
          }, 10000)

        }
        self.StartPush(data, true)
      }, error => {
        self.StartPush(data, true)
      }, () => { })

    });

  }

  setLastPositionAudio(title: string, url: string, sponsor: string, data: Netflix) {


    /* var initialPosition = "#t=" + 120
     this.CreatePlayer(title, url, sponsor, initialPosition) 
     this.StartPush(data, false)*/

    
    this.getLastPosition(data).subscribe(result => {

      var initialPosition=''
      if (result == parseInt(result, 10)) //if is a integer number 
      {
       initialPosition = "#t=" + result
      }
      
      this.CreatePlayer(title, url, sponsor, initialPosition)
      this.StartPush(data, false)
    },
    error => {
      this.CreatePlayer(title, url, sponsor)
      this.StartPush(data, false)
    },
    () => { })

  }

  getLastPosition(data: Netflix): Observable<any> {
    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.post("http://itorahapi.3nom.com/api/MediaPosition/get", data, { headers: h }).map((response) => {
      let body = response.json();
      return body;
    })
  }

  StopPush() {
    if (this.timerSubscription)
      this.timerSubscription.unsubscribe()
  }

  getMediaSponsor(): Observable<string> {

    return this.http.get("http://itorahapi.3nom.com/api/Sponsor/mediaplayer").map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }



  requesting: boolean = false;
  Play(title: string, url: string, onlyAudio: boolean, speaker: string, sponsor: string, sourceid: number, mediaId: string) {


    if (sponsor == '' && !this.requesting) {

      this.requesting = true

      this.getMediaSponsor().subscribe(result => {

        this.requesting = false

        if (result == '')
          sponsor = "Sponsor this Shiur"
        else
          sponsor = result

        this.Build(title, url, onlyAudio, speaker, sponsor, sourceid, mediaId)

      }, error => {
        this.requesting = false
        sponsor = "Sponsor this Shiur"
        this.Build(title, url, onlyAudio, speaker, sponsor, sourceid, mediaId)
      }, () => { })

    }
    else
      if (!this.requesting) {
        this.Build(title, url, onlyAudio, speaker, sponsor, sourceid, mediaId)
      }



  }

  Build(title: string, url: string, onlyAudio: boolean, speaker: string, sponsor: string, sourceId: number, mediaId: string) {
    let self = this;

    var sponsorHtml=''
    if(onlyAudio)
        sponsorHtml+='<p id="sponsorPlay" style="width: 100%;text-align: center;padding-bottom: 0.2em;cursor: pointer;"><a href="#/"><b>' + sponsor + '</b></a></p>'

    if ($('#video-modal').length == 0)     //if not exist
      $.notify({                          //create the popup
        title: "",
        message: '<div style="padding-top:0.5em">' +
        '<p  style="width: 100%;text-align: center;padding-bottom: 0.2em;">' + title + '</p>' +
        '<p  style="width: 100%;text-align: center;padding-bottom: 0.2em;" id="seek">' + speaker + '</p>'
         + sponsorHtml+
        '<div  id="video-modal" class="" style="width: inherit;height: 20em;">' +
        '</div>' +
        '</div>'
      },
        {
          delay: 0,                       //never autoclose
          placement: {                    //placed
            from: "bottom",
            align: "right"
          },
          animate: {                                   //animation to in/out
            enter: 'animated bounceInRight',
            exit: 'animated bounceOutRight'
          }
        });

    self.Closetream();

    self.wow = WowzaPlayer.create('video-modal',
      {

        "license": "PLAY1-dD8ur-NjfMh-andPW-beKnB-t4nYZ",
        "title": title,
        "description": "",
        "sourceURL": url, //"http://media.learntorah.com/LT-Video/mp4:RZE-350.mp4/playlist.m3u8"
        "autoPlay": false,
        "volume": "25",
        "mute": false,
        "loop": false,
        "audioOnly": onlyAudio,
        "uiShowQuickRewind": true,
        "uiQuickRewindSeconds": "30"
      });

    if(onlyAudio){
    $('#video-modal-Title').remove()
    $('#video-modal-Info').css('background-image','url(./assets/build/css/images/images/speakers/'+speaker.replace(' ','')+'.png)')  
    $('#video-modal-Info').css('background-size','100% 100%')
    }

    $('.alert-info').css('background-color', 'white'); //change background-color to white 
    $('button[data-notify="dismiss"]').click(function () {  //stop when the close icon be closed

      try {
        self.StopPush()
        self.Closetream();
      }
      catch (e) {

      }


    });

    $('#sponsorPlay').click(function () {
      if (self.isAuthenticated()) {

         self.setShiurFromPlayer({title:title,id:mediaId})

        $('#sponsor').toggleClass('shown');
        $('#sponsorPlaceHolder').addClass('hidden')
        $('#form-sponsor-shiur').removeClass('hidden')
        $('#form-sponsor-day').addClass('hidden')
        $('#form-sponsor-play').addClass('hidden')
      }
    })

    if (this.getToken() != undefined && this.getToken() != "")  //only push if the user is login
    {
      this.setLastPosition(this.CreateNetFlix(sourceId, mediaId, "", onlyAudio))
    }


  }

  setShiurFromPlayer(data:any)
  {
     this.subject.next(data)
  }

  getShiurFromPlayer(): Observable<any> {
    return this.subject.asObservable();
  }
  
  setDay(day:string)
  {
    this.subjectDay.next(day)
  }

  getDayFromPlayer():Observable<string>
  {
    return this.subjectDay.asObservable()
  }
  

  CreateNetFlix(sourceid: number, mediaId: string, position: any, isAudio: boolean): Netflix {
    var netflix = new Netflix()
    netflix.id = null
    netflix.sourceId = sourceid
    netflix.mediaId = mediaId
    netflix.position = position
    netflix.isAudio = isAudio
    return netflix
  }

  Closetream() {
    if (WowzaPlayer.get('video-modal') != null)
      WowzaPlayer.get('video-modal').destroy()
  }

  PlayAudio(title: string, url: string, sponsor: string, sourceId: number, mediaId: string) {

    if (sponsor == '' && !this.requesting) {

      this.requesting = true

      this.getMediaSponsor().subscribe(result => {

        this.requesting = false

        if (result == '')
          sponsor = "Sponsor this Media"
        else
          sponsor = result

        this.BuildAudio(title, url, sponsor, sourceId, mediaId)

      }, error => {
        this.requesting = false
        sponsor = "Sponsor this Media"
        this.BuildAudio(title, url, sponsor, sourceId, mediaId)
      }, () => { })
    }
    else
    this.BuildAudio(title, url, sponsor, sourceId, mediaId)
  }

  BuildAudio(title: string, url: string, sponsor: string, sourceId: number, mediaId: string) {

    if (this.getToken() != undefined && this.getToken() != "")  //only push if the user is login
    {
      this.setLastPositionAudio(title, url, sponsor, this.CreateNetFlix(sourceId, mediaId, "", true)) //try to get first the last position 
    }
    else
      this.CreatePlayer(title, url, sponsor)    //create directly

  }

  CreatePlayer(title: string, url: string, sponsor: string, initialPosition = "") {
    let self = this

   var finalSponsor=''

   if(title.indexOf('<>')>0) //to check if is being calling from halacha or tehellim
   {
    title= title.replace("<>", "");  //remove the unnecesarry characters
    finalSponsor+="<p>"+title+"</p>"
   }
   

    finalSponsor += '<p id="sponsorPlayAudio" style="width: 100%;text-align: center;padding-bottom: 0.2em;cursor: pointer;"><a href="#/"><b>' + sponsor + '</b></a></p>'

    if ($('#mediaAudio').length == 0)     //if not exist
    {

      var picture="audio.jpg"
      if(url.indexOf("www.dailytehillim.com")>=0)
      picture="hacham.png"

      $.notify({                          //create the popup
        title: "",
        message: finalSponsor + '<video id="mediaAudio" controls="" autoplay="" name="media" style="background-image: url(./assets/build/css/images/images/'+picture+');background-size: 100% 80%;"><source src="' + url + initialPosition + '" type="audio/mpeg"></video>'
      },
        {
          delay: 0,                       //never autoclose
          placement: {                    //placed
            from: "bottom",
            align: "right"
          },
          animate: {                                   //animation to in/out
            enter: 'animated bounceInRight',
            exit: 'animated bounceOutRight'
          }
        });


      $('.alert-info').css('background-color', 'white'); //change background-color to white 
      $('.alert-info').css('text-align', 'center');
    }
    else {
      $('#mediaAudio').attr('src', url)
    }


    $('#sponsorPlayAudio').click(function () {
      if (self.isAuthenticated()) {
        $('#sponsor').toggleClass('shown');
        $('#sponsorPlaceHolder').addClass('hidden')
        $('#form-sponsor-play').removeClass('hidden')
        $('#form-sponsor-day').addClass('hidden')
        $('#form-sponsor-shiur').addClass('hidden')
      }
    })

    $('button[data-notify="dismiss"]').click(function () {  //stop when the close icon be closed

      try 
      {
        self.StopPush()   
      }
      catch (e) {

      }

    });

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


}

export class Netflix {
  id: number
  sourceId: number
  mediaId: string
  position: any
  isAudio: boolean
}
