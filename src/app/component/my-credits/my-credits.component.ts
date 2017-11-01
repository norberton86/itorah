import { Component, OnInit } from '@angular/core';
import { ShiurimBuy,ShiurimBuyTable,ShiurimBuyTableHistory } from '../../model/shiurim-buy';
declare var $: any;

@Component({
  selector: 'app-my-credits',
  templateUrl: './my-credits.component.html',
  styleUrls: ['./my-credits.component.css']
})
export class MyCreditsComponent implements OnInit {


  rows: Array<ShiurimBuyTableHistory> = []

  constructor() { }

  ngOnInit() {

    var s=new ShiurimBuyTable({ id: 2, quantity: 10, price: 20 })
    var item=new ShiurimBuyTableHistory(s,new Date())
    this.rows.push(item);
    this.rows.push(item);
    this.rows.push(item);
  }

  Navigate()
  {
     $('#credits').toggleClass('shown');
     $("#shop").toggleClass('shown')
  }

}
