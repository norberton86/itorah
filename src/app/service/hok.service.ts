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

  readParasha(idChumash:number) :Observable<Parasha[]>{

    return Observable.create(observer => {
           
           if(idChumash==1)
            observer.next([{id:1,name:"Noach"},{id:2,name:"Lech Lecha"}]);
            else
            observer.next([{id:3,name:"Bo"},{id:4,name:"Yitro"}]);

            observer.complete();
    });

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
