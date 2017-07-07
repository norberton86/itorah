import { Injectable } from '@angular/core';
declare var $:any; 
declare var jwplayer:any; 

@Injectable()
export class PlayerService {

  constructor() { }

  Play(title:string,url:string)
  {
             $.notify({
	             title: "<h6>"+title+"</h6>",
                 message:'<div  id="video-modal">'+
		                        '<a href="#">'+
			                          '<img src="/assets/build/css/images/temp/video-image.png" alt="" >'+
                            '</a>'+
                          '</div>'
              },
              {
                delay:0,
                placement:{
		                        from: "bottom",
		                        align:"right"
	                        },
                animate: {
		                        enter:'animated bounceInRight',
		                        exit: 'animated bounceOutRight'
	                       }
              });

             jwplayer("video-modal").setup({
              "file": url,
              "image": "/assets/build/css/images/temp/video-thumbnail-image-1.jpg",
              autostart: true,
            });
            
            $('#video-modal').css('width','');

           
  }

}
