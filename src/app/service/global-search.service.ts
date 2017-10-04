import { Injectable } from '@angular/core';

import { Service } from '../model/service';
import { GlobalSearch } from '../model/global-search';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalSearchService extends Service{

   
    constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/Search";

    }
    
     public read(SearchText:string,Sources:string,PageSize:number,PageIndex:number): Observable<any> {
       
       return this.http.get(this.ruta+"?SearchText="+SearchText+"&Sources="+Sources+"&PageSize="+PageSize+"&PageIndex="+PageIndex).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
 }
}
