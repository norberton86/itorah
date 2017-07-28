import { Component, OnInit } from '@angular/core';
declare var $:any; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  

 val:string=""
 valEmunah:string=""
 valHalacha:string=""
 valPele:string=""
 valSpeaker:string=""


 loader:boolean=false;
 amountSpeaker:string=""

 ngOnInit() {

   setTimeout(function(){

     $('.top input').click(function(){                             //when click the "Sign in Button" in podcast,queue,subscribe
      var $thisDropdown = $(this).closest('li').find('.dropdown'); //find the closest li
      $thisDropdown
					.hide()
					.removeClass('shown')  //close it!!!!

      
      $('.nav-access > li > .dropdown-signin').addClass('shown').show() //open the Sign in session
      
    }) 
   },500)
    
  }

  Accion()
  {
    this.val=this.Generate();
  }

  AccionEmunah()
  {
    this.valEmunah=this.Generate();
  }
 
  AccionHalacha()
  {
    this.valHalacha=this.Generate();
  }

  AccionPele()
  {
    this.valPele=this.Generate();
  }
  
  AccionSpeaker()
  {
    this.valSpeaker=this.Generate();
  }

  Generate()
  {
    return  Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
  }

  ShowLoader(arg) //bind to eventEmitter
  {
    this.loader=arg;
  }

  ChangeSpeakers(arg) //bind to eventEmitter
  {
    this.amountSpeaker=arg;
  }

  VerifyUser()
  {
   if(localStorage.getItem('userItorah')!=null&&localStorage.getItem('userItorah')!="")
   return false;
   else
   return true;
  }


}
