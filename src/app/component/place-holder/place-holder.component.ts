import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-holder',
  templateUrl: './place-holder.component.html',
  styleUrls: ['./place-holder.component.css']
})
export class PlaceHolderComponent implements OnInit {

  left:string="/assets/build/css/images/temp/left.png"
  right:string="/assets/build/css/images/temp/right.png"
  constructor() { }

  ngOnInit() {
  }

}
