import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
 import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AppComponent } from './app.component';
import { PopupRegisterComponent } from './component/popup-register/popup-register.component';
import { PopupEmergencyComponent } from './component/popup-emergency/popup-emergency.component';
import { PopupLevayaComponent } from './component/popup-levaya/popup-levaya.component';
import { PopupRegularComponent } from './component/popup-regular/popup-regular.component';
import { PodcastComponent } from './component/podcast/podcast.component';
import { SponsorComponent } from './component/sponsor/sponsor.component';
import { QueueComponent } from './component/queue/queue.component';
import { SpeakerComponent } from './component/speaker/speaker.component';
import { WeeklyComponent } from './component/weekly/weekly.component';
import { WeeklySearchComponent } from './component/weekly-search/weekly-search.component';
import { TehillimShowComponent } from './component/tehillim-show/tehillim-show.component';
import { TehillimEditComponent } from './component/tehillim-edit/tehillim-edit.component';
import { EmunahSearchComponent } from './component/emunah-search/emunah-search.component';
import { HokSearchComponent } from './component/hok-search/hok-search.component';
import { PeleYoetzComponent } from './component/pele-yoetz/pele-yoetz.component';
import { MishnaBeruraYomiComponent } from './component/mishna-berura-yomi/mishna-berura-yomi.component';
import { LearnTorahComponent } from './component/learn-torah/learn-torah.component';
import { DailyHalachaComponent } from './component/daily-halacha/daily-halacha.component';
import { VideoThumbnailComponent } from './component/video-thumbnail/video-thumbnail.component';
import { ReduceStringPipe,ReduceStringLinkPipe,ReduceStringThumbailPipe } from './pipe/reduce-string.pipe';
import { PlaceHolderComponent } from './component/place-holder/place-holder.component';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { SocialLoginComponent } from './component/social-login/social-login.component';
import { PeleTitlePipe } from './pipe/pele-title.pipe';
import { LanguagePipe } from './pipe/language.pipe';
import { TimePipe } from './pipe/time.pipe';
import { FilterForPipe } from './pipe/filter-for.pipe';
import {QueueService} from './service/queue.service'
import {PodcastService} from './service/podcast.service'
import {HomeService} from './service/home.service'
import {AlertService} from './service/alert.service'
import {TehillimService} from './service/tehillim.service'
import {AccountService} from './service/account.service'
import {MyCreditsService} from './service/my-credits.service'
import {RegisterTehellimService} from './service/register-tehellim.service'
import {CkEditorService} from './service/ck-editor.service'
import {DndModule} from 'ng2-dnd';
import {ShareButtonsModule} from 'ngx-sharebuttons';
import { SubscribeComponent } from './component/subscribe/subscribe.component';
import {SubscribeService} from './service/subscribe.service';
import {PlayerService,PLayerQueueService} from './service/player.service';
import {PerashaService} from './service/perasha.service';
import {WeeklyResultService} from './service/weekly-result.service';
import {ClasseService} from './service/classe.service';
import {GemaraService} from './service/gemara.service';
import {PopupService} from './service/popup.service';
import {SavedPaymentService} from './service/saved-payment.service';
import {FireStoreService} from './service/fire-store.service';
import {PaymentService} from './service/payment.service';
import { InspireComponent } from './component/inspire/inspire.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { RecoverComponent } from './component/recover/recover.component';
import { GlobalSearchComponent } from './component/global-search/global-search.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { ClassesComponent } from './component/classes/classes.component';
import { WeeklyResultComponent } from './component/weekly-result/weekly-result.component';
import { ReadNowComponent } from './component/read-now/read-now.component';
import { AruchComponent } from './component/aruch/aruch.component';
import { BeruraDailyComponent } from './component/berura-daily/berura-daily.component';
import { BeruraComponent } from './component/berura/berura.component';
import { BrowseComponent } from './component/browse/browse.component';
import { ReadSearchComponent } from './component/read-search/read-search.component';
import { ShibaComponent } from './component/shiba/shiba.component';
import { DownloadShiriumComponent } from './component/download-shirium/download-shirium.component';
import { ShiurimService } from "app/service/shiurim.service";
import { ShopComponent } from './component/shop/shop.component';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { MyCreditsComponent } from './component/my-credits/my-credits.component';
import { DonateComponent } from './component/donate/donate.component';
import { OnlyNumberDirective } from './directive/only-number.directive';
import { DedicationComponent } from './component/dedication/dedication.component';
import { PaymentComponent } from './component/payment/payment.component'

