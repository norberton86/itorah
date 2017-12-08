import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

declare var Notification: any;
declare var $: any;

export class Service {

    protected ruta: string = "http://tlrwebapi.3nom.com/api/";
    protected header = new Headers({ "Content-Type": "application/json" });
    protected http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    Notify(message: string, error: boolean) {
        $.notify({                          //create the popup
            title: "",
            message: "<p>"+message+"</p>"
        },
        {
                delay: 3000,                       //never autoclose
                placement: {                    //placed
                    from: "bottom",
                    align: "right"
                },
                animate: {                                   //animation to in/out
                    enter: 'animated bounceInRight',
                    exit: 'animated bounceOutRight'
                },
                type: error==false?"success":"error"
        });
    }

    getToken(): string {
        if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "") {
            return JSON.parse(localStorage.getItem('userItorah')).token
        }
        else
            return ""
    }

}

export class ServiceLogin extends Service {
    private subjectClean: Subject<string> = new Subject<string>();

    constructor(http: Http) {
        super(http);

    }

    getLogin(): Observable<String> {
        return this.subjectClean.asObservable();
    }

    setLogin(action: string): void {
        this.subjectClean.next(action);
    }


}
