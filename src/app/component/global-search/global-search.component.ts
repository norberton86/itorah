import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GlobalSearchService } from '../../service/global-search.service';
import { WeeklyResultService } from '../../service/weekly-result.service';
import { PlayerService } from '../../service/player.service';
import { GlobalSearch } from '../../model/global-search';

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

   loading:boolean=false


  @Input()
  accion: string = "";

  constructor(private globalSearchService: GlobalSearchService, private playerService: PlayerService,private weeklyResultService:WeeklyResultService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {

    if(changes.accion.currentValue == "" || changes.accion.currentValue==this.pattern) {

    }
    else {
      this.loading=true
      this.pattern=changes.accion.currentValue;

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

         self.loading=false
        
      }, function (error) { }, function () { }
      );
    }


  }

 Print(_title:string,_content:string)
  {
    this.weeklyResultService.setDataRead({title:_title,content:"<h4 style='margin-bottom: 2em;'>"+_title+"</h4>"+_content,accion:'print'})
     
  }

  Read(_title:string,_content:string)
  {
     this.weeklyResultService.setDataRead({title:_title,content:_content,accion:'read'})
    
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
