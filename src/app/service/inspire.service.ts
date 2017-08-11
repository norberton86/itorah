import { Injectable } from '@angular/core';

import { Inspire } from '../model/inspire';
import { Service } from '../model/service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class InspireService extends Service{

   constructor(http: Http) {
        super(http);
        this.ruta="http://itorahapi.3nom.com/api/";

    }



    public read(_id:number): Observable<Inspire>{

    return Observable.create(observer => {
           
            var inspire={
                          id:4,
                          url:"http://WeeklyInspire.com/WeeklyInspire/19.mp3",
                          title:"Appreciating Our Community",
                          description:"Somebody once showed me the “Ask the Rabbi” column that was printed in a certain magazine (that is not connected to our community).  The question was posed by a man who had decided sometime earlier to move to a different synagogue, and was now having second thoughts. For years, the man and his family belonged to a wonderfully warm, friendly, inviting synagogue that had an outstanding Rabbi who was both an impressive talmid hacham and an exceptionally warm and caring person.  However, although the synagogue was warm and friendly, the father was disturbed by the talking during the prayer service.  He felt that this set a very negative example for his children, and so they moved to a different synagogue, where there is greater decorum and respect during the prayers.  The problem was that the people in this synagogue were not as friendly.  The family never really felt connected to the congregation, and so before long, the wife and daughters stopped going to prayers altogether, and the son started going to the first synagogue. One Shabbat morning, the man overslept and could not go to the second synagogue.  He told his family he would be going that morning to their original synagogue, and they all excitedly decided to join him.  At the synagogue, they were all received very warmly by the members who were overjoyed that they returned.  This got the man to start thinking if perhaps he should again regularly attend the first synagogue.  His question was: should he attend a warm, friendly synagogue where there is talking during the service, or a synagogue which is less friendly, where his family did not feel they belonged, but where the service was conducted with the appropriate level of decorum?The Rabbi did not give a clear-cut answer to this question.  But in my humble opinion, there is no question whatsoever.  In my mind, it is clear beyond a shadow of doubt, without any hesitation whatsoever, that the family should attend the first synagogue, the congregation which offers them a sense of belonging and a sense of community.  As serious a prohibition as it is to speak during the prayer services, and while this is, without question, a problem that must not be ignored, we need to place ourselves in a community, somewhere where we feel a sense of belonging and connectedness, because only in such a setting are we able to grow and reach our full potential.",
                          time:"42:35",
                          date:new Date(),
                          chapters:[
                                     {
                                       title:"Finding Consolation",
                                       content:"This message is conveyed in a subtle yet powerful way in a pair of verses in Parashat Vaet’hanan, which appear in the section which we read on Tisha B’Av."
                                     },
                                     {
                                       title:"An Organization for Everything",
                                       content:"As a Rabbi, I often hear from people who feel disillusioned with our community, for a variety of reasons.  Some people feel that we are too connected, that our members know too much about each other.  Others feel that our community creates pressure, whether it’s the pressure of high financial expectations or of high religious standards.  And, of course, there are complaints about the Rabbis, the institutions, the schools, the organizations, and so on."
                                     }
                                   ]
                        }

            observer.next(inspire);
            observer.complete();
    });

   }


  /* public read(id:string): Observable<Inspire> {
        
        return this.http.get(this.ruta+"Inspire").map(
            (response) => {
                let body = response.json();
                return body;
            }
        )
    }*/

}
