import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WeeklyResultService } from '../../service/weekly-result.service';

declare var $: any;

@Component({
  selector: 'app-weekly-search',
  templateUrl: './weekly-search.component.html',
  styleUrls: ['./weekly-search.component.css']
})
export class WeeklySearchComponent implements OnInit, OnChanges {

  wSearch: string = "";

  keyDownFunction(event) {
    if (event.keyCode == 13) {

      if (!$('#wResult').hasClass('vissible')) //if window result is not open
        $('#wResult').toggleClass('vissible'); //open

      this.ShowResult()   //calculate and set the window result position 
    }
  }

  ShowResult() {
    var size = parseInt($('#todaySponsor').css('height').split("px")[0])

    var borde = 8 + size;
    var altura = $('#item-content-8')[0].offsetTop
    var tamano = parseInt($('.tile-box#item-content-8').css('height').split("px")[0]) * 1.4
    $('#wResult').css('margin-top', altura + tamano + borde + "px")

    this.RefreshData()
  }

  RefreshData() {
    if ($('.ballon .SlectBox').val() != null && $('.ballon .SlectBox').val().length > 0)
      this.weeklyResultService.setData({ pattern: this.wSearch, data: $('.ballon .SlectBox').val() })
    else
      this.weeklyResultService.Notify('You need to select a value', true);
  }


  ngOnChanges(changes: any): void {
    if (!changes.accion.firstChange) {
      $('#item-content-8').css('height', '70px') //reduce ballon heigth

      setTimeout(function () {
        $('#item-content-8').css('height', '230px') //increase ballon heigth
      }, 1000)

    }
  }

  @Input()
  accion: string = "";

  constructor(private weeklyResultService: WeeklyResultService) { }

  ngOnInit() {

    let self = this
    setTimeout(function () {

      $('.ballon .SlectBox').SumoSelect({ csvDispCount: 3, selectAll: true, captionFormatAllSelected: "All" }); //create the select
      $('select.SlectBox').on('sumo:opened', function (sumo) {    //when is open

        $('#wResult').css('visibility', 'hidden')   //close the result window
      });

      $('select.SlectBox').on('sumo:closed', function (sumo) {  //when is close

        $('#wResult').css('visibility', 'inherit')              //open the window result
        self.RefreshData()
      });

      $('p.select-all').css('padding', '5px 0 28px 35px')  //adjust the css for the select

    }, 300)
  }



}
