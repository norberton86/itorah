import { Injectable } from '@angular/core';

import { Emuna } from '../model/emuna';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class EmunahService extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/DailyEmunah";

    }

    public read(): Observable<Emuna[]> {
        
        return this.http.get(this.ruta).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}