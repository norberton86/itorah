import { Injectable } from '@angular/core';
declare var $: any;
declare var WowzaPlayer: any;

@Injectable()
export class PlayerService {

  constructor() {
  }



  Play(title: string, url: string, onlyAudio: boolean,speaker:string,sponsor:string) {

    let self = this;
    if(sponsor=='')
    sponsor="Sponsor this shiur"


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
      }
    })


  }


  Closetream() {
    if (WowzaPlayer.get('video-modal') != null)
      WowzaPlayer.get('video-modal').destroy()
  }


  PlayAudio(title: string, url: string) {

    let self = this;

    if ($('#mediaAudio').length == 0)     //if not exist
    {
      $.notify({                          //create the popup
        title: "",
        message: '<video id="mediaAudio" controls="" autoplay="" name="media" style="background-image: url(./assets/build/css/images/images/audio.jpg);background-size: 100% 80%;"><source src="' + url + '" type="audio/mpeg"></video>'
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
