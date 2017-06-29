import { Injectable } from '@angular/core';

import { Speaker } from '../model/speaker';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SpeakerService extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/Speakers";

    }

    public read(): Observable<Speaker[]> {
        
        return this.http.get(this.ruta+"/allSpeakers").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readMain(): Observable<Speaker[]> {
        
        return this.http.get(this.ruta+"/mainSpeakers").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readMy(): Observable<Speaker[]> {
        
        return this.http.get(this.ruta+"/mySpeakers").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    public activateSpeaker(id:number):Observable<string>
    {
           return this.http.post(this.ruta+"/mySpeakers?SpeakerID="+id.toString(),{}).map(
            (response) => {
                return response.toString();
            }
        )
    }

    public deactivateSpeaker(id:number):Observable<string>
    {
           return this.http.delete(this.ruta+"/mySpeakers?SpeakerID="+id.toString(),{}).map(
            (response) => {
                return response.toString();
            }
        )
    }

}