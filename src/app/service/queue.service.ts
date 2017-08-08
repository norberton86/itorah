import { Injectable } from '@angular/core';

import { Shiurim, ItemQueue } from '../model/shiurim';
import { ServiceLogin } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';


@Injectable()
export class QueueService extends ServiceLogin {

  private subject: Subject<ItemQueue> = new Subject<ItemQueue>();


  constructor(http: Http) {
    super(http);

  }


  read(token: string): Observable<ItemQueue[]> {

    return Observable.create(observer => {

      var data = [{
        "title": "The Transition / Bene Gad",
        "dateRecorded": new Date(),
        "length": "60:0         ",
        "language": "English",
        "audio": "http://peleyoetz.com/PeleYoetz/4.mp3",
        "video": "",
        "id": "1",
        "wowzaVideoUrl": "",
        "speakerName": "Rabbi Eli J Mansour"
      },
      {
        "title": "Word Power",
        "dateRecorded": new Date(),
        "length": "60:0         ",
        "language": "English",
        "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
        "video": "",
        "id": "2",
        "wowzaVideoUrl": "",
        "speakerName": "Rabbi Eli J Mansour"
      }]

      observer.next(data);
      observer.complete();
    });

  }


  /*public read(token: string): Observable<ItemQueue[]> {

    return this.http.get(this.ruta + "/Read").map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }*/

  setItem(myShirium: Shiurim, speakerName: string): void {

    var item = new ItemQueue();
    item.id = myShirium.id;
    item.title = myShirium.title;
    item.dateRecorded = myShirium.dateRecorded;
    item.length = myShirium.length;
    item.language = myShirium.language;
    item.audio = myShirium.audio;
    item.video = myShirium.video;
    item.speakerName = speakerName;

    this.subject.next(item);
  }

  getItem(): Observable<ItemQueue> {
    return this.subject.asObservable();
  }

}
