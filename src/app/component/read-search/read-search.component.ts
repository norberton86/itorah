import { Component, OnInit } from '@angular/core';
import { WeeklyResultService } from '../../service/weekly-result.service';
declare var $: any;

@Component({
  selector: 'app-read-search',
  templateUrl: './read-search.component.html',
  styleUrls: ['./read-search.component.css']
})
export class ReadSearchComponent implements OnInit {

  title: string
  content: string


  constructor(private weeklyResultService: WeeklyResultService) {
    this.weeklyResultService.getDataRead().subscribe(item => {
      this.content = item.content
      this.title = item.title
      setTimeout(function () {

        if (item.accion == 'read') {
          $("#readSearch").toggleClass('shown');
        }
        else {
          $("#readSearch .content").print();
        }

      }, 1000)

    });
  }

  ngOnInit() {
  }


}
