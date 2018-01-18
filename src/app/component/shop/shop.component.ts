import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { ShiurimBuy, ShiurimBuyTable } from '../../model/shiurim-buy';
import { CreditCard } from '../../model/credit-card';
import { ShopService } from '../../service/shop.service';
import { PaymentService } from '../../service/payment.service';

declare var $: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [ShopService]
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

  constructor(private _fb: FormBuilder, private shopService: ShopService,private paymentService:PaymentService) {
    var i = 0
    for (i = 1; i <= 10; i++) {
      this.numbers.push(i);
    }

  }

  ngOnInit() {
    this.form = this._fb.group({
      creditCard: ['', Validators.compose([<any>CreditCardValidator.validateCCNumber, Validators.required])],
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

  Remove(id: number) {
    this.rows.splice(this.rows.findIndex(i => i.id == id), 1)
  }

  ChangeCount(id: number, value: number) {
    this.rows.filter(i => i.id == id)[0].count = value
  }

  Total(): number {
    var sum = 0;
    this.rows.forEach(function (r) {
      sum += r.Total()
    })
    return sum
  }

  Buy() {
    if (this.rows.length > 0) {
      $('#shop-2')
        .removeClass('hidden')
        .siblings('.popup-body')
        .addClass('hidden')
    }
  }

  requesting: boolean = false
  paymentError: boolean = false

  Save(cc: CreditCard) {

    if (this.requesting)
      return

    this.requesting = true

    var data = { Amount: cc.Amount, CardExpDate: cc.CardExpDate, CardHolderName: cc.CardHolderName, CardNumber: cc.CardNumber, CVV: cc.CVV }

    this.shopService.add(data).subscribe(result => {
      this.requesting = false
      if (result == "Success") {
          this.Reset()
          this.paymentService.setItem('reset')  //order reset the nested payment component
          $('#shop').toggleClass('shown');
          $('#payConfirmed').toggleClass('shown');
      }
      else
        this.paymentError = true
    },
      error => {
        this.requesting = false
        this.paymentError = true
      }, () => {

      })
  }

  Reset()
  {
    this.rows=[]

    $('#shop-2')                      //come back to original position
        .addClass('hidden')
        .siblings('.popup-body')
        .removeClass('hidden')
  }

  Close()
  {
    this.paymentService.setItem('reset')
  }

}


