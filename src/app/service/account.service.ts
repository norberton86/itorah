import { Injectable } from '@angular/core';
import { ServiceLogin } from '../model/service';
import { Account, PhoneProvider } from '../model/account';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService extends ServiceLogin {

  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/MyAccount";
  }

  public read(): Observable<Account> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    return this.http.get(this.ruta, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

  public Profile(token:string): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + token);
     h.append('Content-Type', 'application/json');

    return this.http.get("http://itorahapi.3nom.com/api/UserProfile", { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

  public add(data: Account): Observable<any> {

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

  providers(): Observable<PhoneProvider[]> {

    return this.http.get("http://itorahapi.3nom.com/api/phoneprovider").map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

  public changePassword(data: any): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.post("http://itorahapi.3nom.com/api/Password/editpassword", data, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

}
