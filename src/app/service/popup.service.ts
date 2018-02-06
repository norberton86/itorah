import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PopupService {

  private subject: Subject<string> = new Subject<string>();
  
  constructor() { }

  getName(): Observable<String> {
    return this.subject.asObservable();
  }

  setName(name: string): void {
    this.subject.next(name);
  }

}
