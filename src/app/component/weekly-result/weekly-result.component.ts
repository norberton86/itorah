import { Component, OnInit } from '@angular/core';
import { WeeklyResultService } from '../../service/weekly-result.service';
import { PlayerService } from '../../service/player.service';
import { GlobalSearch } from '../../model/global-search';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Page } from '../../model/page';

declare var $: any;

@Component({
  selector: 'app-weekly-result',
  templateUrl: './weekly-result.component.html',
  styleUrls: ['./weekly-result.component.css'],
  providers: [PlayerService]
})
export class WeeklyResultComponent implements OnInit {

  pattern: string;
  data: Array<string> = []

  parragraphs: Array<string>;
  asc: boolean = false;

  all: Array<GlobalSearch> = []
  halachat: Array<GlobalSearch> = []
  weekly: Array<GlobalSearch> = []
  berura: Array<GlobalSearch> = []
  //tehillim: Array<GlobalSearch> = []

  loading: boolean = false

  pages: Array<Page> = [];
  allPages: number;
  iteration: number;
  alltotal:number

  pagesHalachat: Array<Page> = [];
  allPagesHalachat: number;
  iterationHalachat: number;
  halachatotal:number

  pagesWeekly: Array<Page> = [];
  allPagesWeekly: number;
  iterationWeekly: number;
  weeklytotal:number

  pagesMishna: Array<Page> = [];
  allPagesMishna: number;
  iterationMishna: number;
  mishnatotal:number

 /* pagesTehillim: Array<Page> = [];
  allPagesTehillim: number;
  iterationTehillim: number;
  tehellimtotal:number*/


  content:string=""
  title:string=""
  media:string=""
  Back()
  {
    this.content=''
  }


  constructor(private weeklyResultService: WeeklyResultService, private playerService: PlayerService) {
    this.weeklyResultService.getData().subscribe(item => {
      if (item.pattern != "" && this.pattern != item.pattern) {
        this.pattern = item.pattern;
        this.data = item.data;

        this.ReadData();
      }
    });
  }


  isAvailable(id: string) {
    return this.data.find(i => i == id)
  }

  ngOnInit() {
  }

  ReadData() {

    if (this.pattern == "" || this.data.length <= 0) {

    }
    else {

      this.loading = true

      let self = this;
      self.weeklyResultService.read(this.pattern, "6,16,12", 9, 1)
        .subscribe(function (response) {


          self.Update(response.totalPageCount, response.searchItems)
          self.alltotal=response.totalResultCount;
          self.loading = false

        }, function (error) { }, function () { }
        );

      self.weeklyResultService.read(this.pattern, "6", 9, 1)
        .subscribe(function (response) {


          self.UpdateHalachat(response.totalPageCount, response.searchItems)
          self.halachatotal=response.totalResultCount;
          //self.loading = false

        }, function (error) { }, function () { }
        );

      self.weeklyResultService.read(this.pattern, "16", 9, 1)
        .subscribe(function (response) {


          self.UpdateWeekly(response.totalPageCount, response.searchItems)
          self.weeklytotal=response.totalResultCount;
          //self.loading = false

        }, function (error) { }, function () { }
        );

      self.weeklyResultService.read(this.pattern, "12", 9, 1)
        .subscribe(function (response) {


          self.UpdateMishna(response.totalPageCount, response.searchItems)
          self.mishnatotal=response.totalResultCount;
          //self.loading = false

        }, function (error) { }, function () { }
        );

      /*  self.weeklyResultService.read(this.pattern, "7", 9, 1)
        .subscribe(function (response) {


          self.UpdateTehillim(response.totalPageCount, response.searchItems)
          self.tehellimtotal=response.totalResultCount;
          //self.loading = false

        }, function (error) { }, function () { }
        );*/

    }

  }


  Print(_title: string, _content: string) {
    this.weeklyResultService.setDataRead({ title: _title, content: "<h4 style='margin-bottom: 2em;'>" + _title + "</h4>" + _content, accion: 'print' })

  }
  PrintHeader() {
    this.weeklyResultService.setDataRead({ title: this.title, content: "<h4 style='margin-bottom: 2em;'>" + this.title + "</h4>" + this.content, accion: 'print' })

  }

