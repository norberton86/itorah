import { Injectable } from '@angular/core';

import { Speaker } from '../model/speaker';
import { ServiceLogin } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SpeakerService extends ServiceLogin {


    constructor(http: Http) {
        super(http);
        this.ruta = "http://itorahapi.3nom.com/api/Speakers";

    }

    public read(): Observable<Speaker[]> {

        return this.http.get(this.ruta + "/allSpeakers").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readMain(): Observable<Speaker[]> {

        return this.http.get(this.ruta + "/mainSpeakers").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readMy(): Observable<any> {

        let h = new Headers();
        h.append('Authorization', 'bearer ' + JSON.parse(localStorage.getItem('userItorah')).token);
        return this.http.get(this.ruta + "/mySpeakers", { headers: h }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    public activateSpeaker(id: number): Observable<string> {
        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());

        return this.http.post(this.ruta + "/mySpeakers?SpeakerID=" + id.toString(), {},{ headers: h }).map(
            (response) => {
                return response.toString();
            }
        )
    }

    public deactivateSpeaker(id: number): Observable<string> {
        let h = new Headers();
        h.append('Authorization', 'bearer ' + this.getToken());

        return this.http.delete(this.ruta + "/mySpeakers?SpeakerID=" + id.toString(),{ headers: h }).map(
            (response) => {
                return response.toString();
            }
        )
    }

}