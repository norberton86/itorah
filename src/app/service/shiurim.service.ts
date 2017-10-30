import { Injectable } from '@angular/core';

import { Shiurim } from '../model/shiurim';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";


@Injectable()
export class ShiurimService extends Service{

   private subject: Subject<Shiurim> = new Subject<Shiurim>();
   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/";

    }

    public read(idSpeaker:number): Observable<Shiurim[]> {
        
        return this.http.get(this.ruta+"Shiurim?SpeakerID="+idSpeaker).map(
            (response) => {
                let body = response.json();
                body.forEach(function(a) {
                    a.credits=Math.floor((Math.random() * 10) + 1)
                    a.sponsored=false
                });
                return body;
            }
        )
    }

  setItem(myShirium: Shiurim): void {
    this.subject.next(myShirium);
  }

  getItem(): Observable<Shiurim> {
    return this.subject.asObservable();
  }

}