import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { AdvertiseComponent } from './component/advertise/advertise.component';
import { AlertComponent } from './component/alert/alert.component';
import { TodaySponsorComponent } from './component/today-sponsor/today-sponsor.component';
import { AccountComponent } from './component/account/account.component';

import {PopoverModule} from "ngx-popover";
import { FileShowerComponent } from './component/file-shower/file-shower.component';
import { PagerComponent } from './component/pager/pager.component';
import { PagerServerComponent } from './component/pager-server/pager-server.component';
import { PayConfirmedComponent } from './component/pay-confirmed/pay-confirmed.component';
import { AccountConfirmedComponent } from './component/account-confirmed/account-confirmed.component';
import { ReadNowEmunahComponent } from './component/read-now-emunah/read-now-emunah.component';

import { SlickModule } from 'ngx-slick';
import { CkEditorComponent } from './component/ck-editor/ck-editor.component';
import { InspireSearchComponent } from './component/inspire-search/inspire-search.component';
import { MobileComponent } from './component/mobile/mobile.component';

let providers = {
    "google": {
      "clientId": "98838643656-4g8mg0gql8p7amof4k5ioglma6m10c16.apps.googleusercontent.com"
    },
    "facebook": {
      "clientId": "131349594120887",
      "apiVersion": "v2.9"
    }
  };

  
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

export const firebaseConfig={
    apiKey: "AIzaSyBWtlYyUyajedqp6MT5JlWWP4pLN5Xc7kc",
    authDomain: "itorah-59de6.firebaseapp.com",
    databaseURL: "https://itorah-59de6.firebaseio.com",
    projectId: "itorah-59de6",
    storageBucket: "",
    messagingSenderId: "441220923975"
}

@NgModule({
  declarations: [
    AppComponent,
    PodcastComponent,
    SponsorComponent,
    QueueComponent,
    SpeakerComponent,
    WeeklyComponent,
    WeeklySearchComponent,
    TehillimShowComponent,
    TehillimEditComponent,
    EmunahSearchComponent,
    HokSearchComponent,
    PeleYoetzComponent,
    MishnaBeruraYomiComponent,
    LearnTorahComponent,
    DailyHalachaComponent,
    VideoThumbnailComponent,
    ReduceStringPipe,ReduceStringLinkPipe,ReduceStringThumbailPipe,
    PlaceHolderComponent,
    SocialLoginComponent,
    PeleTitlePipe,
    LanguagePipe,
    TimePipe,
    FilterForPipe,
    PopupRegisterComponent,
    PopupEmergencyComponent,
    PopupLevayaComponent,
    PopupRegularComponent,
    SubscribeComponent,
    InspireComponent,
    PrivacyPolicyComponent,
    RecoverComponent,
    GlobalSearchComponent,
    AboutComponent,
    ContactComponent,
    ClassesComponent,
    WeeklyResultComponent,
    ReadNowComponent,
    AruchComponent,
    BeruraDailyComponent,
    BeruraComponent,
    BrowseComponent,
    ReadSearchComponent,
    ShibaComponent,
    DownloadShiriumComponent,
    ShopComponent,
    MyCreditsComponent,
    DonateComponent,
    OnlyNumberDirective,
    DedicationComponent,
    PaymentComponent,
    AdvertiseComponent,
    AlertComponent,
    TodaySponsorComponent,
    AccountComponent,
    FileShowerComponent,
    PagerComponent,
    PagerServerComponent,
    PayConfirmedComponent,
    AccountConfirmedComponent,
    ReadNowEmunahComponent,
    CkEditorComponent,
    InspireSearchComponent,
    MobileComponent
  ],
  imports: [
    BrowserModule,CreditCardDirectivesModule, MyDateRangePickerModule,MyDatePickerModule ,NguiAutoCompleteModule,PopoverModule,
     HttpModule,
     FormsModule,ReactiveFormsModule,
     Angular2SocialLoginModule,
     DndModule.forRoot(),
     ShareButtonsModule.forRoot(),
     SlickModule.forRoot(),
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFirestoreModule.enablePersistence()
  ],
  providers: [SavedPaymentService,FireStoreService,ClasseService,PLayerQueueService,PerashaService,CkEditorService,PopupService,GemaraService,PaymentService,PlayerService,RegisterTehellimService,HomeService,QueueService,PodcastService,SubscribeService,WeeklyResultService,TehillimService,ShiurimService,AccountService,MyCreditsService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
