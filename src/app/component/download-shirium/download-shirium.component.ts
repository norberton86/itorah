import { Component, OnInit, Input } from '@angular/core';
import { ShiurimService } from "app/service/shiurim.service";
import { Shiurim } from "app/model/shiurim";
declare var $: any;

@Component({
  selector: 'app-download-shirium',
  templateUrl: './download-shirium.component.html',
  styleUrls: ['./download-shirium.component.css']
})
export class DownloadShiriumComponent implements OnInit {

  message: string
  enough: boolean
  id:string

  constructor(private shiurimService: ShiurimService) {

    this.shiurimService.getItem().subscribe(item => {

      this.message = item.description
      this.enough=item.description.indexOf("Please")<0
      this.id=item.id

    });
  }


  ngOnInit() {
  }

  Close() {
    $('#downloadShirium').toggleClass('shown');
  }

  Download() {

   this.shiurimService.ConfirmDownload(this.id).subscribe(item=>{
       document.getElementById('downloadShiur').click()
   })

  }

  goShop() {
    this.Close();
    $("#shop").toggleClass('shown')
  }

}
