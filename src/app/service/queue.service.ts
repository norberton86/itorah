import { Injectable } from '@angular/core';

import { ItemQueue } from '../model/shiurim';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';
 

@Injectable()
export class QueueService extends Service{
    
     private subject: Subject<ItemQueue> = new Subject<ItemQueue>();
  
    constructor(http: Http) {
        super(http);

    }

    public read(token:string): Observable<ItemQueue[]> {
        
        return this.http.get(this.ruta+"/Read").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

  getToken():string
  {
    if(localStorage.getItem('userItorah')!=null&&localStorage.getItem('userItorah')!="")
    {
      return JSON.parse(localStorage.getItem('userItorah')).token
    }
    else
    return ""
  }


  setLogged(logged: ItemQueue): void {
    
    this.subject.next(logged);
  }
  
  getLogged(): Observable<ItemQueue> {
    return this.subject.asObservable();
  }
 

}
