import { Component, OnInit } from '@angular/core';
import { Podcast } from '../../model/podcast';
import { PodcastService } from '../../service/podcast.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css'],
  providers: [PodcastService]
})
export class PodcastComponent implements OnInit {

  podcast:Array<Podcast>;
  
  constructor(private podcastService:PodcastService) {


       this.podcast=[];
      //mock
      var p1=new Podcast();
      p1.date=new Date();
      p1.description="Podcast Description 1";
      p1.episode=86;
      p1.name="Podcast Description 1";

     var p2=new Podcast();
      p2.date=new Date();
      p2.description="Podcast Description 2";
      p2.episode=68;
      p2.name="Podcast Description 2";

      this.podcast.push(p1);
      this.podcast.push(p2);

   }

  ngOnInit() {
    //this.Read();
  }

  Read() {
       this.podcastService.read().subscribe(
           result=>this.podcast = result
       )

   }

}
