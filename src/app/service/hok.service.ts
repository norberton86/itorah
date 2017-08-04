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
    "myClass":"Class",
    "id":"1"
  },
  {
    "title": "The Root Cause of Hurban",
    "dateRecorded": "2017-07-30T00:00:00",
    "length": "77:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/3.mp3",
    "video": "",
    "dayWeek":"Monday",
    "myClass":"Additional",
    "id":"2"
  },
  {
    "title": "Tomer Devorah Summer 2017 Part 1",
    "dateRecorded": "2017-07-19T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/3.mp3",
    "video": "",
    "dayWeek":"Tuesday",
    "myClass":"Class",
    "id":"3"
  },
  {
    "title": "Tomer Devorah Summer 2017 Part 2",
    "dateRecorded": "2017-07-19T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/3.mp3",
    "video": "",
    "dayWeek":"Wednesday",
    "myClass":"Additional",
    "id":"4"
  },
  {
    "title": "The Missing Letter / 21 Days",
    "dateRecorded": "2017-07-17T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/3.mp3",
    "video": "",
    "dayWeek":"Thursday",
    "myClass":"Class",
    "id":"5"
  },
  {
    "title": "Vayaamod Pinhas / Challenges",
    "dateRecorded": "2017-07-17T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/3.mp3",
    "video": "",
    "dayWeek":"Friday",
    "myClass":"Additional",
    "id":"6"
  },
  {
    "title": "Perush Rashi on Parashat Korah",
    "dateRecorded": "2017-07-10T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/3.mp3",
    "video": "",
    "dayWeek":"Saturday",
    "myClass":"Class",
    "id":"7"
  }]);
            else
            observer.next([{
    "title": "The Transition / Bene Gad",
    "dateRecorded": "2017-07-24T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/4.mp3",
    "video": "",
    "dayWeek":"Sunday",
    "myClass":"Rashi",
    "id":"1"
  },
  {
    "title": "Word Power",
    "dateRecorded": "2017-07-24T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
    "video": "",
    "dayWeek":"Monday",
    "myClass":"Class",
    "id":"2"
  },
  {
    "title": "Perush Rashi on Parashat Hukat",
    "dateRecorded": "2017-07-10T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
    "video": "",
    "dayWeek":"Tuesday",
    "myClass":"Rashi",
    "id":"3"
  },
  {
    "title": "The Aderet / Jewish Home",
    "dateRecorded": "2017-07-07T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
    "video": "http://media.learntorah.com/LT-Video/mp4:LBM227.mp4/playlist.m3u8",
    "dayWeek":"Wednesday",
    "myClass":"Class",
    "id":"4"
  },
  {
    "title": "Jewish Home Part 2",
    "dateRecorded": "2017-07-07T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
    "video": "",
    "dayWeek":"Thursday",
    "myClass":"Rashi",
    "id":"5"
  },
  {
    "title": "The 10 Coverings / Emunah",
    "dateRecorded": "2017-07-02T00:00:00",
    "length": "0:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
    "video": "",
    "dayWeek":"Friday",
    "myClass":"Class",
    "id":"6"
  },
  {
    "title": "The Well Of Miriam",
    "dateRecorded": "2017-07-02T00:00:00",
    "length": "60:0         ",
    "language": "English",
    "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
    "video": "",
    "dayWeek":"Saturday",
    "myClass":"Rashi",
    "id":"7"
  }]);
           
        
            observer.complete();
    });
  
}

}
