import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GlobalSearchService } from '../../service/global-search.service';
import { PlayerService } from '../../service/player.service';
import { GlobalSearch } from '../../model/global-search';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

declare var $:any; 

@Component({
  selector: 'app-weekly-result',
  templateUrl: './weekly-result.component.html',
  styleUrls: ['./weekly-result.component.css'],
  providers: [GlobalSearchService, PlayerService]
})
export class WeeklyResultComponent implements OnInit, OnChanges {

  pattern: string;

  parragraphs:Array<string>;
  asc:boolean=false;

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
      let self = this;
      Observable.forkJoin(
        this.globalSearchService.readHalachat(),
        this.globalSearchService.readWeekly(),
        this.globalSearchService.readBerura()
      )
        .subscribe(function (response) {
          self.halachat = response[0]
          self.weekly = response[1]
          self.berura = response[2]
          var temp=response[0].concat(response[1])
          self.all=temp.concat(response[2])
        }, function (error) { }, function () { }
        );
    }


  }
  
  Print(title:string,content:string)
  {
     
     this.parragraphs=content.split("\n").filter(function (s) {
                     return s!="";
                  });  
      
      var  p = '<div>'
		  	p+=  "<h2>"+title+"</h2>"
         
        this.parragraphs.forEach(function(a){

            p+='<p>'
            p+=a
            p+='</p>'
        })

		    p+='</div>'



    $(p).print();
  }

  Read(content:string)
  {

  }
  
  Play(title: string, media: string) {
      this.playerService.PlayAudio(title, media)
  }

  Desc(a,b) {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }

  Asc(a,b) {
    if (a.date > b.date)
      return -1;
    if (a.date < b.date)
      return 1;
    return 0;
  }

 Sort(col)
 {   
     this.asc=!this.asc;  
     if(this.asc)
     col=col.sort(this.Asc)
     else
     col=col.sort(this.Desc)
 }
}
