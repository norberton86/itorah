import { Injectable } from '@angular/core';

import { Podcast } from '../model/podcast';
import { ServiceLogin } from '../model/service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";

@Injectable()
export class PodcastService extends ServiceLogin {



    constructor(http: Http) {
        super(http);

    }
    /*
    public read(): Observable<Podcast[]> {
        
        return this.http.get(this.ruta+"/Read").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }
    */
    read(): Observable<Podcast[]> {

        return Observable.create(observer => {

            var p1 = new Podcast();
            p1.date = new Date();
            p1.description = "One of the newest kids on the Jewish podcast block";
            p1.episode = 86;
            p1.name = "Can We Talk?";
            p1.url = "http://peleyoetz.com/PeleYoetz/2.mp3"

            var p2 = new Podcast();
            p2.date = new Date();
            p2.description = "This weekly dispatch from a San Francisco basement rechristened “The Twilight Lounge”"
            p2.episode = 68;
            p2.name = "(Is It) Good for the Jews?";
            p2.url = "http://peleyoetz.com/PeleYoetz/2.mp3"

            observer.next([p1, p2]);
            observer.complete();
        });

    }

}
