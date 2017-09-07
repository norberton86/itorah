import { Injectable } from '@angular/core';

import { Hok } from '../model/shiurim';
import { Chumash} from '../model/Hok/chumash';
import { Parasha} from '../model/Hok/parasha';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HokService extends Service{

   value:boolean;
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/DailyHok";

    }


  readDefault() :Observable<any>{

        return this.http.get(this.ruta+"/default").map(
            (response) => {
                let body = response.json();
                return body[0];
            }
        )
   }


  readParasha(idChumash:number) :Observable<Parasha[]>{

    
           
             return this.http.get(this.ruta+"/parasha?ChumashID="+idChumash).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    

   }

   readHok(idParasha:number,myclass:string) :Observable<Hok[]>{

             return this.http.get(this.ruta+"?ParashaID="+idParasha+"&Type="+myclass).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
   }

}
