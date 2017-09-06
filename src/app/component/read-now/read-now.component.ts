import { Component, OnInit,Input ,OnChanges} from '@angular/core';
import { ReadNow } from '../../model/home';

@Component({
  selector: 'app-read-now',
  templateUrl: './read-now.component.html',
  styleUrls: ['./read-now.component.css']
})
export class ReadNowComponent implements OnInit,OnChanges {

  @Input()
  title: string
  
  @Input()
  content: string

  parragraphs:Array<string>=[]

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: any): void {
    this.title=changes.title.currentValue
    this.content=changes.content.currentValue
    
    //if(this.content!=null && this.content!='')
    /* this.parragraphs=this.content.split("\n").filter(function (s) {
          return s != "";
        });*/

  }
  
}
