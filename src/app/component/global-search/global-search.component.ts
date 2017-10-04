import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GlobalSearchService } from '../../service/global-search.service';
import { WeeklyResultService } from '../../service/weekly-result.service';
import { PlayerService } from '../../service/player.service';
import { GlobalSearch } from '../../model/global-search';
import { Page } from '../../model/page';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css'],
  providers: [GlobalSearchService, PlayerService]
})
export class GlobalSearchComponent implements OnInit, OnChanges {

  pattern: string;

  parragraphs: Array<string>;
  asc: boolean = false;

  all: Array<GlobalSearch> = []
  halachat: Array<GlobalSearch> = []
  weekly: Array<GlobalSearch> = []
  berura: Array<GlobalSearch> = []

  loading: boolean = false

  pages: Array<Page> = [];
  allPages: number;
  iteration: number;


  @Input()
  accion: string = "";

  constructor(private globalSearchService: GlobalSearchService, private playerService: PlayerService, private weeklyResultService: WeeklyResultService) { }

  ngOnInit() {
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

    this.globalSearchService.read(this.pattern, "6,16,12", 9, id)
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
      self.globalSearchService.read(this.pattern, "6,16,12", 9, 1)
        .subscribe(function (response) {


          self.Update(response.totalPageCount, response.searchItems)

          self.loading = false

        }, function (error) { }, function () { }
        );
    }


  }

  Print(_title: string, _content: string) {
    this.weeklyResultService.setDataRead({ title: _title, content: "<h4 style='margin-bottom: 2em;'>" + _title + "</h4>" + _content, accion: 'print' })

  }

  Read(_title: string, _content: string) {
    this.weeklyResultService.setDataRead({ title: _title, content: _content, accion: 'read' })

  }

  Play(title: string, media: string) {
    this.playerService.PlayAudio(title, media)
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
}
