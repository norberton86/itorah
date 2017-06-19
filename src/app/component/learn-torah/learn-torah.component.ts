import { Component, OnInit } from '@angular/core';

import { Home } from '../../model/Home';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-learn-torah',
  templateUrl: './learn-torah.component.html',
  styleUrls: ['./learn-torah.component.css'],
  providers:[HomeService]
})
export class LearnTorahComponent implements OnInit {


  Count:number;

  constructor(private homeService:HomeService) { }

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
      for(var i=0;i<home.Table.length;i++)
        if(home.Table[i].Site=="Learn Torah")
         this.Count=home.Table[i].Count;

   }

}
