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

@Injectable()
export class PlayerService extends Service {

  private timerSubscription: AnonymousSubscription;

  constructor(http: Http) {
    super(http);
  }

  StartPush(data: Netflix) {


    this.timerSubscription = Observable.interval(10000).subscribe(x => {

      data.position = Math.floor( WowzaPlayer.get('video-modal').getCurrentTime()/1000)

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
         self.StartPush(data)
       }, error => {
         self.StartPush(data)
       }, () => { })

    });

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
          sponsor = "Sponsor this shiur"
        else
          sponsor = result

        this.Build(title, url, onlyAudio, speaker, sponsor, sourceid, mediaId)

      }, error => {
        this.requesting = false
        sponsor = "Sponsor this shiur"
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

    if ($('#video-modal').length == 0)     //if not exist
      $.notify({                          //create the popup
        title: "",
        message: '<div style="padding-top:0.5em">' +
        '<p  style="width: 100%;text-align: center;padding-bottom: 0.2em;">' + title + '</p>' +
        '<p  style="width: 100%;text-align: center;padding-bottom: 0.2em;" id="seek">' + speaker + '</p>' +
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


  PlayAudio(title: string, url: string, sponsor: string) {

    /*if(Array.isArray(url))
    url=url[0].AudioUrl */

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

  BuildAudio(title: string, url: string, sponsor: string) {
    let self = this;

    var finalSponsor = '<p id="sponsorPlayAudio" style="width: 100%;text-align: center;padding-bottom: 0.2em;cursor: pointer;"><a href="#/"><b>' + sponsor + '</b></a></p>'

    if ($('#mediaAudio').length == 0)     //if not exist
    {
      $.notify({                          //create the popup
        title: "",
        message: finalSponsor + '<video id="mediaAudio" controls="" autoplay="" name="media" style="background-image: url(./assets/build/css/images/images/audio.jpg);background-size: 100% 80%;"><source src="' + url + '" type="audio/mpeg"></video>'
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

  timeDifference(d: any, dd: any): string {
    var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      month = day * 30,
      ms = Math.abs(d - dd);

    var months = parseInt((ms / month).toString(), 10);

    ms -= months * month;
    var days = parseInt((ms / day).toString(), 10);

    ms -= days * day;
    var hours = parseInt((ms / hour).toString(), 10);

    ms -= hours * hour;
    var minutes = parseInt((ms / minute).toString(), 10);


    ms -= minutes * minute;
    var seconds = parseInt((ms / second).toString(), 10);

    var finalTime = ""

    if (hours.toString().length == 1)
      finalTime += "0" + hours.toString() + ":"
    else
      finalTime += hours.toString() + ":"

    if (minutes.toString().length == 1)
      finalTime += "0" + minutes.toString() + ":"
    else
      finalTime += minutes.toString() + ":"

    if (seconds.toString().length == 1)
      finalTime += "0" + seconds.toString()
    else
      finalTime += seconds.toString()

    return finalTime
  }

}

export class Netflix {
  id: number
  sourceId: number
  mediaId: string
  position: any
  isAudio: boolean
}
