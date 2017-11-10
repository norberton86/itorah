import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-popup-emergency',
  templateUrl: './popup-emergency.component.html',
  styleUrls: ['./popup-emergency.component.css'],
})
export class PopupEmergencyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openField()
  {
  	$('#form__row-info-emergency').removeClass('hidden');
  }

  closeField()
  {
  	$('#form__row-info-emergency').addClass('hidden');
  }
}
