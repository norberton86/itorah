import { Component, OnInit } from '@angular/core';
import { ShiurimBuy, ShiurimBuyTable, creditsTable,History } from '../../model/shiurim-buy';
import { Page } from '../../model/Page';
import { MyCreditsService } from '../../service/my-credits.service';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

declare var $: any;

@Component({
  selector: 'app-my-credits',
  templateUrl: './my-credits.component.html',
  styleUrls: ['./my-credits.component.css'],

})
export class MyCreditsComponent implements OnInit {


  table: creditsTable

  histories: Array<History> = []
  allHistoryies: Array<History> = []

  amount: number;

  pages: Array<Page> = [];
  allPages: number;
  iteration: number;
  elem:number=7

  constructor(private myCreditsService: MyCreditsService) {
    this.myCreditsService.getLogin().subscribe(item => {
      if (item == "Signed") {
        this.Load()
      }
      else {
        this.myCreditsService.setCredits(null)  //emit credit null to clean the item on the menu
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "")
      this.Load()
  }

  Load() {
    this.myCreditsService.read().subscribe(response => {
      
      this.myCreditsService.setCredits(response)  //emit the current credit

      this.table = response
      this.allHistoryies = this.table.orderHistory;
      this.Update();

    })
  }

  Navigate() {
    $('#credits').toggleClass('shown');
    $("#shop").toggleClass('shown')
  }

//--------------------------------------------------------------------------------------

  Update() {

    this.amount = this.allHistoryies.length;

    this.allPages = this.allHistoryies.length / this.elem; //pagination
    this.iteration = 1; //pagination

    this.CreatePages();
  }

  CreatePages() {
    this.pages = [];

    for (var i = this.iteration * 6 - 6; i < this.iteration * 6 && i < this.allPages; i++) //populate the pages array
    {
      if (i == (this.iteration - 1) * 6) {
        this.pages.push({ id: i + 1, current: true });
        this.PopulatedHistories(i + 1);  //the page            
      }
      else
        this.pages.push({ id: i + 1, current: false });
    }

  }

  PopulatedHistories(id: number) {
    this.histories = [];
    for (var i = id * this.elem - this.elem; i < id * this.elem && i < this.allHistoryies.length; i++) {
      this.histories.push(this.allHistoryies[i]);  //populate the grid
    }

  }

  PagingPrev() {
    this.iteration--;
    if (this.iteration <= 0) {
      this.iteration = 1;
    }
    else
      this.CreatePages();
  }

  PagingNext() {
    this.iteration++;
    if (this.iteration > Math.ceil(this.allPages / 6)) {
      this.iteration = Math.ceil(this.allPages / 6);
    }
    else
      this.CreatePages();
  }

  Page(id: number) {

    this.pages.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.PopulatedHistories(id);

  }

}
