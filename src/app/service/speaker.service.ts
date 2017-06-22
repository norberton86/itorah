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
        this.ruta="http://ep_dev.3nom.com/itorahapi/api/Speakers";

    }

    public read(): Observable<Speaker[]> {
        
        return this.http.get(this.ruta+"/allSpeakers").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}