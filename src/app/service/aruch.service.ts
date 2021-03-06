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
    this.ruta = "https://itorahapi.3nom.com/api/AruchHashulchan";

  }


  
 public read(): Observable<Siman[]> {
       
       return this.http.get(this.ruta).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
}


}