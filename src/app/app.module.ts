import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PodcastComponent } from './component/podcast/podcast.component';
import { SponsorComponent } from './component/sponsor/sponsor.component';
import { QueueComponent } from './component/queue/queue.component';

@NgModule({
  declarations: [
    AppComponent,
    PodcastComponent,
    SponsorComponent,
    QueueComponent
  ],
  imports: [
    BrowserModule,
     HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
