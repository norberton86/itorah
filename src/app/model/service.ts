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
            message: '<div><p>'+message+'</p></div>'
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
                type: error==false?"success":"warning"
        });

        if(message.indexOf("Thank you")>=0){
         $( "div[data-notify='container']").css('width','90%')   
        }
        else
        if(screen.width>=992)  //large
         $( "div[data-notify='container']").css('width','14%')
        else
        if(screen.width>=768&&screen.width<992)//medium
         $( "div[data-notify='container']").css('width','20%')
        else
        if(screen.width>=576&&screen.width<768)//small
         $( "div[data-notify='container']").css('width','50%')
         
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
    private subjectData: Subject<any> = new Subject<any>();

    constructor(http: Http) {
        super(http);

    }

    getLogin(): Observable<String> {
        return this.subjectClean.asObservable();
    }

    setLogin(action: string): void {
        this.subjectClean.next(action);
    }

    getData(): Observable<any> {
        return this.subjectClean.asObservable();
    }

    setData(action: any): void {
        this.subjectClean.next(action);
    }


}
