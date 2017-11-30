import { Injectable } from '@angular/core';

import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class SocialLoginServic extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="https://itorahid.3nom.com/connect/token";
        this.header = new Headers({"Content-Type":"application/x-www-form-urlencoded"});

    }
  
    public Sign(email:string,pass:string): Observable<any> {

        let body =`grant_type=password&username=${email}&password=${pass}&client_id=resourceOwner&client_secret=secret`;

        return this.http.post(this.ruta , body, { headers: this.header }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public SignThirdParty(grant_type:string,token:string): Observable<any> {

        let body =`grant_type=${grant_type}&id_token=${token}&client_id=resourceOwner&client_secret=secret`;

        return this.http.post(this.ruta , body, { headers: this.header }).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public Forgot(email:string): Observable<any> {

        return this.http.post("http://itorahapi.3nom.com/api/Password/forgot?email="+email,{}).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public Create(data:any):Observable<string>
    {
            let h = new Headers();
            h.append('Content-Type','application/json');

           return this.http.post("http://itorahapi.3nom.com/api/Users",data,{headers: h}).map(
            (response) => {
                return response.toString();
            }
        )
    }

     public Recover(token:string, pass:string):Observable<string>
    {
           return this.http.post("http://itorahapi.3nom.com/api/Password/replace?token="+token+"&pass="+pass,{}).map(
            (response) => {
                return response.toString();
            }
        )
    }

  
}