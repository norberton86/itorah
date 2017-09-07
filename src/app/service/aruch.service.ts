import { Injectable } from '@angular/core';

import { Siman } from '../model/siman';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AruchService  extends Service {


  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/Aruch";

  }


  read(): Observable<Siman[]> {

    return Observable.create(observer => {

     var data=[]

      for(var i=1;i<=169;i++)
      {
         data.push({
          title: "Siman "+i,
          id: i,
          pdf:"http://peleyoetz.com/PeleYoetz/Pdf/Hebrew2.pdf",
          audios:[{letter:"A",url:"http://peleyoetz.com/PeleYoetz/2.mp3"},
                  {letter:"B",url:"http://peleyoetz.com/PeleYoetz/2.mp3"},
                  {letter:"C",url:"http://peleyoetz.com/PeleYoetz/2.mp3"}  
          ]
        })

      }

      observer.next(data);

      observer.complete();
    });

  }

 

 /*public read(): Observable<Siman[]> {
       
       return this.http.get(this.ruta).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
   }
*/

}