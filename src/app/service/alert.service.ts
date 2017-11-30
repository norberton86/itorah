import { Injectable } from '@angular/core';
import { ServiceLogin } from '../model/service';
import { Alert } from '../model/alert';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AlertService extends ServiceLogin {

  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/Alerts";
  }

  public read(): Observable<Alert[]> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    return this.http.get(this.ruta, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

  public add(data: Alert): Observable<any> {

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

  public delete(id: number): Observable<Alert[]> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');
    return this.http.post(this.ruta + "/delete?AlertID=" + id,{},{ headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }


}
