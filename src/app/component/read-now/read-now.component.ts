import { Component, OnInit,Input ,OnChanges} from '@angular/core';
import { ReadNow } from '../../model/home';
import { PlayerService } from '../../service/player.service';
import { HomeService } from '../../service/home.service';

declare var $: any;

@Component({
  selector: 'app-read-now',
  templateUrl: './read-now.component.html',
  styleUrls: ['./read-now.component.css'],
  providers:[PlayerService]
})
export class ReadNowComponent implements OnInit,OnChanges {

  @Input()
  title: string
  
  @Input()
  content: string

  
  

  parragraphs:Array<string>=[]

  formatted:boolean;

  constructor(private playerService:PlayerService,private homeService: HomeService) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: any): void {
    this.title=changes.title.currentValue
    this.content=changes.content.currentValue

    
    if(this.content!=null && this.content!='')
    {
       if(this.content.indexOf('</p>')>=0)//determinate the format type(in this case has hmtl tags)
      {
        this.formatted=true
      }
      else
      if(this.content.indexOf('\n')>=0) //in this case has special characters format
      {
        this.parragraphs=this.content.split("\n").filter(function (s) {  //split by '\n' and get parragraphs
          return s != "";
        });
         
         this.formatted=false

      }
      
    }
     

  }

  Print() {
    $('#printRead').print();
  }

  Play() {

    let self = this;
    this.homeService.playNow(6).subscribe(
      function (response) {
          self.playerService.PlayAudio("",response)
      }, function (error) { }, function () { }
    )

  }
  
}
