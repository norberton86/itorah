import { Injectable } from '@angular/core';

import { Gemara, DropGemara } from '../model/gemara';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GemaraService extends Service {

    private subjectEmpty: Subject<string> = new Subject<string>();

    constructor(http: Http) {
        super(http);
        this.ruta = "http://itorahapi.3nom.com/api/DailyGemarah/";

    }

    public Masechet(): Observable<Array<DropGemara>> {

        return this.http.get(this.ruta + "masechet").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public Page(masechet: number): Observable<Array<DropGemara>> {

        return this.http.get(this.ruta + "page?MasechetID=" + masechet).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public Content(CycleDay: number = -1): Observable<Gemara> {

        var parameter = "content"
        if (CycleDay != -1)
            parameter += "?CycleDay=" + CycleDay

        return this.http.get(this.ruta + parameter).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    getEmpty(): Observable<string> {
        return this.subjectEmpty.asObservable();
    }

    setData(action: string): void {
        this.subjectEmpty.next(action);
    }

}