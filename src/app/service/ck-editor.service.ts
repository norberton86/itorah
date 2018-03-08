import { Injectable } from '@angular/core';

import { EditorItem } from '../model/editor-item';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CkEditorService  extends Service {


  constructor(http: Http) {
    super(http);
    this.ruta = "https://itorahapi.3nom.com/api/CustomContent";

  }

  
 public read(): Observable<EditorItem[]> {
       
       return this.http.get(this.ruta).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
}

}
