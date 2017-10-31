import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shiriumBuys: Array<ShiurimBuy> = [{ id: 1, quantity: 5, price: 10 },
  { id: 2, quantity: 10, price: 20 },
  { id: 3, quantity: 13, price: 26 },
  { id: 4, quantity: 25, price: 50 },
  { id: 5, quantity: 50, price: 100 }]

  rows: Array<ShiurimBuyTable> = []

  numbers: Array<number> = []

  constructor() {
    var i = 0                     
    for (i = 1; i <= 10; i++) {
      this.numbers.push(i);
    }

  }

  ngOnInit() {
  }

  Add(id: number) {
    if (!this.rows.find(i => i.id == id)) {        //if doesn't exists
      var s = this.shiriumBuys.filter(i => i.id == id)[0]  //get the value
      if (s != null) {                                 
        this.rows.push(new ShiurimBuyTable(s));        //add to the table
      }
    }

  }

  Remove(id:number)
  {
    this.rows.splice(this.rows.findIndex(i=>i.id==id), 1)
  }

  ChangeCount(id: number, value: number) {
    this.rows.filter(i => i.id == id)[0].count = value
  }

  Total():number
  {
    var sum=0;
    this.rows.forEach(function(r){
       sum+=r.Total()
    })
    return sum
  }

}


class ShiurimBuy {
  id: number
  quantity: number
  price: number
}

class ShiurimBuyTable extends ShiurimBuy {
  count: number = 1

  constructor(s: ShiurimBuy) {
    super()
    this.id = s.id
    this.quantity = s.quantity
    this.price = s.price
  }

  Total()
  {
    return this.count*this.price
  }

}