import { Injectable } from '@angular/core';

import { Perasha ,AllParasha} from '../model/perasha';
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

    public readAll(): Observable<AllParasha[]> {
        
        return this.http.get(this.ruta+"Parasha/all").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readById(id:number): Observable<Perasha[]> {
        
        return this.http.get(this.ruta+"Parasha/"+id).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readByParasha(id:number): Observable<InspireSearch[]> {
        
        return this.http.get("http://itorahapi.3nom.com/api/WeeklyInspire/byParasha?ID="+id).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }
}

export class InspireSearch
{
    id: number
    title: string
    content:string
    audio:string
}