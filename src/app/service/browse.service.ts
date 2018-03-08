import { Injectable } from '@angular/core';

import { Service } from '../model/service';
import { Browse, Category,SubCategory } from '../model/shiurim';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BrowseService extends Service {


    constructor(http: Http) {
        super(http);
        this.ruta = "https://itorahapi.3nom.com/api/Browse/";

    }

    public readRecently(): Observable<Array<Browse>> {

        return this.http.get(this.ruta+"recent").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readPopular(): Observable<Array<Browse>> {

        return this.http.get(this.ruta+"popular").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readRelevant(): Observable<Array<Browse>> {

        return this.http.get(this.ruta+"relevant").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    getCategorys(): Observable<Array<Category>> {
        return this.http.get("https://itorahapi.3nom.com/api/Categories").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    getSubCategorys(): Observable<Array<SubCategory>> {
        return this.http.get("https://itorahapi.3nom.com/api/Categories/sub").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }

    public readCategory(PageIndex:number,PageSize:number,CategoryID:number,SpeakerID:any,isForSponsor:string,SearchText:string=''): Observable<any> {

        var search=SearchText==''?'':'&SearchText='+SearchText

        return this.http.get("https://itorahapi.3nom.com/api/Shiurim/all?PageIndex="+PageIndex+"&PageSize="+PageSize+"&CategoryID="+CategoryID+"&SpeakerID="+SpeakerID+search+"&isForSponsor="+isForSponsor).map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }
}
