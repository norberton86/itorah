import { Injectable } from '@angular/core';
declare var $: any;
declare var WowzaPlayer: any;

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {

  constructor(private http: Http) {
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
  Play(title: string, url: string, onlyAudio: boolean, speaker: string, sponsor: string) {


    if (sponsor == '' && !this.requesting) {

      this.requesting = true

      this.getMediaSponsor().subscribe(result => {

        this.requesting = false

        if (result == '')
          sponsor = "Sponsor this shiur"
        else
          sponsor = result

        this.Build(title, url, onlyAudio, speaker, sponsor)

      }, error => {
        this.requesting = false
        sponsor = "Sponsor this shiur"
        this.Build(title, url, onlyAudio, speaker, sponsor)
      }, () => { })

    }
    else
    if(!this.requesting) {
      this.Build(title, url, onlyAudio, speaker, sponsor)
    }



  }

  Build(title: string, url: string, onlyAudio: boolean, speaker: string, sponsor: string) {
    let self = this;

    if ($('#video-modal').length == 0)     //if not exist
      $.notify({                          //create the popup
        title: "",
        message: '<div style="padding-top:0.5em">' +
        '<p  style="width: 100%;text-align: center;padding-bottom: 0.2em;">' + title + '</p>' +
        '<p  style="width: 100%;text-align: center;padding-bottom: 0.2em;">' + speaker + '</p>' +
        '<p id="sponsorPlay" style="width: 100%;text-align: center;padding-bottom: 0.2em;cursor: pointer;"><a href="#/"><b>' + sponsor + '</b></a></p>' +
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

    WowzaPlayer.create('video-modal',
      {

        "license": "PLAY1-dD8ur-NjfMh-andPW-beKnB-t4nYZ",
        "title": title,
        "description": "",
        "sourceURL": url, //"http://media.learntorah.com/LT-Video/mp4:RZE-350.mp4/playlist.m3u8"
        "autoPlay": true,
        "volume": "75",
        "mute": false,
        "loop": false,
        "audioOnly": onlyAudio,
        "uiShowQuickRewind": true,
        "uiQuickRewindSeconds": "30"
      });


    $('.alert-info').css('background-color', 'white'); //change background-color to white 
    $('button[data-notify="dismiss"]').click(function () {  //stop when the close icon be closed

      try {
        self.Closetream();
      }
      catch (e) {

      }


    });

    $('#sponsorPlay').click(function () {
      if (self.isAuthenticated()) {
        $('#sponsor').toggleClass('shown');
        $('#sponsorPlaceHolder').addClass('hidden')
        $('#form-sponsor-shiur').removeClass('hidden')
        $('#form-sponsor-day').addClass('hidden')
        $('#form-sponsor-play').addClass('hidden')
      }
    })

  }


  Closetream() {
    if (WowzaPlayer.get('video-modal') != null)
      WowzaPlayer.get('video-modal').destroy()
  }


  PlayAudio(title: string, url: string,sponsor:string) {

     
    if (sponsor == '' && !this.requesting) {

      this.requesting = true

      this.getMediaSponsor().subscribe(result => {

        this.requesting = false

        if (result == '')
          sponsor = "Sponsor this shiur"
        else
          sponsor = result

        this.BuildAudio(title, url, sponsor)

      }, error => {
        this.requesting = false
        sponsor = "Sponsor this shiur"
        this.BuildAudio(title, url, sponsor)
      }, () => { })
  }
  }

  BuildAudio(title: string, url: string,sponsor:string)
  {
    let self = this;

    var finalSponsor= '<p id="sponsorPlayAudio" style="width: 100%;text-align: center;padding-bottom: 0.2em;cursor: pointer;"><a href="#/"><b>' + sponsor + '</b></a></p>'

    if ($('#mediaAudio').length == 0)     //if not exist
    {
      $.notify({                          //create the popup
        title: "",
        message: finalSponsor+ '<video id="mediaAudio" controls="" autoplay="" name="media" style="background-image: url(./assets/build/css/images/images/audio.jpg);background-size: 100% 80%;"><source src="' + url + '" type="audio/mpeg"></video>'
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
