import { Injectable } from '@angular/core';

import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SocialLoginServic extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/";
        this.header = new Headers({"Content-Type":"application/x-www-form-urlencoded"});

    }
  
    public Sign(email:string,pass:string): Observable<any> {

        let body =`username=${email}&password=${pass}`;

        return this.http.post(this.ruta + "token", body, { headers: this.header }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}