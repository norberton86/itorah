import { Component, OnInit } from '@angular/core';

declare var $:any; 

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      this.RefreshView();
  }

  RefreshView()
  {
     let self=this;
     $('#field-6').change(function(){   //date combo

          //$(this).val()
        
     })

     
     $('#field-7').change(function(){   //title combo

          //$(this).val()
     })
     

     $('#weekly-print').click(function(){
           //this.attributes["id"]
     })
     
     $('#weekly-play').click(function(){
          //this.attributes["id"]
     })

  }

}
