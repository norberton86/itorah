import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class FireStoreService {

  private subjectLogin: Subject<string> = new Subject<string>();

  constructor(private afs: AngularFirestore) { }

  getLogin(): Observable<string> {
    return this.subjectLogin.asObservable();
  }

  setLogin(action: string): void {
    this.subjectLogin.next(action);
  }

  getToken(): string {
    if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "") {
      return JSON.parse(localStorage.getItem('userItorah')).token
    }
    else
      return ""
  }

  getEmail(): string {
    if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "") {
      return JSON.parse(localStorage.getItem('userItorah')).email
    }
    else
      return ""
  }

  getSetting():Promise<any>
  {
     return this.afs.collection("usuario").doc(this.getEmail()).ref.get()
  }

  UpdateFireBase(setting:Setting):Promise<any> {

   return this.afs.collection("usuario")
          .doc(this.getEmail())
          .set( JSON.parse(JSON.stringify(setting)) )
  }

}

export class Setting {
  wifiOnly: boolean
  downloadTime: string
  downloadDays: string
  savedPlaylist: string
}

export class Item{
  id:number
  title:string
  descripcion:string
  //isSavedPlaylist:boolean
}