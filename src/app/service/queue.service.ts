import { Injectable } from '@angular/core';

import { Queue } from '../model/queue';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class QueueService extends Service{

  
    constructor(http: Http) {
        super(http);

    }

    public read(): Observable<Queue[]> {
        
        return this.http.get(this.ruta+"/Read").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}
