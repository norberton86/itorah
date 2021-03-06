import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WeeklyResultService } from '../../service/weekly-result.service';
import { HomeService,Source } from '../../service/home.service';
import { PlayerService } from '../../service/player.service';
import { GlobalSearch } from '../../model/global-search';
import { Page } from '../../model/page';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit, OnChanges {

  pattern: string;

  parragraphs: Array<string>;
  asc: boolean = false;

  all: Array<GlobalSearch> = []
  halachat: Array<GlobalSearch> = []
  weekly: Array<GlobalSearch> = []
  berura: Array<GlobalSearch> = []
  emunah: Array<GlobalSearch> = []
  inspire: Array<GlobalSearch> = []

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

  @Input()
  accion: string = "";


  media:string=""
  content:string=""
  title:string=""
  sourceID:number
  mediaId:number

  Back()
  {
    this.content=''
  }


  sources:Array<Source>=[]

  constructor(private playerService: PlayerService, private weeklyResultService: WeeklyResultService,private homeService:HomeService) { }

  ngOnInit() {
    this.Sources()
  }

  GetSourceName(id:number)
  {
      return this.sources.find(i=>i.ID==id).Name
  }

  Sources()
  {
    this.homeService.Sources().subscribe(result=>{
      this.sources=result
    })
  }

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

    this.weeklyResultService.read(this.pattern, "6,16,12", 9, id)
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

  ngOnChanges(changes: any) {

    if (changes.accion.currentValue == "" || changes.accion.currentValue == this.pattern) {

    }
    else {
      this.loading = true
      this.pattern = changes.accion.currentValue;


      let self = this;
      self.weeklyResultService.read(this.pattern, "6,16,12,3,15", 9, 1)
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

        self.weeklyResultService.read(this.pattern, "3", 9, 1)
        .subscribe(function (response) {


          self.UpdateEmunah(response.totalPageCount, response.searchItems)
          self.emunahtotal=response.totalResultCount;
          //self.loading = false

        }, function (error) { }, function () { }
        );

        self.weeklyResultService.read(this.pattern, "15", 9, 1)
        .subscribe(function (response) {


          self.UpdateInspire(response.totalPageCount, response.searchItems)
          self.inspiretotal=response.totalResultCount;
          //self.loading = false

        }, function (error) { }, function () { }
        );
    }


  }

  Print(_title: string, _content: string) {
    this.weeklyResultService.setDataRead({ title: _title, content: "<h4 style='margin-bottom: 2em;'>" + _title + "</h4>" + _content, accion: 'print' })

  }

  PrintHeader() {
    this.weeklyResultService.setDataRead({ title: this.title, content: "<h4 style='margin-bottom: 2em;'>" + this.title + "</h4>" + this.content, accion: 'print' })

  }

  Read(_title: string, _content: string,_media:string,sourceID:number,mediaId:number) {
    //this.weeklyResultService.setDataRead({ title: _title, content: _content, accion: 'read' })
    this.content=_content;
    this.title=_title;
    this.media=_media;
    this.mediaId=mediaId
    this.sourceID=sourceID
  }

  Play(title: string, media: string,sourceid:number,mediaId:string) {
    this.playerService.PlayAudio(title, media,"",sourceid,mediaId)
  }
  PlayHeader()
  {
     this.playerService.PlayAudio(this.title, this.media,"",this.sourceID,this.mediaId.toString())
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
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------

  pagesEmunah: Array<Page> = [];
  allPagesEmunah: number;
  iterationEmunah: number;
  emunahtotal:number

  UpdateEmunah(totalPageCount: number, searchItems: Array<any>) {

    this.allPagesEmunah = totalPageCount; //pagination
    this.iterationEmunah = 1; //pagination

    this.CreatePagesEmunah();
    this.emunah = searchItems
  }

  CreatePagesEmunah() {
    this.pagesEmunah = [];

    for (var i = this.iterationEmunah * 6 - 6; i < this.iterationEmunah * 6 && i < this.allPagesEmunah; i++) //populate the pages array
    {
      if (i == (this.iterationEmunah - 1) * 6) {
        this.pagesEmunah.push({ id: i + 1, current: true });
      }
      else
        this.pagesEmunah.push({ id: i + 1, current: false });
    }

  }


  PageEmunah(id: number) {

    this.pagesEmunah.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.weeklyResultService.read(this.pattern, "3", 9, id)
      .subscribe(response => this.emunah = response.searchItems)

  }

  PagingPrevEmunah() {
    this.iterationEmunah--;
    if (this.iterationEmunah <= 0) {
      this.iterationEmunah = 1;
    }
    else
      this.CreatePagesEmunah();

    this.PageEmunah(this.iterationEmunah)
  }

  PagingNextEmunah() {
    this.iterationEmunah++;
    if (this.iterationEmunah > Math.ceil(this.allPagesEmunah / 6)) {
      this.iterationEmunah = Math.ceil(this.allPagesEmunah / 6);
    }
    else
      this.CreatePagesEmunah();

    this.PageEmunah(this.iterationEmunah)
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------

  pagesInspire: Array<Page> = [];
  allPagesInspire: number;
  iterationInspire: number;
  inspiretotal:number

  UpdateInspire(totalPageCount: number, searchItems: Array<any>) {

    this.allPagesInspire = totalPageCount; //pagination
    this.iterationInspire = 1; //pagination

    this.CreatePagesInspire();
    this.inspire = searchItems
  }

  CreatePagesInspire() {
    this.pagesInspire = [];

    for (var i = this.iterationInspire * 6 - 6; i < this.iterationInspire * 6 && i < this.allPagesInspire; i++) //populate the pages array
    {
      if (i == (this.iterationInspire - 1) * 6) {
        this.pagesInspire.push({ id: i + 1, current: true });
      }
      else
        this.pagesInspire.push({ id: i + 1, current: false });
    }

  }


  PageInspire(id: number) {

    this.pagesInspire.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.weeklyResultService.read(this.pattern, "15", 9, id)
      .subscribe(response => this.inspire = response.searchItems)

  }

  PagingPrevInspire() {
    this.iterationInspire--;
    if (this.iterationInspire <= 0) {
      this.iterationInspire = 1;
    }
    else
      this.CreatePagesInspire();

    this.PageInspire(this.iterationInspire)
  }

  PagingNextInspire() {
    this.iterationInspire++;
    if (this.iterationInspire > Math.ceil(this.allPagesInspire / 6)) {
      this.iterationInspire = Math.ceil(this.allPagesInspire / 6);
    }
    else
      this.CreatePagesInspire();

    this.PageInspire(this.iterationInspire)
  }

}
