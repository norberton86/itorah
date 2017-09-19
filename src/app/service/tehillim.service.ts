import { Injectable } from '@angular/core';

import { Tehillim,Country,Category,Comunity } from '../model/Tehillim/tehillim';
import { ServiceLogin } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TehillimService  extends ServiceLogin{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/Tehillim/";

    }


    add(data:any): Observable<any> {

    let h = new Headers();
            h.append('Authorization','bearer '+this.getToken());
            h.append('Content-Type','application/json');
            
        return this.http.post(this.ruta+"/add",data,{headers: h}).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    remove(data:any): Observable<any> {

    let h = new Headers();
             h.append('Authorization','bearer '+this.getToken());
            h.append('Content-Type','application/json');
            
        return this.http.post(this.ruta+"/remove",data,{headers: h}).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    readMyTehillim() :Observable<Tehillim[]>{

    return Observable.create(observer => {
           
            observer.next([{ID:3520,TName:"Sarah bat Hasibah",HName:"משה יוכבד",Reason:"To heal the sick",Posted:new Date(),Until:new Date(),Comments:"Example from small community in NY unable to find a shiduch"},
                           {ID:4010,TName:"Miriam bat Shoshanna Shaindel",HName:"משה יוכבד",Reason:"To heal the sick",Posted:new Date(),Until:new Date(),Comments:"Example from small community in NY unable to find a shiduch"}]);
            
            
            observer.complete();
    });
}

    
   

    public readCountry(): Observable<Country[]> {
        
        return this.http.get(this.ruta+"countries").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readComunity(idCountry:number): Observable<Comunity[]> {
        
        return this.http.get(this.ruta+"communities?CountryID="+idCountry).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    public readCategory(idComunity:number): Observable<Category[]> {
        
        return this.http.get(this.ruta+"categories?CommunityID="+idComunity).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }
    
    
    public readTehillim(idComunity:number,idCategory:number): Observable<Tehillim[]> {
        
        return this.http.get(this.ruta+"names?CommunityID="+idComunity+"&CategoryID="+idCategory).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


}