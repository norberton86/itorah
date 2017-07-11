import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

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
    PlaceHolderComponent
  ],
  imports: [
    BrowserModule,
     HttpModule,
     FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
