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


  private subjectLecures: Subject<Array<ItemQueue>> = new Subject<Array<ItemQueue>>(); //used for send the queue to Speakers component


  constructor(http: Http) {
    super(http);
    this.ruta="http://itorahapi.3nom.com/api/Queue";
  }

  public read(token: string): Observable<ItemQueue[]> {

    let h = new Headers();
            h.append('Authorization','bearer '+token);
        return this.http.get(this.ruta,{headers: h}).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
  }

  public add(token: string,data:any): Observable<any> {

    let h = new Headers();
            h.append('Authorization','bearer '+token);
            h.append('Content-Type','application/json');
            
        return this.http.post(this.ruta+"/add",data,{headers: h}).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
  }

  public remove(token: string,data:any): Observable<any> {

    let h = new Headers();
             h.append('Authorization','bearer '+token);
            h.append('Content-Type','application/json');
            
        return this.http.post(this.ruta,data[0],{headers: h}).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
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
    item.speaker = speakerName;
    item.sourceID=myShirium.sourceID;

    this.subject.next(item);
  }

  getItem(): Observable<ItemQueue> {
    return this.subject.asObservable();
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------------

  setQueue(queue:Array<ItemQueue>)
  {
      this.subjectLecures.next(queue)
  }

  getQueue(): Observable<Array<ItemQueue>> {
    return this.subjectLecures.asObservable();
  }

}
