import { Injectable } from '@angular/core';
import { BeruraDaily } from '../model/berura-daily';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BeruraDailyService extends Service {


  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/MishnaBeruraDaily";

  }


  
 public read(): Observable<BeruraDaily[]> {
       
       return this.http.get(this.ruta).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
}


}