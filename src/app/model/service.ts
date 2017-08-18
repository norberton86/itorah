import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

declare var Notification:any; 

export class Service {

    protected ruta: string = "http://tlrwebapi.3nom.com/api/";
    protected header = new Headers({"Content-Type":"application/json"});
    protected http: Http;

    constructor(http: Http) {
        this.http = http;
    }

      Notify(message:string,error:boolean)
    {
         var iconUrl="";
        if(error)
            iconUrl='./assets/build/css/images/images/notification_error.png'
        else
          iconUrl='./assets/build/css/images/images/notification_done.png'


         if (!("Notification" in window)) {
             console.log("no notifications in this browser");
         }
         else if (Notification.permission === "granted") {
             // If it's okay let's create a notification
             var notification = new Notification(message, { icon: iconUrl });
             notification.onshow = function () {
                 setTimeout(notification.close.bind(notification), 3000);
             }
         }
         else if (Notification.permission !== 'denied') {
             Notification.requestPermission(function (permission) {

                 if (permission === "granted") {
                     var notification = new Notification(message, { icon: iconUrl});
                     notification.onshow = function () {
                         setTimeout(notification.close.bind(notification), 3000);
                     }
                 }
             });
         }
     
    }

}

export class ServiceLogin extends Service
{
 private subjectClean: Subject<string> = new Subject<string>();

 constructor(http: Http) {
    super(http);

  }

  getLogin():Observable<String>
  {
    return this.subjectClean.asObservable();
  }

   setLogin(action:string): void {
    this.subjectClean.next(action);
  }

  getToken(): string {
    if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "") {
      return JSON.parse(localStorage.getItem('userItorah')).token
    }
    else
      return ""
  }
}
