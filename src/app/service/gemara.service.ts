import { Injectable } from '@angular/core';

import { Gemara,DropGemara } from '../model/gemara';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GemaraService extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/DailyGemarah/";

    }

    public Masechet(): Observable<Array<DropGemara>> {
        
        return this.http.get(this.ruta+"masechet").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public Page(masechet:number): Observable<Array<DropGemara>> {
        
        return this.http.get(this.ruta+"page?MasechetID="+masechet).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    public Content(CycleDay:number): Observable<Gemara> {
        
        return this.http.get(this.ruta+"content?CycleDay="+CycleDay).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}