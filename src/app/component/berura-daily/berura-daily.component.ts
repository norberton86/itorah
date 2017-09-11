import { Component, OnInit } from '@angular/core';
import { BeruraDailyService } from '../../service/berura-daily.service';
import { PlayerService } from '../../service/player.service';
import { BeruraDaily } from '../../model/berura-daily';
import { Page } from '../../model/page';

@Component({
  selector: 'app-berura-daily',
  templateUrl: './berura-daily.component.html',
  styleUrls: ['./berura-daily.component.css'],
  providers: [BeruraDailyService, PlayerService]
})
export class BeruraDailyComponent implements OnInit {

  query_main: string = ''
  dailys: Array<BeruraDaily> = []
  allDailys: Array<BeruraDaily> = []

  pages: Array<Page>;
  allPages: number;
  iteration: number;

  amount: number

  constructor(private beruraDailyService: BeruraDailyService, private playerService: PlayerService) {
    this.allDailys = [];
    this.dailys = [];

    this.pages = [];
  }

  ngOnInit() {
    this.Read();
  }

  keyDownEmunahFunction(event) {
    this.Search()
  }

  Search() {

    if (localStorage.getItem("bdaily") != null || localStorage.getItem("bdaily") != '') {
      this.allDailys = JSON.parse(localStorage.getItem("bdaily"));  //recover the originals
    }

    this.Update();
  }

  searchShiriumEmunah() {
    this.Search()
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

    this.PopulatedShirium(id);

  }


  Update() {

    if (this.query_main != "") {
      var query = this.query_main;
      this.allDailys = this.allDailys.filter(function (s) {
        return s.siman.toLowerCase().indexOf(query.toLowerCase()) >= 0
      });
    }

    this.amount = this.allDailys.length;

    this.allPages = this.allDailys.length / 9; //pagination
    this.iteration = 1; //pagination

    this.CreatePages();

  }

  CreatePages() {
    this.pages = [];

    for (var i = this.iteration * 6 - 6; i < this.iteration * 6 && i < this.allPages; i++) //populate the pages array
    {
      if (i == (this.iteration - 1) * 6) {
        this.pages.push({ id: i + 1, current: true });
        this.PopulatedShirium(i + 1);  //the page            
      }
      else
        this.pages.push({ id: i + 1, current: false });
    }

  }

  PopulatedShirium(id: number) {
    this.dailys = [];
    for (var i = id * 9 - 9; i < id * 9 && i < this.allDailys.length; i++) {
      this.dailys.push(this.allDailys[i]);  //populate the grid
    }

  }

  Read() {
    let self = this;
    this.beruraDailyService.read().subscribe(
      function (respond) {
        self.allDailys = respond;

        localStorage.setItem("bdaily", JSON.stringify(respond));

        self.Update();
      },
      function (error) { },
      function () { }
    )

  }

  ReadPdf(url: string) {
    window.open(url)
  }

  Play(title: string, url: string) {
    this.playerService.PlayAudio(title, url);
  }
}
