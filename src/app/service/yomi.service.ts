import { Injectable } from '@angular/core';
import { Topic,SubTopic,chelek,seif,ContentSeif } from '../model/topic';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class YomiService  extends Service {


  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/MishnaBeruraYomi/";

  }

  
 public readTopic(): Observable<Topic[]> {
       
       return this.http.get(this.ruta+"topics").map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
}


 public readSubTopic(TopicID:number): Observable<SubTopic[]> {
       
       return this.http.get(this.ruta+"subtopics?TopicID="+TopicID).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
}


 public readChelek(): Observable<chelek[]> {
       
       return this.http.get(this.ruta+"chelek").map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
}


 public readSeif(ChelekID:number): Observable<seif[]> {
       
       return this.http.get(this.ruta+"seif?ChelekID="+ChelekID).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
}


 public readContentSeif(SeifID:number): Observable<ContentSeif> {
       
       return this.http.get(this.ruta+"byseif?SeifID="+SeifID).map(
           (response) => {
               let body = response.json()
               return body;
           }
       )
}



}
