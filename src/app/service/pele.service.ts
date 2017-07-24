import { Injectable } from '@angular/core';

import { Pele } from '../model/Pele';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PeleService extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/";

    }


   public read(): Observable<Pele[]> {
        
        return this.http.get(this.ruta+"PeleYoetz").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}