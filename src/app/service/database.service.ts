import { Injectable } from '@angular/core';
declare var persistence: any;


@Injectable()
export class DatabaseService {

  Speaker: any;

  constructor() {

    persistence.store.websql.config(persistence, "itorah", 'database', 5 * 1024 * 1024);

    this.Speaker = persistence.define('Speaker', {
      speakerId: "TEXT",
      data: "JSON",
    });

    persistence.schemaSync();

  }


  Add(id: string, data: any) {

    var speaker = new this.Speaker();
    speaker.speakerId = id;
    speaker.data = data

    persistence.add(speaker);
    persistence.flush(function (tx) {
      console.log(tx)
    });

  }

  /*ClearAll() {
    this.Speaker.all().destroyAll(function () {
      persistence.flush(function (a) { })
    })
  }*/



  Manage(id: string, data: any) {
    let self=this;
    
    this.Speaker.findBy(persistence, null, 'speakerId', id, function (user) {
      if (user) {
         user.data = data;
         persistence.flush(function (tx) {
         });
         console.log('actualizar...')
      }
      else
      {
       self.Add(id,data);
       console.log('agregar...')
      }
    });
  }

  /*getSpeakerEntity(id:string):any
  {
    return this.Speaker
  }*/

  getMySelf()
  {
    return persistence;
  }

}
