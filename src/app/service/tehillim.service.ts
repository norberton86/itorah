import { Injectable } from '@angular/core';

import { Tehillim,Country,Category,Comunity } from '../model/Tehillim/tehillim';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TehillimService extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/";

    }

   readCountry() :Observable<Country[]>{

    return Observable.create(observer => {
           
            observer.next([{id:1,name:"USA"},{id:2,name:"Israel"}]);
            
            observer.complete();
    });

   }

    readComunity(idCountry:number) :Observable<Comunity[]>{

    return Observable.create(observer => {
           
           if(idCountry==1)
            observer.next([{id:1,name:"Ashkenaz"},{id:2,name:"Sephardic"}]);
            else
            observer.next([{id:3,name:"Other Ashkenaz"},{id:4,name:"Other Sephardic"}]);
            
            observer.complete();
    });
    
   }

    readCategory(idComunity:number) :Observable<Category[]>{

    return Observable.create(observer => {
           
           
            observer.next([{id:1,name:"All"},{id:2,name:"To Heal the sick"}]);
            
            observer.complete();
    });
    
   }

    readTehillim(idComunity:number,idCountry:number) :Observable<Tehillim[]>{

    return Observable.create(observer => {
           
            observer.next([{id:1,TName:"Moshe Yocheved ben Sarah",HName:"משה יוכבד",Reason:"To heal the sick",Posted:new Date(),Until:new Date(),Comments:"Example from small community in NY unable to find a shiduch"},
                           {id:2,TName:"Moshe Yocheved ben Sarah",HName:"משה יוכבד",Reason:"To heal the sick",Posted:new Date(),Until:new Date(),Comments:"Example from small community in NY unable to find a shiduch"}]);
            
            observer.complete();
    });
    
   }
/*
    public readCountry(): Observable<Country[]> {
        
        return this.http.get(this.ruta).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readComunity(idCountry:number): Observable<Comunity[]> {
        
        return this.http.get(this.ruta+"Comunity?Country="+idCountry).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }


    public readCategory(idComunity:number): Observable<Category[]> {
        
        return this.http.get(this.ruta+"Category?Comunity="+idComunity).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }
    
    
    public readTehillim(idComunity:number,idCountry:number): Observable<Tehillim[]> {
        
        return this.http.get(this.ruta+"Tehillim?Comunity="+idComunity+"&Country="+idCountry).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }
    
    */

}