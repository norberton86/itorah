import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GlobalSearchService } from '../../service/global-search.service';
import { PlayerService } from '../../service/player.service';
import { GlobalSearch } from '../../model/global-search';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

declare var $: any;

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

  @Input()
  accion: string = "";

  constructor(private globalSearchService: GlobalSearchService, private playerService: PlayerService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {


    this.pattern = changes.accion.currentValue




    if (this.pattern == "") {

    }
    else {
      this.all = [];
      this.halachat = []
      this.weekly = []
      this.berura = []

      let self = this;
      self.globalSearchService.read(this.pattern,"6,16,12")
        .subscribe(function (response) {


         response.forEach(function(a){
           switch(a.sourceID)
           {
             case 6: self.halachat.push(a);  break;
             case 16: self.weekly.push(a);  break;
             case 12: self.berura.push(a);  break;
           }

           self.all.push(a)
         })
        
      }, function (error) { }, function () { }
      );
    }


  }

  Print(title: string, content: string) {

    this.parragraphs = content.split("\n").filter(function (s) {
      return s != "";
    });

    var p = '<div>'
    p += "<h2>" + title + "</h2>"

    this.parragraphs.forEach(function (a) {

      p += '<p>'
      p += a
      p += '</p>'
    })

    p += '</div>'



    $(p).print();
  }

  Read(content: string) {

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
