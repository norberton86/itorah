import { Component, OnInit } from '@angular/core';
import { WeeklyResultService } from '../../service/weekly-result.service';
import { PrintService } from '../../service/print.service';
declare var $: any;

@Component({
  selector: 'app-read-search',
  templateUrl: './read-search.component.html',
  styleUrls: ['./read-search.component.css'],
  providers:[PrintService]
})
export class ReadSearchComponent implements OnInit {

  title: string
  content: string


  constructor(private weeklyResultService: WeeklyResultService,private printService:PrintService) {
    
    let self=this

    this.weeklyResultService.getDataRead().subscribe(item => {
      this.content = item.content
      this.title = item.title

      
      setTimeout(function () {

        if (item.accion == 'read') {
          $("#readSearch").toggleClass('shown');
        }
        else {
          self.printService.Print("printReadSearch")
          //$("#readSearch .content").print();
        }

      }, 1000)

    });
  }

  ngOnInit() {
  }


}
