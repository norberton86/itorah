import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { PlayerService } from '../../service/player.service';
declare var $: any;

@Component({
  selector: 'app-today-sponsor',
  templateUrl: './today-sponsor.component.html',
  styleUrls: ['./today-sponsor.component.css'],
  
})
export class TodaySponsorComponent implements OnInit {


  dedicated: string
  englishDate:string=''
  hebrewDate:string =''
  superhebrewDate:string=''

  constructor(private homeService: HomeService,private playerService:PlayerService) { }

  ngOnInit() {
    this.homeService.read().subscribe(response => {

      if (response.Table3.length > 0)
        this.dedicated = response.Table3[0].Sponsor
    })

    this.getDates()
  }

  OpenSponsor() {
    if (this.isAuthenticated()) {
      this.playerService.setDay('day')
      $('#sponsor').toggleClass('shown');
      $('#sponsorPlaceHolder').addClass('hidden')
      $('#form-sponsor-day').removeClass('hidden')
      $('#form-sponsor-shiur').addClass('hidden')
      $('#form-sponsor-play').addClass('hidden')
    }

    // close the other popup
    this.CloseOtherPopu("#sponsor")
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
  
  getDates()
  {
    this.homeService.readCalendar().subscribe(result=>{
      this.englishDate=result[0]
      this.hebrewDate=result[1]
      this.superhebrewDate=result[2]
    },error=>{},()=>{})
  }

  CloseOtherPopu(id:string)
  {
    $('.popup').each(function(){  
       if($(this).attr('id')!=id.split("#")[1])
         $(this).removeClass("shown")
    })

        //close Broswse component
    document.getElementById('CloseDedicationButton').click()
  }
}
