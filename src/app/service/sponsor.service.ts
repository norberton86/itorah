import { Injectable } from '@angular/core';

import { Sponsor,SponsorShiur } from '../model/sponsors';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class SponsorService extends Service {


    constructor(http: Http) {
        super(http);

    }

    public getUnAvailable(source: number): Observable<Array<Date>> {

        return this.http.get("http://itorahapi.3nom.com/api/Sponsor?SourceID="+source).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public addDay(sponsor: Sponsor): Observable<any> {

        let h = new Headers();
        h.append('Content-Type', 'application/json');
        h.append('Authorization', 'bearer ' + this.getToken());

        return this.http.post("http://itorahapi.3nom.com/api/Sponsor/day", sponsor, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public addShiur(sponsor: SponsorShiur): Observable<any> {

        let h = new Headers();
        h.append('Content-Type', 'application/json');
        h.append('Authorization', 'bearer ' + this.getToken());

        return this.http.post("http://itorahapi.3nom.com/api/Sponsor/shiur", sponsor, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}
