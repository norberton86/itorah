import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { BrowseService } from '../../service/browse.service';
import { GlobalSearch } from '../../model/global-search';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers:[PlayerService,BrowseService]
})
export class BrowseComponent   implements OnInit{

  asc: boolean = false;

  all: Array<GlobalSearch> = []
  recently: Array<GlobalSearch> = []
  popular: Array<GlobalSearch> = []
  relevant: Array<GlobalSearch> = []
  browse: Array<GlobalSearch> = []

  loading:boolean=false

  constructor(private playerService:PlayerService,private browseService:BrowseService) { }

  ngOnInit() {
    
      let self = this;
      self.browseService.read("rabbi","6,12,16,7")
        .subscribe(function (response) {


         response.forEach(function(a){
           switch(a.sourceID)
           {
             case 6: self.recently.push(a);  break;
             case 16: self.popular.push(a);  break;
             case 12: self.relevant.push(a);  break;
             case 7: self.browse.push(a);  break;
           }

           self.all.push(a)
         })

         self.loading=false
        
      }, function (error) { }, function () { }
      );
  }

  Play(title: string, media: string) {
    this.playerService.PlayAudio(title, media)
  }

  Desc(a, b) {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }

  Asc(a, b) {
    if (a.date > b.date)
      return -1;
    if (a.date < b.date)
      return 1;
    return 0;
  }

  Sort(col) {
    this.asc = !this.asc;
    if (this.asc)
      col = col.sort(this.Asc)
    else
      col = col.sort(this.Desc)
  }

  

}
