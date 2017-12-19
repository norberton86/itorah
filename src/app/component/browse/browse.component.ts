import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { BrowseService } from '../../service/browse.service';
import { ItemQueue, Category } from '../../model/shiurim';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers: [ BrowseService]
})
export class BrowseComponent implements OnInit, OnChanges {

  asc: boolean = false;

  all: Array<ItemQueue> = []
  recently: Array<ItemQueue> = []
  popular: Array<ItemQueue> = []
  relevant: Array<ItemQueue> = []
  browse: Array<ItemQueue> = []

  loading: boolean = false

  category: Category
  categorys: Array<Category> = []

  current: string = "All"

  loadingCategory:boolean=false

  @Input()
  browseClass: string

  constructor(private playerService: PlayerService, private browseService: BrowseService) { }

  ReadCategory() {
    let self = this
    this.browseService.getCategorys().subscribe(function (response) {
      self.categorys.push({ id: 0, name: "Select Category" })
      self.categorys = self.categorys.concat(response)
      self.category = self.categorys[0]

    }, function (error) { }, function () { })
  }

  Category() {
    
    if (this.category.id != 0) {
      this.browse = []
      let self = this
      this.loadingCategory=true
      this.browseService.readCategory(this.category.id).subscribe(function (response) {
        self.browse = response
        self.loadingCategory=false
      }, function (error) { 
        self.loadingCategory=false
      }, function () { }
      );
    }
  }

  ngOnInit() {

    this.ReadCategory();
    this.Read();
  }

  ngOnChanges(changes: any): void {
    this.current = changes.browseClass.currentValue

  }

  Read() {
    let self = this
    Observable.forkJoin(
      this.browseService.readRecently(),
      this.browseService.readPopular(),
      this.browseService.readRelevant()
    )
      .subscribe(function (response) {

        self.recently = response[0]
        self.popular = response[1]
        self.relevant = response[2]

        self.all = self.all.concat(self.recently)
        self.all = self.all.concat(self.popular)
        self.all = self.all.concat(self.relevant)

      }, function (error) { }, function () { }
      );
  }

  Play(id: string, title: string,speaker:string,sponsor:string) {
    var onlyAudio = title.includes('LT-Audio');
    this.playerService.Play(title, id, onlyAudio,speaker,sponsor);
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

  Current(c: string) {
    return c == this.current
  }

  setCurrent(c: string) {
    this.current = c
  }

}
