import { Injectable } from '@angular/core';

import { Shiurim } from '../model/shiurim';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class EmunahService extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/";

    }

    public read(): Observable<Shiurim[]> {
        
        return this.http.get(this.ruta+"Shiurim?SpeakerID=28").map(
            (response) => {
                let body = response.json();

                for(var i=0;i<body.length;i++)
                {
                   body[i].id=i;
                }

                return body;
            }
        )
    }

}