  Read(_title: string, _content: string,_media:string) {
    //this.weeklyResultService.setDataRead({ title: _title, content: _content, accion: 'read' })
    this.content=_content;
    this.title=_title;
    this.media=_media;
  }

  Play(title: string, media: string) {
    this.playerService.PlayAudio(title, media,"")
  }

  PlayHeader()
  {
     this.playerService.PlayAudio(this.title, this.media,"")
  }

  Desc(a, b) {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }

  Asc(a, b) {
    if (a.date > b.date)
      return -1;
    if (a.date < b.date)
      return 1;
    return 0;
  }

  Sort(col) {
    this.asc = !this.asc;
    if (this.asc)
      col = col.sort(this.Asc)
    else
      col = col.sort(this.Desc)
  }

  //--------------------------------------------------------------------------------------------------------------------

  Update(totalPageCount: number, searchItems: Array<any>) {

    this.allPages = totalPageCount; //pagination
    this.iteration = 1; //pagination

    this.CreatePages();
    this.all = searchItems
  
  }

  CreatePages() {
    this.pages = [];

    for (var i = this.iteration * 6 - 6; i < this.iteration * 6 && i < this.allPages; i++) //populate the pages array
    {
      if (i == (this.iteration - 1) * 6) {
        this.pages.push({ id: i + 1, current: true });
      }
      else
        this.pages.push({ id: i + 1, current: false });
    }

  }


  Page(id: number) {

    this.pages.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.weeklyResultService.read(this.pattern, "6,16,12,7", 9, id)
      .subscribe(response => this.all = response.searchItems)

  }

  PagingPrev() {
    this.iteration--;
    if (this.iteration <= 0) {
      this.iteration = 1;
    }
    else
      this.CreatePages();

    this.Page(this.iteration)
  }

  PagingNext() {
    this.iteration++;
    if (this.iteration > Math.ceil(this.allPages / 6)) {
      this.iteration = Math.ceil(this.allPages / 6);
    }
    else
      this.CreatePages();

    this.Page(this.iteration)
  }

  //-------------------------------------------------------------------------------------------------------------------------------------
  UpdateHalachat(totalPageCount: number, searchItems: Array<any>) {

    this.allPagesHalachat = totalPageCount; //pagination
    this.iterationHalachat = 1; //pagination

    this.CreatePagesHalachat();
    this.halachat = searchItems
  }

  CreatePagesHalachat() {
    this.pagesHalachat = [];

    for (var i = this.iterationHalachat * 6 - 6; i < this.iterationHalachat * 6 && i < this.allPagesHalachat; i++) //populate the pages array
    {
      if (i == (this.iterationHalachat - 1) * 6) {
        this.pagesHalachat.push({ id: i + 1, current: true });
      }
      else
        this.pagesHalachat.push({ id: i + 1, current: false });
    }

  }


  PageHalachat(id: number) {

    this.pagesHalachat.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.weeklyResultService.read(this.pattern, "6", 9, id)
      .subscribe(response => this.halachat = response.searchItems)

  }

  PagingPrevHalachat() {
    this.iterationHalachat--;
    if (this.iterationHalachat <= 0) {
      this.iterationHalachat = 1;
    }
    else
      this.CreatePagesHalachat();

    this.PageHalachat(this.iterationHalachat)
  }

  PagingNextHalachat() {
    this.iterationHalachat++;
    if (this.iterationHalachat > Math.ceil(this.allPagesHalachat / 6)) {
      this.iterationHalachat = Math.ceil(this.allPagesHalachat / 6);
    }
    else
      this.CreatePagesHalachat();

    this.PageHalachat(this.iterationHalachat)
  }
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  UpdateWeekly(totalPageCount: number, searchItems: Array<any>) {

    this.allPagesWeekly = totalPageCount; //pagination
    this.iterationWeekly = 1; //pagination

    this.CreatePagesWeekly();
    this.weekly = searchItems
  }

