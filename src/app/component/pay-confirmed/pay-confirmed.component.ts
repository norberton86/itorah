import { Component, OnInit, Input } from '@angular/core';

declare var $: any

@Component({
  selector: 'app-pay-confirmed',
  templateUrl: './pay-confirmed.component.html',
  styleUrls: ['./pay-confirmed.component.css']
})
export class PayConfirmedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  Close() {
    $('#payConfirmed').toggleClass('shown');
  }

}
