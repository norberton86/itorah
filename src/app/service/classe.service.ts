import { Injectable } from '@angular/core';

import { Classes } from '../model/classes';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ClasseService extends Service {


  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/Classes";

  }


  read(): Observable<Classes[]> {

    return Observable.create(observer => {

     var data=[]

      for(var i=0;i<40;i++)
      {
         data.push({
          url: "http://peleyoetz.com/PeleYoetz/2.mp3",
          date: new Date("7/31/2017"),
          title: "Amazing Stories "+(i+1),
          speaker: "Mansour, Robbi Eli",
          duration: "30",
          language: "EN",
          status: "Not Started",
          id:"1",
          sourceID:1
        })

        data.push(
        {
          url: "http://peleyoetz.com/PeleYoetz/2.mp3",
          date: new Date("7/28/2017"),
          title: "Amazing Stories "+(i+2),
          speaker: "Mansour, Robbi Eli",
          duration: "30",
          language: "EN",
          status: "Not Started",
          id:"2",
          sourceID:1
        })

        data.push({
          url: "http://peleyoetz.com/PeleYoetz/2.mp3",
          date: new Date("8/15/2017"),
          title: "Amazing Stories "+(i+3),
          speaker: "Mansour, Robbi Eli",
          duration: "30",
          language: "EN",
          status: "Not Started",
          id:"3",
          sourceID:1
        })
      }

      observer.next(data);

      observer.complete();
    });

  }


  /* public read(): Observable<Classes[]> {
       
       return this.http.get(this.ruta).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
   }*/

}