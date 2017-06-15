import { Injectable } from '@angular/core';

import { Sponsors } from '../model/sponsors';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class SponsorService  extends Service{

  
    constructor(http: Http) {
        super(http);

    }

    public read(): Observable<Sponsors[]> {
        
        return this.http.get(this.ruta+"/Read").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}
