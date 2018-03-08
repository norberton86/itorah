import { Injectable } from '@angular/core';
import { Service,ServiceLogin } from '../model/service';
import { creditsTable } from '../model/shiurim-buy';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";

@Injectable()
export class MyCreditsService extends ServiceLogin {

    private subject: Subject<creditsTable> = new Subject<creditsTable>();

  constructor(http: Http) {
    super(http);
    this.ruta = "https://itorahapi.3nom.com/api/MyAccount/credits";
  }


  public read(): Observable<creditsTable> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());

    return this.http.get(this.ruta, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

   setCredits(credit:creditsTable)
  {
      this.subject.next(credit)
  }

  getCredits(): Observable<creditsTable> {
    return this.subject.asObservable();
  }
}
