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
    this.Reset()
    $('#downloadShirium').toggleClass('shown');
  }

  Download() {

   this.shiurimService.ConfirmDownload(this.id).subscribe(item=>{
       
       this.item=item
       this.StartDowload()

       this.headerTitle="Downloading ..."
       this.started=true
       //"Download should start automatically. Click here if download does not start after 5 seconds "
       
   })

  }

  goHistory()
  {
    this.Reset()
    this.CloseBalloon()
    $("#credits").toggleClass('shown')
  }

    CloseBalloon()
  {
    var href =$('.vissible').attr('id')
    if(href!=undefined)
    {
      
      $('a[href="#'+href+'"]')[0].click() //close the balloon
    }
   
  }
  
  StartDowload()
  {
    $('#downloadShiur').attr("href",this.item)
    document.getElementById('downloadShiur').click()
  }

  goShop() {
    this.Close();
    $("#shop").toggleClass('shown')
  }


  Reset()
  {
    this.started=false
    this.headerTitle="Purchase Shirium"
    this.item=''
  }

  started:boolean=false
  headerTitle:string="Purchase Shirium"
  item:string=''

}
