import { Component, OnInit } from '@angular/core';
import { BeruraDailyService } from '../../service/berura-daily.service';
import { PlayerService } from '../../service/player.service';
import { BeruraDaily } from '../../model/berura-daily';
import { Page } from '../../model/page';

@Component({
  selector: 'app-berura-daily',
  templateUrl: './berura-daily.component.html',
  styleUrls: ['./berura-daily.component.css'],
  providers:[BeruraDailyService,PlayerService]
})
export class BeruraDailyComponent implements OnInit {

  query_main:string=''
  dailys:Array<BeruraDaily>=[]

  pages:Array<Page>;
  allPages:number;
  iteration:number;

  constructor(private beruraDailyService: BeruraDailyService,private playerService:PlayerService) { }

 ngOnInit() {
    this.Read();
  }

  Read()
  {
      let self=this;
      this.beruraDailyService.read().subscribe(
           function(respond){
              self.dailys=respond;
           },
           function(error){},
           function(){}
       )
   
  }
  
  ReadPdf(url:string)
  {
      window.open(url)
  }

  Play(title:string,url:string)
  {
    this.playerService.PlayAudio(title,url);
  }
}
