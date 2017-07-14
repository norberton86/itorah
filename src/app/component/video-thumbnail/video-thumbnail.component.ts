import { Component, OnInit } from '@angular/core';
import { Home,Lectures } from '../../model/Home';
import { HomeService } from '../../service/home.service';

declare var $:any;
declare var jwplayer:any;

@Component({
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.css'],
  providers:[HomeService]
})
export class VideoThumbnailComponent implements OnInit {

  videos:Array<Lectures>;
  videosFull:Array<Lectures>;
  CurrentPlaying:Lectures;


  constructor(private homeService:HomeService) {
     this.videos=[];
   }

  ngOnInit() {
    this.Read();
  }

   Read() {
       this.homeService.read().subscribe(
           result=>this.setCount(result)
       )

   }

   setCount(home:Home)
   {
     this.videosFull=home.Table2.sort(this.Compare);
     this.Play(this.videosFull[0]);    
   }

   Compare(a,b) {
    if (a.SortOrder < b.SortOrder)
      return -1;
    if (a.SortOrder > b.SortOrder)
      return 1;
    return 0;
  }

   Play(video: Lectures)
   {
      jwplayer("video-body").setup({
      "file": video.url,
      "image": "/assets/build/css/images/temp/video-thumbnail-image-1.jpg"
    });
    
    this.CurrentPlaying=video;

    this.videos=[];
    for(var i=0;i<this.videosFull.length;i++)
        if(this.videosFull[i].ShiurID!==this.CurrentPlaying.ShiurID)
        this.videos.push(this.videosFull[i]);
   }

}
