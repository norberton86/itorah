import { Injectable } from '@angular/core';

import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService extends Service {


  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/Advertise";
  }

  public upload(data: any): Observable<any> {
    


    return this.http.post(this.ruta, data).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }


}
