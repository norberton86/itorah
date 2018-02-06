import { Component, OnInit } from '@angular/core';

declare var $:any

@Component({
  selector: 'app-account-confirmed',
  templateUrl: './account-confirmed.component.html',
  styleUrls: ['./account-confirmed.component.css']
})
export class AccountConfirmedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   Close() {
    $('#accountConfirmed').toggleClass('shown');
  }



}
