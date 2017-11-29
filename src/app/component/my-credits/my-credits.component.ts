import { Component, OnInit } from '@angular/core';
import { ShiurimBuy,ShiurimBuyTable,creditsTable } from '../../model/shiurim-buy';
import { MyCreditsService } from '../../service/my-credits.service';

declare var $: any;

@Component({
  selector: 'app-my-credits',
  templateUrl: './my-credits.component.html',
  styleUrls: ['./my-credits.component.css'],
  providers:[MyCreditsService]
})
export class MyCreditsComponent implements OnInit {


  table: creditsTable

  constructor(private myCreditsService:MyCreditsService) { }

  ngOnInit() {
     if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "")
    this.myCreditsService.read().subscribe(response=>{
      this.table=response
    })    
  }

  Navigate()
  {
     $('#credits').toggleClass('shown');
     $("#shop").toggleClass('shown')
  }



}
