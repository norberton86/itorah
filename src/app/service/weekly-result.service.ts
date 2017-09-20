import { Injectable } from '@angular/core';

import { Service } from '../model/service';
import { GlobalSearch } from '../model/global-search';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class WeeklyResultService extends Service {

  private subjectClean: Subject<any> = new Subject<any>();

   getData():Observable<any>
  {
    return this.subjectClean.asObservable();
  }

   setData(action:any): void {
    this.subjectClean.next(action);
  }

  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/Search/";

  }

  
  public read(SearchText:string,Sources:string): Observable<Array<GlobalSearch>> {
       
       return this.http.get(this.ruta+"?SearchText="+SearchText+"&Sources="+Sources).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
 }

}
