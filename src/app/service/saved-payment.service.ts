import { Injectable } from '@angular/core';

import { Service, ServiceLogin } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SavedPaymentService extends ServiceLogin {

  constructor(http: Http) {
    super(http);
    this.ruta = "https://itorahapi.3nom.com/api/QuickPay";
  }



  public read(): Observable<Array<SavedCard>> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.get(this.ruta, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }


  public DonateQuick(saved:SavedCard): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.post("https://itorahapi.3nom.com/api/Donate/quick", saved,{ headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }


  public ShopQuick(saved:SavedCard): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.post("https://itorahapi.3nom.com/api/Shop/quick", saved,{ headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }


}

export class SavedCard {
  amount: number
  cardType: string
  last4Digits: string
  expDate: string
}