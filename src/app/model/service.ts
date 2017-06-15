import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Service {

    protected ruta: string = "api/";
    protected header = new Headers({"Content-Type":"application/json"});
    protected http: Http;

    constructor(http: Http) {
        this.http = http;
    }
}
