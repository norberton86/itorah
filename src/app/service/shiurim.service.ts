import { Injectable } from '@angular/core';

import { Shiurim } from '../model/shiurim';
import { ComboItem } from '../model/combo-item';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";


@Injectable()
export class ShiurimService extends Service {

    private subject: Subject<ComboItem> = new Subject<ComboItem>();

    constructor(http: Http) {
        super(http);
        this.ruta = "http://itorahapi.3nom.com/api/";

    }

    public read(idSpeaker: number): Observable<Shiurim[]> {

        return this.http.get(this.ruta + "Shiurim?SpeakerID=" + idSpeaker).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public relatedCategories(shiur: number): Observable<Category[]> {

        return this.http.get("http://itorahapi.3nom.com/api/Shiurim/relatedcategories?ShiurID=" + shiur).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public relatedShiur(shiur: number,CategoryID:number): Observable<Shiurim[]> {

        return this.http.get("http://itorahapi.3nom.com/api/Shiurim/relatedshiurim?ShiurID="+shiur+"&CategoryID="+CategoryID).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    setItem(message: ComboItem): void {
        this.subject.next(message);
    }

    getItem(): Observable<ComboItem> {
        return this.subject.asObservable();
    }

    Status(id: string): Observable<string> {

        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());
        h.append('Content-Type', 'application/json');

        return this.http.get(this.ruta + "download?ShiurID=" + id, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    ConfirmDownload(id: string): Observable<string> {

        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());
        h.append('Content-Type', 'application/json');

        return this.http.get(this.ruta + "download/confirm?ShiurID=" + id, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    search(SearchText: string, PageSize: number, PageIndex: number, categoryId: number): Observable<any> {

        var query = ""
        if (SearchText != '')
            query = "&SearchText=" + SearchText

        return this.http.get("http://itorahapi.3nom.com/api/Shiurim/all?PageIndex=" + PageIndex + "&PageSize=" + PageSize + query + "&CategoryID=" + categoryId).map(
            (response) => {
                let body = response.json()
                return body;
            }
        )
    }

}

export class Category {
    ID: number
    Name: string
}