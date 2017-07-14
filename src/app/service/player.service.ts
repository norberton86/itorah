import { Injectable } from '@angular/core';
declare var $: any;
declare var WowzaPlayer: any;

@Injectable()
export class PlayerService {

  constructor() { }

     Play(title: string, url: string) {
      if ($('#video-modal').length == 0)     //if not exist
      $.notify({                          //create the popup
        title: "",
        message: '<div style="padding-top:0.5em">'+
                   '<div  id="video-modal" class="" style="width: inherit;height: 20em;">' +
                   '</div>'+
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

     

      WowzaPlayer.create('video-modal',
      {

        "license": "PLAY1-dD8ur-NjfMh-andPW-beKnB-t4nYZ",

        "title": title,

        "description": "",

        "sourceURL":    "http://media.learntorah.com/LT-Video/mp4:LBM227.mp4/playlist.m3u8",

        "autoPlay": true,

        "volume": "75",

        "mute": false,

        "loop": false,

        "audioOnly": false,

        "uiShowQuickRewind": true,

        "uiQuickRewindSeconds": "30"

      });

      $('div[data-notify="container"]').css('width','27em');
      $('.alert-info').css('background-color', 'white'); //change background-color to white 
      $('button[data-notify="dismiss"]').click(function(){  //stop when the close icon be closed
           
              WowzaPlayer.get('video-modal').destroy()
           
      });

  }

}
