import { Injectable } from '@angular/core';

import { Service } from '../model/service';
import { GlobalSearch } from '../model/global-search';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class WeeklyResultService extends Service {

  private subjectClean: Subject<any> = new Subject<any>();

   getData():Observable<any>
  {
    return this.subjectClean.asObservable();
  }

   setData(action:any): void {
    this.subjectClean.next(action);
  }

  constructor(http: Http) {
    super(http);
    this.ruta = "http://itorahapi.3nom.com/api/WeeklyResultSEarch/";

  }

  readHalachat(): Observable<GlobalSearch[]> {

    return Observable.create(observer => {

      observer.next([{
        url: "http://peleyoetz.com/PeleYoetz/2.mp3",
        date: new Date("8/01/2017"),
        title: "Love of Husband and Wife",
        duration: "3:10",
        language: "EN",
        content: "Kabbalistic sources teach that the divine Name of “Havaya,” which is normally spelled “Yod,” “Heh,” “Vav” and “Heh,” can be configured in twelve different ways, by rearranging the four letters.  Each configuration corresponds to one of the twelve months of the Hebrew calendar, and is also alluded to in a verse in the Tanach.  It emerges, then, that each month is associated with a certain verse, and by understanding the connection between a month and its corresponding verse, we can gain greater insight into the central theme and essential nature of that month.\r\n\r\nThe configuration associated with the month of Elul, we are taught, is “Heh,” “Heh,” “Vav” and “Yod.”  This spelling is alluded to in a verse in Sefer Debarim (6:25), “U’sdaka Tiheye Lanu Ki Nishmor La’asot Et Kol Ha’misva Ha’zot” – “It will be beneficial for us when we ensure to perform all this law.”  The final letters of the first four words of this verse – “U’sdaka Tiheye Lanu Ki” – are “Heh,” “Heh,” “Vav” and “Yod,” thus alluding to the configuration associated with the month of Elul.  It behooves us, then, to understand the connection between this verse and Elul.\r\n\r\nThe Ben Ish Hai (Rav Yosef Haim of Baghdad, 1833-1909), in his work Od Yosef Hai, explains that the answer to this question is found in the final words of this verse – “Lifneh Hashem Elokenu,” which literally means, “before Hashem our G-d.”  On a deeper level, the Ben Ish Hai writes, this refers to the period of Elul, which comes “before Hashem our G-d” – in the weeks preceding the day of Rosh Hashanah, when we crown the Almighty as our King.  This is the critical time for us when we have the opportunity to repent and thereby earn a favorable judgment on Rosh Hashanah.  The Ben Ish Hai notes that the word “Lanu” in this verse has the same numerical value (86) as the divine Name “Elokim,” which is associated with G-d’s attribute of harsh judgment.  The phrase “U’sdaka Tiheye Lanu” thus can be read to mean that we are able to transform the “Lanu” – the harsh judgment – into “Sedaka,” kindness and generosity.  We do this when we ensure to observe “Ha’misva Ha’zot” (literally, “this law”) before Rosh Hashanah.  The word “Zot,” the Ben Ish Hai writes, has the numerical value of 408, which is the combined numerical value of the words, “Som” (fasting), “Mammon” (money) and “Kol” (voice).  These are the terms used by the Kabbalists to refer to the three areas on which we need to focus in order to earn a favorable judgment – repentance (fasting), charity (money), and prayer (voice).  If we ensure to begin this three-pronged process “Lifneh Hashem Elokenu,” in the weeks before Rosh Hashanah, then we can transform G-d’s attribute of harsh justice into mercy, compassion and kindness.\r\n\r\nLet us, then, not wait until Rosh Hashanah.  It is only the “latecomers” who begin their process of introspection and repentance on Rosh Hashanah.  We need to start now, with the onset of the month of Elul, by attending the Selihot prayers each morning, increasing our charitable donations, and looking into ourselves to identify where we need to improve.  By starting this process already now, we can help ensure that we will earn G-d’s grace and kindness, and will be worthy of a Ketiba Va’hatima Tova, and a year filled with happiness, health and prosperity, Amen.\r\n\r\n"
      }
      ]);

      observer.complete();
    });

  }

  readWeekly(): Observable<GlobalSearch[]> {

    return Observable.create(observer => {

      observer.next([{
        url: "http://peleyoetz.com/PeleYoetz/2.mp3",
        date: new Date("7/31/2017"),
        title: "Love of Husband and Wife",
        duration: "3:10",
        language: "EN",
        content: "Kabbalistic sources teach that the divine Name of “Havaya,” which is normally spelled “Yod,” “Heh,” “Vav” and “Heh,” can be configured in twelve different ways, by rearranging the four letters.  Each configuration corresponds to one of the twelve months of the Hebrew calendar, and is also alluded to in a verse in the Tanach.  It emerges, then, that each month is associated with a certain verse, and by understanding the connection between a month and its corresponding verse, we can gain greater insight into the central theme and essential nature of that month.\r\n\r\nThe configuration associated with the month of Elul, we are taught, is “Heh,” “Heh,” “Vav” and “Yod.”  This spelling is alluded to in a verse in Sefer Debarim (6:25), “U’sdaka Tiheye Lanu Ki Nishmor La’asot Et Kol Ha’misva Ha’zot” – “It will be beneficial for us when we ensure to perform all this law.”  The final letters of the first four words of this verse – “U’sdaka Tiheye Lanu Ki” – are “Heh,” “Heh,” “Vav” and “Yod,” thus alluding to the configuration associated with the month of Elul.  It behooves us, then, to understand the connection between this verse and Elul.\r\n\r\nThe Ben Ish Hai (Rav Yosef Haim of Baghdad, 1833-1909), in his work Od Yosef Hai, explains that the answer to this question is found in the final words of this verse – “Lifneh Hashem Elokenu,” which literally means, “before Hashem our G-d.”  On a deeper level, the Ben Ish Hai writes, this refers to the period of Elul, which comes “before Hashem our G-d” – in the weeks preceding the day of Rosh Hashanah, when we crown the Almighty as our King.  This is the critical time for us when we have the opportunity to repent and thereby earn a favorable judgment on Rosh Hashanah.  The Ben Ish Hai notes that the word “Lanu” in this verse has the same numerical value (86) as the divine Name “Elokim,” which is associated with G-d’s attribute of harsh judgment.  The phrase “U’sdaka Tiheye Lanu” thus can be read to mean that we are able to transform the “Lanu” – the harsh judgment – into “Sedaka,” kindness and generosity.  We do this when we ensure to observe “Ha’misva Ha’zot” (literally, “this law”) before Rosh Hashanah.  The word “Zot,” the Ben Ish Hai writes, has the numerical value of 408, which is the combined numerical value of the words, “Som” (fasting), “Mammon” (money) and “Kol” (voice).  These are the terms used by the Kabbalists to refer to the three areas on which we need to focus in order to earn a favorable judgment – repentance (fasting), charity (money), and prayer (voice).  If we ensure to begin this three-pronged process “Lifneh Hashem Elokenu,” in the weeks before Rosh Hashanah, then we can transform G-d’s attribute of harsh justice into mercy, compassion and kindness.\r\n\r\nLet us, then, not wait until Rosh Hashanah.  It is only the “latecomers” who begin their process of introspection and repentance on Rosh Hashanah.  We need to start now, with the onset of the month of Elul, by attending the Selihot prayers each morning, increasing our charitable donations, and looking into ourselves to identify where we need to improve.  By starting this process already now, we can help ensure that we will earn G-d’s grace and kindness, and will be worthy of a Ketiba Va’hatima Tova, and a year filled with happiness, health and prosperity, Amen.\r\n\r\n"
      }
      ]);

      observer.complete();
    });

  }


  readBerura(): Observable<GlobalSearch[]> {

    return Observable.create(observer => {

      observer.next([{
        url: "http://peleyoetz.com/PeleYoetz/2.mp3",
        date: new Date("7/28/2017"),
        title: "Love of Husband and Wife",
        duration: "3:10",
        language: "EN",
        content: "Kabbalistic sources teach that the divine Name of “Havaya,” which is normally spelled “Yod,” “Heh,” “Vav” and “Heh,” can be configured in twelve different ways, by rearranging the four letters.  Each configuration corresponds to one of the twelve months of the Hebrew calendar, and is also alluded to in a verse in the Tanach.  It emerges, then, that each month is associated with a certain verse, and by understanding the connection between a month and its corresponding verse, we can gain greater insight into the central theme and essential nature of that month.\r\n\r\nThe configuration associated with the month of Elul, we are taught, is “Heh,” “Heh,” “Vav” and “Yod.”  This spelling is alluded to in a verse in Sefer Debarim (6:25), “U’sdaka Tiheye Lanu Ki Nishmor La’asot Et Kol Ha’misva Ha’zot” – “It will be beneficial for us when we ensure to perform all this law.”  The final letters of the first four words of this verse – “U’sdaka Tiheye Lanu Ki” – are “Heh,” “Heh,” “Vav” and “Yod,” thus alluding to the configuration associated with the month of Elul.  It behooves us, then, to understand the connection between this verse and Elul.\r\n\r\nThe Ben Ish Hai (Rav Yosef Haim of Baghdad, 1833-1909), in his work Od Yosef Hai, explains that the answer to this question is found in the final words of this verse – “Lifneh Hashem Elokenu,” which literally means, “before Hashem our G-d.”  On a deeper level, the Ben Ish Hai writes, this refers to the period of Elul, which comes “before Hashem our G-d” – in the weeks preceding the day of Rosh Hashanah, when we crown the Almighty as our King.  This is the critical time for us when we have the opportunity to repent and thereby earn a favorable judgment on Rosh Hashanah.  The Ben Ish Hai notes that the word “Lanu” in this verse has the same numerical value (86) as the divine Name “Elokim,” which is associated with G-d’s attribute of harsh judgment.  The phrase “U’sdaka Tiheye Lanu” thus can be read to mean that we are able to transform the “Lanu” – the harsh judgment – into “Sedaka,” kindness and generosity.  We do this when we ensure to observe “Ha’misva Ha’zot” (literally, “this law”) before Rosh Hashanah.  The word “Zot,” the Ben Ish Hai writes, has the numerical value of 408, which is the combined numerical value of the words, “Som” (fasting), “Mammon” (money) and “Kol” (voice).  These are the terms used by the Kabbalists to refer to the three areas on which we need to focus in order to earn a favorable judgment – repentance (fasting), charity (money), and prayer (voice).  If we ensure to begin this three-pronged process “Lifneh Hashem Elokenu,” in the weeks before Rosh Hashanah, then we can transform G-d’s attribute of harsh justice into mercy, compassion and kindness.\r\n\r\nLet us, then, not wait until Rosh Hashanah.  It is only the “latecomers” who begin their process of introspection and repentance on Rosh Hashanah.  We need to start now, with the onset of the month of Elul, by attending the Selihot prayers each morning, increasing our charitable donations, and looking into ourselves to identify where we need to improve.  By starting this process already now, we can help ensure that we will earn G-d’s grace and kindness, and will be worthy of a Ketiba Va’hatima Tova, and a year filled with happiness, health and prosperity, Amen.\r\n\r\n"
      }
      ]);

      observer.complete();
    });

  }

  readTehillim(): Observable<GlobalSearch[]> {

    return Observable.create(observer => {

      observer.next([{
        url: "http://peleyoetz.com/PeleYoetz/2.mp3",
        date: new Date("7/28/2017"),
        title: "Love of Husband and Wife",
        duration: "3:10",
        language: "EN",
        content: "Kabbalistic sources teach that the divine Name of “Havaya,” which is normally spelled “Yod,” “Heh,” “Vav” and “Heh,” can be configured in twelve different ways, by rearranging the four letters.  Each configuration corresponds to one of the twelve months of the Hebrew calendar, and is also alluded to in a verse in the Tanach.  It emerges, then, that each month is associated with a certain verse, and by understanding the connection between a month and its corresponding verse, we can gain greater insight into the central theme and essential nature of that month.\r\n\r\nThe configuration associated with the month of Elul, we are taught, is “Heh,” “Heh,” “Vav” and “Yod.”  This spelling is alluded to in a verse in Sefer Debarim (6:25), “U’sdaka Tiheye Lanu Ki Nishmor La’asot Et Kol Ha’misva Ha’zot” – “It will be beneficial for us when we ensure to perform all this law.”  The final letters of the first four words of this verse – “U’sdaka Tiheye Lanu Ki” – are “Heh,” “Heh,” “Vav” and “Yod,” thus alluding to the configuration associated with the month of Elul.  It behooves us, then, to understand the connection between this verse and Elul.\r\n\r\nThe Ben Ish Hai (Rav Yosef Haim of Baghdad, 1833-1909), in his work Od Yosef Hai, explains that the answer to this question is found in the final words of this verse – “Lifneh Hashem Elokenu,” which literally means, “before Hashem our G-d.”  On a deeper level, the Ben Ish Hai writes, this refers to the period of Elul, which comes “before Hashem our G-d” – in the weeks preceding the day of Rosh Hashanah, when we crown the Almighty as our King.  This is the critical time for us when we have the opportunity to repent and thereby earn a favorable judgment on Rosh Hashanah.  The Ben Ish Hai notes that the word “Lanu” in this verse has the same numerical value (86) as the divine Name “Elokim,” which is associated with G-d’s attribute of harsh judgment.  The phrase “U’sdaka Tiheye Lanu” thus can be read to mean that we are able to transform the “Lanu” – the harsh judgment – into “Sedaka,” kindness and generosity.  We do this when we ensure to observe “Ha’misva Ha’zot” (literally, “this law”) before Rosh Hashanah.  The word “Zot,” the Ben Ish Hai writes, has the numerical value of 408, which is the combined numerical value of the words, “Som” (fasting), “Mammon” (money) and “Kol” (voice).  These are the terms used by the Kabbalists to refer to the three areas on which we need to focus in order to earn a favorable judgment – repentance (fasting), charity (money), and prayer (voice).  If we ensure to begin this three-pronged process “Lifneh Hashem Elokenu,” in the weeks before Rosh Hashanah, then we can transform G-d’s attribute of harsh justice into mercy, compassion and kindness.\r\n\r\nLet us, then, not wait until Rosh Hashanah.  It is only the “latecomers” who begin their process of introspection and repentance on Rosh Hashanah.  We need to start now, with the onset of the month of Elul, by attending the Selihot prayers each morning, increasing our charitable donations, and looking into ourselves to identify where we need to improve.  By starting this process already now, we can help ensure that we will earn G-d’s grace and kindness, and will be worthy of a Ketiba Va’hatima Tova, and a year filled with happiness, health and prosperity, Amen.\r\n\r\n"
      }
      ]);

      observer.complete();
    });

  }
}
