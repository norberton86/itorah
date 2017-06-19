import { Component, OnInit } from '@angular/core';
import { Home } from '../../model/Home';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-daily-halacha',
  templateUrl: './daily-halacha.component.html',
  styleUrls: ['./daily-halacha.component.css'],
  providers:[HomeService]
})
export class DailyHalachaComponent implements OnInit {

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
        if(home.Table[i].Site=="Daily Halacha")
         this.Count=home.Table[i].Count;

   }
}
