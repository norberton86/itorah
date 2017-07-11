import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-holder',
  templateUrl: './place-holder.component.html',
  styleUrls: ['./place-holder.component.css']
})
export class PlaceHolderComponent implements OnInit {

  left:string=""
  right:string=""
  constructor() { }

  ngOnInit() {
  }

}
