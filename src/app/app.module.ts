import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

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
    MishnaBeruraYomiComponent
  ],
  imports: [
    BrowserModule,
     HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
