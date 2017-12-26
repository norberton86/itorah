import { Injectable } from '@angular/core';
import { ServiceLogin } from '../model/service';
import { RegisterTehellim, TehillimResult } from '../model/register-tehellim';
import { RegisterLevaya } from '../model/register-levaya';
import { Category } from '../model/Tehillim/tehillim';
import { EntireList, Perek } from '../model/entire-list';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterTehellimService extends ServiceLogin {


  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/RegisterName/";
  }

  public readCategory(): Observable<Category[]> {

    return this.http.get("http://itorahapi.3nom.com/api/Tehillim/categories?CommunityID=1").map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }

  public readEntireList(): Observable<EntireList[]> {

    return this.http.get("http://itorahapi.3nom.com/api/Tehillim/entirelist").map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }

  public readPerek(): Observable<Perek[]> {

    return this.http.get("http://itorahapi.3nom.com/api/Tehillim/content").map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }

  public Generate(FirstName:string,isBat:string,MotherName:string,OptionID:number): Observable<any> {

    return this.http.get("http://itorahapi.3nom.com/api/Generator?FirstName="+FirstName+"&isBat="+isBat+"&MotherName="+MotherName+"&OptionID="+OptionID).map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }



  public checkTehillim( mother: string, firstName: string, communityID: number): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.get(this.ruta+"/checktehillim?" + "mother=" + mother + "&firstName=" + firstName + "&communityID=" + communityID, { headers: h }).map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }

  public checkLevaya( transMotherName: string, transFirstName: string, EnglishFirstName: string,EnglishLastName:string,Age:string): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.get(this.ruta + "/checklevaya?" + "transMotherName=" + transMotherName + "&transFirstName=" + transFirstName + "&EnglishLastName=" + EnglishLastName+"&EnglishFirstName="+EnglishFirstName+"&Age="+Age, { headers: h }).map(
      (response) => {
        let body = response.json()
        return body;
      }
    )
  }

  public addTehillim(register: RegisterTehellim): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.post(this.ruta + "addtehillim", register, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

  public addLevaya(name: RegisterLevaya): Observable<any> {

    let h = new Headers();
    h.append('Authorization', 'bearer ' + this.getToken());
    h.append('Content-Type', 'application/json');

    return this.http.post(this.ruta + "addlevaya", name, { headers: h }).map(
      (response) => {
        let body = response.json();
        return body;
      }
    )
  }

}

export class Generate {
  configuredFor: string
  textList: Array<string> = []
} 
