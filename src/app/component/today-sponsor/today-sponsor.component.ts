import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';
declare var $: any;

@Component({
  selector: 'app-today-sponsor',
  templateUrl: './today-sponsor.component.html',
  styleUrls: ['./today-sponsor.component.css'],
  
})
export class TodaySponsorComponent implements OnInit {


  dedicated: string
  todayDate: Date = new Date()

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.read().subscribe(response => {

      if (response.Table3.length > 0)
        this.dedicated = response.Table3[0].Sponsor
    })
  }

  OpenSponsor() {
    if (this.isAuthenticated()) {
      $('#sponsor').toggleClass('shown');
      this.homeService.setLogin("day")
    }
  }

  isAuthenticated(): boolean {
    let self = this;
    if (localStorage.getItem('userItorah') == null || localStorage.getItem('userItorah') == "")//needs credentials to access
    {
      setTimeout(function () {

        $('.nav-access > li > .dropdown-signin').addClass('shown').show() //open the Sign in session

      }, 500)
      return false;
    }
    else
      return true;
  }

}
