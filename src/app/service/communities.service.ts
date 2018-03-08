import { Injectable } from '@angular/core';
import { ServiceLogin } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CommunitiesService extends ServiceLogin {


  constructor(http: Http) {
    super(http);
    this.ruta = "https://itorahapi.3nom.com/api/Communities";

  }

  read(): Observable<Communities[]> {

    return this.http.get(this.ruta).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

}


export class Communities{

    ID: number
    Name: string
}