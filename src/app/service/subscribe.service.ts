import { Injectable } from '@angular/core';

import { Subscribe } from '../model/subscribe';
import { ServiceLogin } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";


@Injectable()
export class SubscribeService extends ServiceLogin {

  constructor(http: Http) {
    super(http);
  }

  /*
  public read(token:string): Observable<Subscribe> {
      
      return this.http.get(this.ruta+"/Read").map(
          (response) => {
              let body = response.json();
              return body;
          }
      )
  }
  */
  read(token:string): Observable<Subscribe> {

    return Observable.create(observer => {

      observer.next({
        checkBoxHalacha: true,
        checkBoxPerasha: true,
        checkBoxEmunah: true,
        checkBoxTehillim: true,
        checkBoxPrayers: true,
        checkBoxEmailTehillim: true,
        checkBoxSmsTehillim: true,
        checkBoxEmailFuneral: true,
        checkBoxSmsFuneral: true,
        EmailTehillim: 'Name@email.com',
        SmsTehillim: '(212)123-4567',
        EmailFuneral: 'Name@email.com',
        SmsFuneral: '(212)123-4567'
      });
      observer.complete();
    });

  }


  public Save(subscribe: Subscribe): Observable<string> {
        return this.http.post(this.ruta + "/Create", JSON.stringify(subscribe), { headers: this.header }).map(
            (response) => {
                let body = response.json();
                return body.result;
            }
        )
 }
}
