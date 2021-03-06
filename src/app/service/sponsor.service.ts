import { Injectable } from '@angular/core';

import { Sponsor,SponsorShiur,SponsorMedia } from '../model/sponsors';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class SponsorService extends Service {


    constructor(http: Http) {
        super(http);

    }

    public Availables(date: string): Observable<any> {

        return this.http.get("https://itorahapi.3nom.com/api/Sponsor/day?Date="+date).map(
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

        return this.http.post("https://itorahapi.3nom.com/api/Sponsor/day", sponsor, { headers: h }).map(
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

        return this.http.post("https://itorahapi.3nom.com/api/Sponsor/shiur", sponsor, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public addMedia(sponsor: SponsorMedia): Observable<any> {

        let h = new Headers();
        h.append('Content-Type', 'application/json');
        h.append('Authorization', 'bearer ' + this.getToken());

        return this.http.post("https://itorahapi.3nom.com/api/Sponsor/mediaplayer", sponsor, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    
    public getCategory(): Observable<Array<Category>> {

        return this.http.get("https://itorahapi.3nom.com/api/Categories").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public getSubCategory(): Observable<Array<Category>> {

        return this.http.get("https://itorahapi.3nom.com/api/Categories/sub").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}


export class Category
{
    id:number
    name:string
    parentID:number
}