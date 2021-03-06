import { Injectable } from '@angular/core';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="https://itorahapi.3nom.com/api/";
        this.header = new Headers({"Content-Type":"application/x-www-form-urlencoded"});

    }

    public Send(a:any):Observable<string>
    {
           return this.http.post(this.ruta+"Send",a).map(
            (response) => {
                return response.toString();
            }
        )
    }

}
