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
    this.ruta = "http://itorahapi.3nom.com/api/CompletedClasses";
  }

  public read(): Observable<Classes[]> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    return this.http.get(this.ruta, { headers: h }).map((response) => {
        let body = response.json()
        return body;
      }
    )
  }

  public add(data: any): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.post(this.ruta, data, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

}