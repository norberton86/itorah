import { Component, OnInit } from '@angular/core';
import { WeeklyResultService } from '../../service/weekly-result.service';
import { PlayerService } from '../../service/player.service';
import { GlobalSearch } from '../../model/global-search';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

declare var $:any; 

@Component({
  selector: 'app-weekly-result',
  templateUrl: './weekly-result.component.html',
  styleUrls: ['./weekly-result.component.css'],
  providers: [PlayerService]
})
export class WeeklyResultComponent implements OnInit {

  pattern: string;
  data:Array<string>=[]

  parragraphs:Array<string>;
  asc:boolean=false;

  all: Array<GlobalSearch> = []
  halachat: Array<GlobalSearch> = []
  weekly: Array<GlobalSearch> = []
  berura: Array<GlobalSearch> = []
  tehillim: Array<GlobalSearch> = []

  constructor(private weeklyResultService: WeeklyResultService, private playerService: PlayerService) {
     this.weeklyResultService.getData().subscribe(item => {
         if(item.pattern!="")
         {
             this.pattern=item.pattern;
             this.data=item.data;

             this.ReadData();
         }
    });
   }


  isAvailable(id:string)
  {
      return this.data.find(i=>i==id)
  }

  ngOnInit() {
  }

  ReadData() {

    if (this.pattern == ""||this.data.length<=0) {

    }
    else {

      this.all=[];
      this.halachat = []
      this.weekly= []
      this.berura = []
      this.tehillim = []


      let self = this;
      self.weeklyResultService.read(this.pattern,this.data.join(","))
        .subscribe(function (response) {


         response.forEach(function(a){
           switch(a.sourceID)
           {
             case 6: self.halachat.push(a);  break;
             case 7: self.tehillim.push(a);  break;
             case 16: self.weekly.push(a);  break;
             case 12: self.berura.push(a);  break;
           }

           self.all.push(a)
         })
        
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
