import { Injectable } from '@angular/core';
import { Service } from '../model/service';
import { creditsTable } from '../model/shiurim-buy';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MyCreditsService extends Service {

  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/MyAccount/credits";
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
}
