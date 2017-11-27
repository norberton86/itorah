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
                body.forEach(function (a) {
                    a.credits = Math.floor((Math.random() * 10) + 1)
                    a.sponsored = false
                });
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

    Status(id:string):Observable<string> {

        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());
        h.append('Content-Type', 'application/json');

        return this.http.get(this.ruta+"download?ShiurID="+id, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    ConfirmDownload(id:string):Observable<string> {

        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());
        h.append('Content-Type', 'application/json');

        return this.http.get(this.ruta+"download/confirm?ShiurID="+id, { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}