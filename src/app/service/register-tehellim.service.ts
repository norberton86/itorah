import { Injectable } from '@angular/core';
import { Service } from '../model/service';
import { RegisterTehellim, TehillimResult } from '../model/register-tehellim';
import { RegisterLevaya } from '../model/register-levaya';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterTehellimService extends Service {


  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/RegisterName/";
  }

  public checkTehillim(type: string, mother: string, firstName: string, communityID: number): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.get(this.ruta + "check?type=" + type + "&mother=" + mother + "&firstName=" + firstName + "&communityID=" + communityID, { headers: h }).map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }

  public checkLevaya(type: string, mother: string, firstName: string, lastName: string): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.get(this.ruta + "check?type=" + type + "&mother=" + mother + "&firstName=" + firstName + "&lastName=" + lastName, { headers: h }).map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }

  public addTehillim(register: RegisterTehellim): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.post(this.ruta + "addtehillim", register, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

  public addLevaya(name: RegisterLevaya): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.post(this.ruta + "addlevaya", name, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

}
