import { Injectable } from '@angular/core';

import { Inspire } from '../model/inspire';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class InspireService extends Service{

   constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/WeeklyInspire/";

    }


   public read(): Observable<any> {
        
        return this.http.get(this.ruta).map(
            (response) => {
                if((<any>response)._body!='')
                {
                let body = response.json();
                return body;
                }
                else
                return ''

            }
        )
   }

   public navigate(id:number,operation:string): Observable<Inspire> {
        
        var url=this.ruta+"/next?ID="+id;
        if(operation=='prev')
            url=this.ruta+"/prev?ID="+id

        return this.http.get(url).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

}
