import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PaymentService {

   private subject: Subject<string> = new Subject<string>();

  constructor() { }

  setItem(item: string): void {
    this.subject.next(item);
  }

  getItem(): Observable<string> {
    return this.subject.asObservable();
  }


}
