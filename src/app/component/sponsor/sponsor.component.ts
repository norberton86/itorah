import { Component, OnInit } from '@angular/core';
import { Sponsors } from '../../model/sponsors';
import { SponsorService } from '../../service/sponsor.service';
import { IMyDpOptions } from 'mydatepicker';
declare var $: any;

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css'],
  providers: [SponsorService]
})
export class SponsorComponent implements OnInit {
  value: number = 0

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm.dd.yyyy',
  };

  
  public date: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };

  constructor(private sponsorService: SponsorService) {

  }

  ngOnInit() {
    setTimeout(function(){
      $('#sponsorDate .mydp .selectiongroup').css('padding-right','10px')
      $('#sponsorDate .mydp .btnclear,#sponsorDate .mydp .btnpicker').css('background','transparent')
      $('#sponsorDate .mydp .selbtngroup').css('top','6px')
    },1000)
   
  }

  Save(status: boolean) {

  }

}
