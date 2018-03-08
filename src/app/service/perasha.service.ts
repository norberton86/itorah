import { Injectable } from '@angular/core';

import { Perasha, AllParasha } from '../model/perasha';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";


@Injectable()
export class PerashaService extends Service {

    private subjectOption: Subject<string> = new Subject<string>();

    constructor(http: Http) {
        super(http);
        this.ruta = "https://itorahapi.3nom.com/api/";

    }

    setOption(option: string) {
        this.subjectOption.next(option)
    }

    getOption(): Observable<string> {
        return this.subjectOption.asObservable()
    }


    public read(): Observable<Perasha[]> {

        return this.http.get(this.ruta + "Parasha").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readAll(): Observable<AllParasha[]> {

        return this.http.get(this.ruta + "Parasha/all").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readById(id: number): Observable<Perasha[]> {

        return this.http.get(this.ruta + "Parasha/" + id).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readByParasha(id: number): Observable<InspireSearch[]> {

        return this.http.get("https://itorahapi.3nom.com/api/WeeklyInspire/byParasha?ID=" + id).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readByParashaInspire(): Observable<ParashaInspire[]> {

        return this.http.get("https://itorahapi.3nom.com/api/WeeklyInspire/recent").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }
}

export class InspireSearch {
    id: number
    title: string
    content: string
    audio: string
}

export class ParashaInspire {
    ID: number
    ParashaID: number
    ParashaName: string
    ChumashID: number
    ChumashName: string
    Title: string
    Content: string
    Audio: string
}