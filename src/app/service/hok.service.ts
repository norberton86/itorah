import { Injectable } from '@angular/core';

import { Hok } from '../model/shiurim';
import { Chumash} from '../model/Hok/chumash';
import { Parasha} from '../model/Hok/parasha';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HokService extends Service{

   value:boolean;
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/Hok/";

    }

   readChumash() :Observable<Chumash[]>{

    return Observable.create(observer => {
           
            observer.next([{id:1,name:"Bereshit"},{id:2,name:"Shemot"}]);
            
            observer.complete();
    });

   }

  readParasha(idChumash:number) :Observable<Parasha[]>{

    return Observable.create(observer => {
           
           if(idChumash==1)
            observer.next([{id:1,name:"Noach"},{id:2,name:"Lech Lecha"}]);
            else
            observer.next([{id:3,name:"Bo"},{id:4,name:"Yitro"}]);

            observer.complete();
    });

   }

   readHok(idChumash:number,idParasha:number) :Observable<Hok[]>{

    return Observable.create(observer => {
           
         this.value=!this.value;
           if(this.value)
            observer.next([{
    "title": "Yedid / 2Hands",
    "dateRecorded": "2017-07-30T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/2.mp3",
    "video": "",
    "dayWeek":"Sunday",
    "myClass":"Class"
  },
  {
    "title": "The Root Cause of Hurban",
    "dateRecorded": "2017-07-30T00:00:00",
    "length": "77:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/3.mp3",
    "video": "",
    "dayWeek":"Tuesday",
    "myClass":"Additional"
  }]);
            else
            observer.next([{
    "title": "The Transition / Bene Gad",
    "dateRecorded": "2017-07-24T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/4.mp3",
    "video": "",
    "dayWeek":"Wednesday",
    "myClass":"Rashi"
  },
  {
    "title": "Word Power",
    "dateRecorded": "2017-07-24T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
    "video": "",
    "dayWeek":"Thursday",
    "myClass":"Class"
  }]);
           
        
            observer.complete();
    });
  
}

}
