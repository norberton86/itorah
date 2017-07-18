import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
 val:string=""
 valEmunah:string=""

  Accion()
  {
    this.val=this.Generate();
  }

  AccionEmunah()
  {
    this.valEmunah=this.Generate();
  }

  Generate()
  {
    return  Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
  }

}
