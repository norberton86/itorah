import { Injectable } from '@angular/core';
declare var $:any; 
declare var jwplayer:any; 

@Injectable()
export class PlayerService {

  constructor() { }

  Play(title:string,url:string)
  {
             if($('#video-modal').length==0)     //if not exist
             $.notify({                          //create the popup
	             title: "<h6 id='video-title'></h6>",
                 message:'<div  id="video-modal">'+
		                        '<a href="#">'+
			                          '<img src="/assets/build/css/images/temp/video-image.png" alt="" >'+
                            '</a>'+
                          '</div>'
              },
              {
                delay:0,                       //never autoclose
                placement:{                    //placed
		                        from: "bottom",      
		                        align:"right"
	                        },
                animate: {                                   //animation to in/out
		                        enter:'animated bounceInRight',
		                        exit: 'animated bounceOutRight'
	                       }
              });

             $('#video-title').html(title);        //title of modal

             jwplayer("video-modal").setup({                    //content of modal
              "file": url,
              "image": "/assets/build/css/images/temp/video-thumbnail-image-1.jpg",
              autostart: true,
            });
            
            $('#video-modal').css('width',''); //fix the width
            $('.alert-info').css('background-color','white'); //change background-color to white 

           
  }

}
