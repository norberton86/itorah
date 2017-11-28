import { Injectable } from '@angular/core';

import { Subscribe,SubscribeRequest } from '../model/subscribe';
import { ServiceLogin } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";


@Injectable()
export class SubscribeService extends ServiceLogin {

  constructor(http: Http) {
    super(http);
  }


  read(): Observable<SubscribeRequest> {

       let h = new Headers();
       h.append('Authorization','bearer '+this.getToken());
       
        return this.http.get("https://itorahapi.3nom.com/api/Subscribe",{headers: h}).map(
            (response) => {
                let body = response.json();
                return body;

            }
        )
  }
      
  Save(subscribe: SubscribeRequest): Observable<string> {
        
        let h = new Headers();
        h.append('Authorization','bearer '+this.getToken());
         h.append('Content-Type','application/json');

        return this.http.post("https://itorahapi.3nom.com/api/Subscribe", subscribe, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
 }
}
