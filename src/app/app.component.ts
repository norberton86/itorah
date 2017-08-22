import { Component, OnInit } from '@angular/core';
import { AnalitycService} from './service/analityc.service';
declare var $:any; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AnalitycService]
})
export class AppComponent implements OnInit{
  

 val:string=""
 valEmunah:string=""
 valHalacha:string=""
 valPele:string=""
 valSpeaker:string=""
 valHok:string=""


 loader:boolean=false;
 amountSpeaker:string=""
 gSearch:string;


 emailRecover:string=""

  constructor(private analitycService:AnalitycService){ }


keyDownFunction(event) {
	if (event.keyCode == 13) {
		$('#gSearch').toggleClass('vissible');
		$('.header .search .search-field').blur();
	}
}

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
    
   this.CheckResetPassword(); 
  }

  CheckResetPassword()
  {
    if(location.href.indexOf('#email:')>=0)
     {
      this.emailRecover = location.href.split('#email:')[1];
      $("#recover").toggleClass('shown');
     }
  }


  Accion()
  {
    this.val=this.Generate();
    this.analitycService.emitEvent("Module","Open","Tehillim Read");
  }

  AccionEmunah()
  {
    this.valEmunah=this.Generate();
    this.analitycService.emitEvent("Module","Open","Emunah");
  }
 
  AccionHalacha()
  {
    this.valHalacha=this.Generate();
    this.analitycService.emitEvent("Module","Open","Halacha");
  }

  AccionPele()
  {
    this.valPele=this.Generate();
    this.analitycService.emitEvent("Module","Open","PeleYoetz");
  }
  
  AccionSpeaker()
  {
    this.valSpeaker=this.Generate();
    this.analitycService.emitEvent("Module","Open","Speakers");
  }

  AccionHok()
  {
    this.valHok=this.Generate();
    this.analitycService.emitEvent("Module","Open","Hok");
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
