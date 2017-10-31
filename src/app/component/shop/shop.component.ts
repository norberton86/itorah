import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
declare var $:any; 
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

  form: FormGroup;

  constructor(private _fb: FormBuilder) {
    var i = 0                     
    for (i = 1; i <= 10; i++) {
      this.numbers.push(i);
    }

  }

  ngOnInit() {
    this.form = this._fb.group({
      creditCard: ['',Validators.compose([ <any>CreditCardValidator.validateCCNumber,Validators.required])],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]]
    });
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

  onSubmit()
  {
    
    
  }

  Buy()
  {
    if(this.rows.length>0)
    {
      	$('#shop-2')
				.removeClass('hidden')
					.siblings('.popup-body')
					.addClass('hidden')
    }
  }

  Validate()
  {
    return this.form.controls.cvc.errors!=null || this.form.controls.creditCard.errors!=null||this.form.controls.expirationDate.errors!=null
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