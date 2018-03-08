import { Injectable } from '@angular/core';

import { Parasha} from '../model/Hok/parasha';
import { Service,ServiceLogin } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DonateService extends ServiceLogin {

  constructor(http: Http) {
    super(http);
    this.ruta = "https://itorahapi.3nom.com/api/Donate";
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

  public addEmail(data: any): Observable<any> {

    let h = new Headers();

    return this.http.post(this.ruta, data).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

}
