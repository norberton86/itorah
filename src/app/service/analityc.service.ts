import { Injectable } from '@angular/core';
declare var ga:any; 

@Injectable()
export class AnalitycService {

  constructor() { }
  public emitEvent(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: string = null) {
    ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }
}
