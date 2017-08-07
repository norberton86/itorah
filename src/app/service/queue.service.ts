import { Injectable } from '@angular/core';

import { Shiurim, ItemQueue } from '../model/shiurim';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';


@Injectable()
export class QueueService extends Service {

  private subject: Subject<ItemQueue> = new Subject<ItemQueue>();
  private subjectClean: Subject<string> = new Subject<string>();

  constructor(http: Http) {
    super(http);

  }

  public read(token: string): Observable<ItemQueue[]> {

    return this.http.get(this.ruta + "/Read").map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

  getToken(): string {
    if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "") {
      return JSON.parse(localStorage.getItem('userItorah')).token
    }
    else
      return ""
  }


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

  getLogin():Observable<String>
  {
    return this.subjectClean.asObservable();
  }

   setLogin(action:string): void {
    this.subjectClean.next(action);
  }


}
