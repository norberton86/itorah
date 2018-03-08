import { Injectable } from '@angular/core';

import { Tehillim, Country, Category, Comunity } from '../model/Tehillim/tehillim';
import { ServiceLogin } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TehillimService extends ServiceLogin {


    constructor(http: Http) {
        super(http);
        this.ruta = "https://itorahapi.3nom.com/api/Tehillim/";

    }


    add(id: number): Observable<any> {

        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());
        h.append('Content-Type', 'application/json');

        return this.http.post("https://itorahapi.3nom.com/api/MyTehillimList/add?ID="+id, {}, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    remove(id: number): Observable<any> {

        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());
        h.append('Content-Type', 'application/json');

        return this.http.post("https://itorahapi.3nom.com/api/MyTehillimList/remove?ID="+id, {}, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    readMyTehillim(): Observable<Tehillim[]> {

        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());
        h.append('Content-Type', 'application/json');

        return this.http.get("https://itorahapi.3nom.com/api/MyTehillimList/get", { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }




    public readCountry(): Observable<Country[]> {

        return this.http.get(this.ruta + "countries").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readComunity(idCountry: number): Observable<Comunity[]> {

        return this.http.get(this.ruta + "communities?CountryID=" + idCountry).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    public readCategory(idComunity: number): Observable<Category[]> {

        return this.http.get(this.ruta + "categories?CommunityID=" + idComunity).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    public readTehillim(idComunity: number, idCategory: number): Observable<Tehillim[]> {

        return this.http.get(this.ruta + "names?CommunityID=" + idComunity + "&CategoryID=" + idCategory).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


}