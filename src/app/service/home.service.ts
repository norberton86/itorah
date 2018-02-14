import { Injectable } from '@angular/core';
import { Home, ReadNow,Link } from '../model/Home';
import { Service,ServiceLogin } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class HomeService extends ServiceLogin{

   private subjectBrowse: Subject<string> = new Subject<string>();

   
    constructor(http: Http) {
        super(http);

    }

    public read(): Observable<Home> {
        
        return this.http.get(this.ruta+"iTorahHome").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public Sources(): Observable<Array<Source>> {
        
        return this.http.get("http://itorahapi.3nom.com/api/Sources").map(
            (response) => {
                return response.json();
            }
        )
    }

    public playNow(id:number): Observable<any> {
        
        return this.http.get("http://itorahapi.3nom.com/api/PlayNow?SourceID="+id).map(
            (response) => {
                return response.json();
            }
        )
    }

    public readNow(id:number): Observable<ReadNow> {
        
        return this.http.get("http://itorahapi.3nom.com/api/ReadNow?SourceID="+id).map(
            (response) => {
                return response.json();
            }
        )
    }

    public readLinks(): Observable<Array<Link>> {
        
        return this.http.get("http://itorahapi.3nom.com/api/Halacha").map(
            (response) => {
                return response.json();
            }
        )
    }

    public readCalendar(): Observable<Array<string>> {
        
        return this.http.get("http://itorahapi.3nom.com/api/Calendar").map(
            (response) => {
                return response.json();
            }
        )
    }

    getBrowse(): Observable<string> {
        return this.subjectBrowse.asObservable();
    }

    setBrowse(action: string): void {
        this.subjectBrowse.next(action);
    }
}

export class Source{
     ID:number
     Name: string
}

