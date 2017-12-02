import { Injectable } from '@angular/core';
import { Service ,ServiceLogin} from '../model/service';
import { Dedication, DedicationPost } from '../model/dedication';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';




@Injectable()
export class DedicationService extends ServiceLogin {

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
        h.append('Authorization', 'bearer ' + this.getToken());

        return this.http.post(this.ruta, data, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }
}
