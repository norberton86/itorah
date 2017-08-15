import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
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
import { ReduceStringPipe } from './pipe/reduce-string.pipe';
import { PlaceHolderComponent } from './component/place-holder/place-holder.component';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { SocialLoginComponent } from './component/social-login/social-login.component';
import { PeleTitlePipe } from './pipe/pele-title.pipe';
import { LanguagePipe } from './pipe/language.pipe';
import { TimePipe } from './pipe/time.pipe';
import { FilterForPipe } from './pipe/filter-for.pipe';
import {QueueService} from './service/queue.service'
import {PodcastService} from './service/podcast.service'
import {DndModule} from 'ng2-dnd';
import {ShareButtonsModule} from 'ngx-sharebuttons';
import { SubscribeComponent } from './component/subscribe/subscribe.component';
import {SubscribeService} from './service/subscribe.service';
import { InspireComponent } from './component/inspire/inspire.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component'



let providers = {
    "google": {
      "clientId": "98838643656-4g8mg0gql8p7amof4k5ioglma6m10c16.apps.googleusercontent.com"
    },
    "facebook": {
      "clientId": "131349594120887",
      "apiVersion": "v2.9"
    }
  };

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
    ReduceStringPipe,
    PlaceHolderComponent,
    SocialLoginComponent,
    PeleTitlePipe,
    LanguagePipe,
    TimePipe,
    FilterForPipe,
    SubscribeComponent,
    InspireComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
     HttpModule,
     FormsModule,ReactiveFormsModule,
     Angular2SocialLoginModule,
     DndModule.forRoot(),
     ShareButtonsModule.forRoot()
  ],
  providers: [QueueService,PodcastService,SubscribeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