  CreatePagesWeekly() {
    this.pagesWeekly = [];

    for (var i = this.iterationWeekly * 6 - 6; i < this.iterationWeekly * 6 && i < this.allPagesWeekly; i++) //populate the pages array
    {
      if (i == (this.iterationWeekly - 1) * 6) {
        this.pagesWeekly.push({ id: i + 1, current: true });
      }
      else
        this.pagesWeekly.push({ id: i + 1, current: false });
    }

  }


  PageWeekly(id: number) {

    this.pagesWeekly.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.weeklyResultService.read(this.pattern, "16", 9, id)
      .subscribe(response => this.weekly = response.searchItems)

  }

  PagingPrevWeekly() {
    this.iterationWeekly--;
    if (this.iterationWeekly <= 0) {
      this.iterationWeekly = 1;
    }
    else
      this.CreatePagesWeekly();

    this.PageWeekly(this.iterationWeekly)
  }

  PagingNextWeekly() {
    this.iterationWeekly++;
    if (this.iterationWeekly > Math.ceil(this.allPagesWeekly / 6)) {
      this.iterationWeekly = Math.ceil(this.allPagesWeekly / 6);
    }
    else
      this.CreatePagesWeekly();

    this.PageWeekly(this.iterationWeekly)
  }
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  UpdateMishna(totalPageCount: number, searchItems: Array<any>) {

    this.allPagesMishna = totalPageCount; //pagination
    this.iterationMishna = 1; //pagination

    this.CreatePagesMishna();
    this.berura = searchItems
  }

  CreatePagesMishna() {
    this.pagesMishna = [];

    for (var i = this.iterationMishna * 6 - 6; i < this.iterationMishna * 6 && i < this.allPagesMishna; i++) //populate the pages array
    {
      if (i == (this.iterationMishna - 1) * 6) {
        this.pagesMishna.push({ id: i + 1, current: true });
      }
      else
        this.pagesMishna.push({ id: i + 1, current: false });
    }

  }


  PageMishna(id: number) {

    this.pagesMishna.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.weeklyResultService.read(this.pattern, "12", 9, id)
      .subscribe(response => this.berura = response.searchItems)

  }

  PagingPrevMishna() {
    this.iterationMishna--;
    if (this.iterationMishna <= 0) {
      this.iterationMishna = 1;
    }
    else
      this.CreatePagesMishna();

    this.PageMishna(this.iterationMishna)
  }

  PagingNextMishna() {
    this.iterationMishna++;
    if (this.iterationMishna > Math.ceil(this.allPagesMishna / 6)) {
      this.iterationMishna = Math.ceil(this.allPagesMishna / 6);
    }
    else
      this.CreatePagesMishna();

    this.PageMishna(this.iterationMishna)
  }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------
 /* UpdateTehillim(totalPageCount: number, searchItems: Array<any>) {

    this.allPagesTehillim = totalPageCount; //pagination
    this.iterationTehillim = 1; //pagination

    this.CreatePagesTehillim();
    this.tehillim = searchItems
  }

  CreatePagesTehillim() {
    this.pagesTehillim = [];

    for (var i = this.iterationTehillim * 6 - 6; i < this.iterationTehillim * 6 && i < this.allPagesTehillim; i++) //populate the pages array
    {
      if (i == (this.iterationTehillim - 1) * 6) {
        this.pagesTehillim.push({ id: i + 1, current: true });
      }
      else
        this.pagesTehillim.push({ id: i + 1, current: false });
    }

  }


  PageTehillim(id: number) {

    this.pagesTehillim.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.weeklyResultService.read(this.pattern, "7", 9, id)
      .subscribe(response => this.tehillim = response.searchItems)

  }

  PagingPrevTehillim() {
    this.iterationTehillim--;
    if (this.iterationTehillim <= 0) {
      this.iterationTehillim = 1;
    }
    else
      this.CreatePagesTehillim();

    this.PageTehillim(this.iterationTehillim)
  }

  PagingNextTehillim() {
    this.iterationTehillim++;
    if (this.iterationTehillim > Math.ceil(this.allPagesTehillim / 6)) {
      this.iterationTehillim = Math.ceil(this.allPagesTehillim / 6);
    }
    else
      this.CreatePagesTehillim();

    this.PageTehillim(this.iterationTehillim)
  }*/


}
