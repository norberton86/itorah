import { Component, OnInit } from '@angular/core';
import { Podcast } from '../../model/podcast';
import { PodcastService } from '../../service/podcast.service';
import { PlayerService } from '../../service/player.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {

  podcast: Array<Podcast>;

  constructor(private podcastService: PodcastService,private playerService:PlayerService) {

    this.podcastService.getLogin().subscribe(item => {
      if (item == "Signed")
        this.Read()
      else
        this.Fill()
    });
  }

  ngOnInit() {
   if (this.podcastService.getToken() != "")//if it is not loged
      this.Read()
    else
      this.Fill()
  }

  Read() {
    this.podcastService.read().subscribe(
      result => this.podcast = result
    )

  }

  Play(title: string, media: string,mediaId:string) {
      this.playerService.PlayAudio(title, media,"",8,mediaId)
  }

  Fill() {
    //mock
    var p1 = new Podcast();
    p1.id="1"
    p1.date = new Date();
    p1.description = "Podcast Description 1";
    p1.episode = 86;
    p1.name = "Podcast Description 1";
    p1.url = "http://peleyoetz.com/PeleYoetz/2.mp3"

    var p2 = new Podcast();
    p1.id="2"
    p2.date = new Date();
    p2.description = "Podcast Description 2";
    p2.episode = 68;
    p2.name = "Podcast Description 2";
    p2.url = "http://peleyoetz.com/PeleYoetz/2.mp3"

    this.podcast = [p1, p2];
  }

}
