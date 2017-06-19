import { Component, OnInit } from '@angular/core';
import { Home,Lectures } from '../../model/Home';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.css'],
  providers:[HomeService]
})
export class VideoThumbnailComponent implements OnInit {

  videos:Array<Lectures>;

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
     
     home.Table2=home.Table2.sort(this.Compare);

     for(var i=0;i<home.Table2.length;i++)
        if(i!=0)
        this.videos.push(home.Table2[i]);
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


   }
}
