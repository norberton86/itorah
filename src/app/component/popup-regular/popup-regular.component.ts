import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-popup-regular',
  templateUrl: './popup-regular.component.html',
  styleUrls: ['./popup-regular.component.css'],
})
export class PopupRegularComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openField()
  {
  	$('#form__row-info').removeClass('hidden');
  }

  closeField()
  {
  	$('#form__row-info').addClass('hidden');
  }
}
