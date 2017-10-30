import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ShiurimService } from "app/service/shiurim.service";
import { Shiurim } from "app/model/shiurim";
declare var $: any;

@Component({
  selector: 'app-download-shirium',
  templateUrl: './download-shirium.component.html',
  styleUrls: ['./download-shirium.component.css']
})
export class DownloadShiriumComponent implements OnInit, OnChanges {

  @Input()
  credits: number

  currentShirium:Shiurim

  enough:boolean


  constructor(private shiurimService:ShiurimService) {

     this.shiurimService.getItem().subscribe(item => {

       this.enough=item.credits<=this.credits?true:false
       this.currentShirium=item
      
     });
   }

  ngOnChanges(changes: any): void {
    this.credits = changes.credits.currentValue
  }

  ngOnInit() {
  }

  Close() {
    $('#downloadShirium').toggleClass('shown');
  }

  Download() {

  }

  goShop()
  {
    this.Close();
    $("#shop").toggleClass('shown')
  }

}
