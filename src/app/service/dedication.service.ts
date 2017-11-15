import { Injectable } from '@angular/core';
import { Service } from '../model/service';
import { Dedication,DedicationPost } from '../model/dedication';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';




@Injectable()
export class DedicationService extends Service {

    value: boolean;
    constructor(http: Http) {
        super(http);
        this.ruta = "http://itorahapi.3nom.com/api/Dedication";

    }


    read(): Observable<Dedication[]> {

        return this.http.get(this.ruta).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    add(data: DedicationPost): Observable<any> {

        let h = new Headers();
        h.append('Content-Type', 'application/json');

        return this.http.post(this.ruta, data, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }
}
