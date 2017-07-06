import { Injectable } from '@angular/core';

import { Perasha } from '../model/perasha';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PerashaService extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/";

    }

    public read(): Observable<Perasha[]> {
        
        return this.http.get(this.ruta+"Parasha").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}