import { Injectable } from '@angular/core';
declare var localStorageDB:any; 


@Injectable()
export class DatabaseService {

  lib:any

  constructor() {

    this.lib = new localStorageDB("itorah", localStorage);

// Check if the database was just created. Useful for initial database setup
   if( this.lib.isNew() ) {

    // create the "books" table
	 this.lib.createTable("lectures", ["speakerId", "data"]);

	 this.lib.commit();
  }

  }


  Add(id: string, _data: any) {

   this.lib.insert("lectures", {speakerId: id, data: _data});
   this.lib.commit();
  }

  Manage(id: string, _data: any) {
  
    

      var result=  this.lib.queryAll("lectures", {query: {speakerId: id}});

    
      if (result.length>0) {  //if user exists
         
        this.lib.update("lectures", {speakerId: id}, function(row) {  //update data
	       row.data = _data;
         });

        this.lib.commit();
        console.log('updating...')
      }
      else  //add
      {
       this.Add(id,_data);  
       console.log('adding...')
      }
    
  }


  getSpeakerbyId(id:string):any
  {
     return this.lib.queryAll("lectures", {query: {speakerId: id}});
  }

 

}
