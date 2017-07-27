import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
 val:string=""
 valEmunah:string=""
 valHalacha:string=""
 valPele:string=""
 valSpeaker:string=""


 loader:boolean=false;
 amountSpeaker:string=""

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
