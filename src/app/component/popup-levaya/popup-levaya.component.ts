import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-popup-levaya',
  templateUrl: './popup-levaya.component.html',
  styleUrls: ['./popup-levaya.component.css'],
})
export class PopupLevayaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openField()
  {
  	$('#form__row-info-levaya').removeClass('hidden');
  }

  closeField()
  {
  	$('#form__row-info-levaya').addClass('hidden');
  }
}
