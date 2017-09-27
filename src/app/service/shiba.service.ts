import { Injectable } from '@angular/core';
import { Shiba } from '../model/shiba';
import { Service } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ShibaService extends Service {

  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/Shiba";

  }

  read(): Observable<Shiba[]> {

    return Observable.create(observer => {

      var data: Array<Shiba> = []

      for (var i = 0; i < 120; i++) {
        data.push({
          name: "Albert Laniado "+(i+1),
          hebrewName: "אברהם בן פרחהAbraham ben Farha",
          deceased: new Date(),
          spouse: "Mary Azar",
          children: [ "Morris Azar", "Jack Azar", "Joy Azar", "Joey Shames","Mark Shames"],
          sibblings:["Ezra Azar", "Clem Terzi", "Lena Sasson" , "Esther Bailey"],
          israel: ["Ezra Azar", "Clem Terzi"],
          shacharit:"7:00 AM",
          mincha:"6:15 AM",
          sittingAt:"1736 Ocean Pkwy Btw Quentin Rd & Kings Hwy",
          arayatDetais:"The Arayat will be TBA",
          until:new Date()
        })
      }

      observer.next(data);

      observer.complete();
    });

  }


  /*public read(): Observable<Shiba[]> {

    return this.http.get(this.ruta).map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }*/

}