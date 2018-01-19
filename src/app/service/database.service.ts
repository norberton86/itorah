import { Injectable } from '@angular/core';
declare var localStorageDB: any;


@Injectable()
export class DatabaseService {

  lib: any

  constructor() {

    this.lib = new localStorageDB("itorah", localStorage);

    // Check if the database was just created. Useful for initial database setup
    if (this.lib.isNew()) {

      // create the "books" table
      this.lib.createTable("lectures", ["speakerId", "data"]);

      this.lib.commit();
    }

  }

  Manage(id: string, _data: any) {

    this.lib.insertOrUpdate("lectures", { speakerId: id }, { speakerId: id, data: _data });
    this.lib.commit();
  }


  getSpeakerbyId(id: string): any {
    return this.lib.queryAll("lectures", { query: { speakerId: id } });
  }



}
