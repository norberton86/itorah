import { Component, OnInit,Input,OnChanges } from '@angular/core';

declare var $:any; 

@Component({
  selector: 'app-weekly-search',
  templateUrl: './weekly-search.component.html',
  styleUrls: ['./weekly-search.component.css']
})
export class WeeklySearchComponent implements OnInit,OnChanges{

  ngOnChanges(changes: any): void {
       if(!changes.accion.firstChange)
       {  
           $('#item-content-8').css('height','70px') //reduce ballon heigth

            setTimeout(function(){
              $('#item-content-8').css('height','300px') //increase ballon heigth
            },1000)
            
       }
  }

  @Input()
  accion:string="";

  constructor() { }

  ngOnInit() {
    setTimeout(function(){ 
         
         $('.ballon .SlectBox').SumoSelect({ csvDispCount: 3, selectAll:true, captionFormatAllSelected: "All" });
         $('p.select-all').css('padding','5px 0 28px 35px')
         
         },300)
  }
  


}
