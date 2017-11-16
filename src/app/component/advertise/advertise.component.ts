import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {

  impressions:Array<Impression>=[{price:50,amount:100},{price:100,amount:200}]
  impression:Impression

  lastName:string
  firstName:string
  address:string
  addressTwo:string
  phone:string
  email:string
  city:string
  state:string
  zip:string

  constructor() { }

  ngOnInit() {
    this.impression=this.impressions[0]
  }

  Save(status:boolean)
  {

  }

}

class Impression{
  price:number
  amount:number
}
