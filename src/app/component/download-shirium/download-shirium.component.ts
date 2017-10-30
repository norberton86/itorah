import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-download-shirium',
  templateUrl: './download-shirium.component.html',
  styleUrls: ['./download-shirium.component.css']
})
export class DownloadShiriumComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  Close()
  {
    	$('#downloadShirium').toggleClass('shown');
  }

  Download()
  {
    
  }

}
