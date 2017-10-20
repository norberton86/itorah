import { Injectable } from '@angular/core';
import { Shiba } from '../model/shiba';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ShibaService extends Service {

  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/Levayot";

  }




  public read(): Observable<Shiba[]> {

    return this.http.get(this.ruta).map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }

}