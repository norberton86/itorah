import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-today-sponsor',
  templateUrl: './today-sponsor.component.html',
  styleUrls: ['./today-sponsor.component.css'],
  providers:[HomeService]
})
export class TodaySponsorComponent implements OnInit {


 dedicated:string
 todayDate:Date=new Date()

  constructor(private homeService:HomeService) { }

  ngOnInit() {
    this.homeService.read().subscribe(response=>{
         
         if(response.Table3.length>0)
             this.dedicated=response.Table3[0].Sponsor
    })
  }

}
