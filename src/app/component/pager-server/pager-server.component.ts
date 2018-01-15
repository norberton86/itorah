import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { BrowseService } from '../../service/browse.service';
import { Browse } from '../../model/shiurim';
import { Page } from '../../model/page';

@Component({
  selector: 'app-pager-server',
  templateUrl: './pager-server.component.html',
  styleUrls: ['./pager-server.component.css'],
  providers: [PlayerService, BrowseService]
})
export class PagerServerComponent implements OnInit {



  results: Array<Browse> = []


  filterClients: Array<String> = ["Filter", "Author", "Title", "Popularity", "Date"]
  filterClient: String = this.filterClients[0]

  query_main: string = ''

  @Input()
  categoryId: number = 0

  @Input()
  subCategoryId: number = 0

  @Input()
  speakerId: number = 0

  finalCategory: number

  pages: Array<Page> = [];
  allPages: number;
  iteration: number;
  alltotal: number
  all: Array<Browse> = []
  elem: number = 24


  constructor(private playerService: PlayerService, private browseService: BrowseService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: any): void {

    if (this.categoryId != undefined && this.subCategoryId != undefined && this.speakerId != undefined)
      this.Category()
  }

  Search(event) {
    if (event.keyCode == 13) {
      this.Category()
    }
  }

  @Output()
  public myEvent = new EventEmitter<boolean>();

  Category() {

    if (this.categoryId == 0 && this.subCategoryId == 0 && this.speakerId == 0)
      return

    this.all = []
    let self = this
    this.myEvent.next(true)

    this.finalCategory = this.subCategoryId == 0 ? this.categoryId : this.subCategoryId


    this.browseService.readCategory(1, this.elem, this.finalCategory, this.speakerId, this.query_main).subscribe(function (response) {

      self.myEvent.next(false)
      self.Update(response.totalPageCount, response.shiurList)
      self.alltotal = response.totalResultCount;

    }, function (error) {
      self.myEvent.next(false)
    }, function () { }
    );

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

    this.myEvent.next(true)
    this.browseService.readCategory(id, this.elem, this.finalCategory, this.speakerId, this.query_main).subscribe(response => {
      this.myEvent.next(false)
      this.all = response.shiurList
    }
    , error => {
        this.myEvent.next(false)
    }, () => { })

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

  AscDate(a, b) {
    if (a.dateRecorded < b.dateRecorded)
      return -1;
    if (a.dateRecorded > b.dateRecorded)
      return 1;
    return 0;
  }

  //--------------------------------------------------------------------------------------------------------------------------

  AscTitle(a, b) {
    return a.title.localeCompare(b.title)
  }
  //---------------------------------------------------------------------------------------------------------------------------

  AscAuthor(a, b) {
    return a.speaker.localeCompare(b.speaker)
  }
  //---------------------------------------------------------------------------------------------------------------------------

  AscPopularity(a, b) {
    if (a.downloadCount < b.downloadCount)
      return -1;
    if (a.downloadCount > b.downloadCount)
      return 1;
    return 0;
  }
  //---------------------------------------------------------------------------------------------------------------------------

  Sort() {

    switch (this.filterClient) {
      case "Author": this.all = this.all.sort(this.AscAuthor); break;
      case "Title": this.all = this.all.sort(this.AscTitle); break;
      case "Popularity": this.all = this.all.sort(this.AscPopularity); break;
      case "Date": this.all = this.all.sort(this.AscDate); break;
    }

    this.Update(this.allPages, this.all)

  }


  Play(id: string, title: string, sponsor: string, mediaId: string, speakerName: string) {
    var onlyAudio = title.includes('LT-Audio');
    this.playerService.Play(title, id, onlyAudio, speakerName, sponsor, 1, mediaId);
  }

}
