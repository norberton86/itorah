import { Component, OnInit,Input,OnChanges } from '@angular/core';

declare var $:any; 

@Component({
  selector: 'app-weekly-search',
  templateUrl: './weekly-search.component.html',
  styleUrls: ['./weekly-search.component.css']
})
export class WeeklySearchComponent implements OnInit {

  @Input()
  accion:string="";

  constructor() { }

  ngOnInit() {
    
  }


ngOnChanges(changes:any) {
     if(changes.accion!=null&&!changes.accion.firstChange)
     {   
         setTimeout(function(){ 
         
         $('#ballon .SlectBox').SumoSelect({ csvDispCount: 3, selectAll:true, captionFormatAllSelected: "All" });
         $('p.select-all').css('padding','5px 0 28px 35px')
         
         },300)
         

     }
      
  }



  RefreshView()
  {
    
  }

}
