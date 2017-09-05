import { Injectable } from '@angular/core';
import { Home } from '../model/Home';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService extends Service{

   
    constructor(http: Http) {
        super(http);

    }

    public read(): Observable<Home> {
        
        return this.http.get(this.ruta+"iTorahHome").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readPlayNow(id:number): Observable<any> {
        
        return this.http.get("http://itorahapi.3nom.com/api/PlayNow?SourceID="+id).map(
            (response) => {
                return response.json();
            }
        )
    }


}

