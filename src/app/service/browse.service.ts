import { Injectable } from '@angular/core';

import { Service } from '../model/service';
import { ItemQueue, Category } from '../model/shiurim';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BrowseService extends Service {


    constructor(http: Http) {
        super(http);
        this.ruta = "http://itorahapi.3nom.com/api/Search";

    }

    public readRecently(): Observable<Array<ItemQueue>> {

        return Observable.create(observer => {

            observer.next([{
                "title": "The Transition / Bene Gad",
                "dateRecorded": new Date(),
                "length": "60:0         ",
                "language": "English",
                "audio": "http://media.learntorah.com/LT-Audio/mp4:SD47.m4a/playlist.m3u8",
                "video": "",
                "id": "1",
                "wowzaVideoUrl": "",
                "speaker": "Rabbi Eli J Mansour",
                "sourceID": 1,
                "dayWeek": "",
                "type": "",
                "pdfUrl": ""
            },
            {
                "title": "Word Power",
                "dateRecorded": new Date(),
                "length": "60:0         ",
                "language": "English",
                "audio": "http://media.learntorah.com/LT-Audio/mp4:SD47.m4a/playlist.m3u8",
                "video": "",
                "id": "2",
                "wowzaVideoUrl": "",
                "speaker": "Rabbi Eli J Mansour",
                "sourceID": 1,
                "dayWeek": "",
                "type": "",
                "pdfUrl": ""
            }]);

            observer.complete();
        });
    }

    public readPopular(): Observable<Array<ItemQueue>> {

        return Observable.create(observer => {

            observer.next([{
                "title": "Perush Rashi on Parashat Hukat",
                "dateRecorded": new Date(),
                "length": "60:0         ",
                "language": "English",
                "audio": "http://media.learntorah.com/LT-Audio/mp4:SD47.m4a/playlist.m3u8",
                "video": "",
                "id": "3",
                "wowzaVideoUrl": "",
                "speaker": "Rabbi Eli J Mansour",
                "sourceID": 1,
                "dayWeek": "",
                "type": "",
                "pdfUrl": ""
            },
            {
                "title": "The Aderet / Jewish Home",
                "dateRecorded": new Date(),
                "length": "60:0         ",
                "language": "English",
                "audio": "http://media.learntorah.com/LT-Audio/mp4:SD47.m4a/playlist.m3u8",
                "video": "http://media.learntorah.com/LT-Video/mp4:LBM227.mp4/playlist.m3u8",
                "id": "4",
                "speaker": "Rabbi Eli J Mansour",
                "wowzaVideoUrl": "",
                "sourceID": 1,
                "dayWeek": "",
                "type": "",
                "pdfUrl": ""
            }]);

            observer.complete();
        });
    }

    public readRelevant(): Observable<Array<ItemQueue>> {

        return Observable.create(observer => {

            observer.next([{
                "title": "Perush Rashi on Parashat Hukat",
                "dateRecorded": new Date(),
                "length": "60:0         ",
                "language": "English",
                "audio": "http://media.learntorah.com/LT-Audio/mp4:SD47.m4a/playlist.m3u8",
                "video": "",
                "id": "3",
                "wowzaVideoUrl": "",
                "speaker": "Rabbi Eli J Mansour",
                "sourceID": 1,
                "dayWeek": "",
                "type": "",
                "pdfUrl": ""
            },
            {
                "title": "The Aderet / Jewish Home",
                "dateRecorded": new Date(),
                "length": "60:0         ",
                "language": "English",
                "audio": "http://media.learntorah.com/LT-Audio/mp4:SD47.m4a/playlist.m3u8",
                "video": "http://media.learntorah.com/LT-Video/mp4:LBM227.mp4/playlist.m3u8",
                "id": "4",
                "speaker": "Rabbi Eli J Mansour",
                "wowzaVideoUrl": "",
                "sourceID": 1,
                "dayWeek": "",
                "type": "",
                "pdfUrl": ""
            }]);

            observer.complete();
        });
    }

    getCategorys(): Observable<Array<Category>> {
        return Observable.create(observer => {

            observer.next([{ ID: 333, name: "Halacha" },
            { ID: 23, name: "Navi" }]);

            observer.complete();
        });
    }

    public readCategory(category:number): Observable<Array<ItemQueue>> {

        return Observable.create(observer => {

            observer.next([{
                "title": "Perush Rashi on Parashat Hukat",
                "dateRecorded": new Date(),
                "length": "60:0         ",
                "language": "English",
                "audio": "http://media.learntorah.com/LT-Audio/mp4:SD47.m4a/playlist.m3u8",
                "video": "",
                "id": "3",
                "wowzaVideoUrl": "",
                "speaker": "Rabbi Eli J Mansour",
                "sourceID": 1,
                "dayWeek": "",
                "type": "",
                "pdfUrl": ""
            },
            {
                "title": "The Aderet / Jewish Home",
                "dateRecorded": new Date(),
                "length": "60:0         ",
                "language": "English",
                "audio": "http://media.learntorah.com/LT-Audio/mp4:SD47.m4a/playlist.m3u8",
                "video": "http://media.learntorah.com/LT-Video/mp4:LBM227.mp4/playlist.m3u8",
                "id": "4",
                "speaker": "Rabbi Eli J Mansour",
                "wowzaVideoUrl": "",
                "sourceID": 1,
                "dayWeek": "",
                "type": "",
                "pdfUrl": ""
            }]);

            observer.complete();
        });
    }
}
