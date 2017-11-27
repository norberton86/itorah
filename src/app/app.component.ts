import { Component, OnInit, Inject } from '@angular/core';
import { AnalitycService } from './service/analityc.service';
import { HomeService } from './service/home.service';
import { PlayerService } from './service/player.service';
import { ReadNow } from './model/home';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AnalitycService, HomeService, PlayerService]
})
export class AppComponent implements OnInit {

  val: string = ""
  valEmunah: string = ""
  valHalacha: string = ""
  valPele: string = ""
  valSpeaker: string = ""
  valHok: string = ""


  loader: boolean = false;
  amountSpeaker: string = ""
  gSearch: string = "";
  gSearchPattern: string = ""

  emailRecover: string = ""

  rNow: ReadNow

  browseClasses: string = "All"

  constructor(private analitycService: AnalitycService, private homeService: HomeService, private playerService: PlayerService) { }


  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.gSearchPattern = this.gSearch
      $('#gSearch').toggleClass('vissible');
      $('.header .search .search-field').blur();
    }
  }

  ngOnInit() {

    this.CheckResetPassword();
  }

  OpenLogin(id: string) {
    $("#" + id).hide().removeClass('shown')  //close it!!!!

    $('.nav-access > li > .dropdown-signin').addClass('shown').show() //open the Sign in session
  }

  CheckResetPassword() {
    if (location.href.indexOf('#email:') >= 0) {
      this.emailRecover = location.href.split('#email:')[1];
      $("#recover").toggleClass('shown');
    }
  }


  Accion() {
    this.val = this.Generate();
    this.analitycService.emitEvent("Module", "Open", "Tehillim Read");
  }

  AccionEmunah() {
    this.valEmunah = this.Generate();
    this.analitycService.emitEvent("Module", "Open", "Emunah");
  }

  AccionHalacha() {
    this.valHalacha = this.Generate();
    this.analitycService.emitEvent("Module", "Open", "Halacha");
  }

  AccionPele() {
    this.valPele = this.Generate();
    this.analitycService.emitEvent("Module", "Open", "PeleYoetz");
  }

  AccionSpeaker() {
    this.valSpeaker = this.Generate();
    this.analitycService.emitEvent("Module", "Open", "Speakers");
  }

  AccionHok() {
    this.valHok = this.Generate();
    this.analitycService.emitEvent("Module", "Open", "Hok");
  }

  Generate() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  ShowLoader(arg) //bind to eventEmitter
  {
    this.loader = arg;
  }

  ChangeSpeakers(arg) //bind to eventEmitter
  {
    this.amountSpeaker = arg;
  }

  VerifyUser() {
    if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "")
      return false;
    else
      return true;
  }

  AboutUs() {
    $("#aboutUs").toggleClass('shown');
  }
  Privacy() {
    $("#privacy").toggleClass('shown');
  }

  Contact() {
    $("#contact").toggleClass('shown');
  }

  playNow(id: number, title: string) {
    let self = this;
    this.homeService.playNow(id).subscribe(
      function (response) {
        self.playerService.PlayAudio(title, response)
      }, function (error) { }, function () { }
    )
  }

  readNow(id: number) {
    let self = this;
    this.homeService.readNow(id).subscribe(
      function (response) {

        if (response.title == "") {
          if (response.content.indexOf('.pdf') > 0) {
            window.open(response.content)
          }
          else
            if (response.content.indexOf('.gif,') > 0) {
              response.content.split(',').forEach(function (a) {
                window.open('http://' + a)
              })

            }

        }
        else {
          self.rNow = response
          $("#readNow").toggleClass('shown');
        }

      }, function (error) { }, function () { }
    )
  }

  Browse() {
    try {
      //close any open ballon
      $('.ballon').removeClass('vissible');
      $('.tile').css('margin-bottom', 7)
    }
    catch (e) {

    }
    //open the browser
    $("#browseSearch").toggleClass('vissible')
  }

  ChangeBrowse(value: string) {
    this.browseClasses = value
    this.Browse()
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

  OpenRegister()
  {
    if(this.isAuthenticated())
    {
      $('#popup-register').toggleClass('shown');
    }
  }

  OpenSponsor()
  {
    if(this.isAuthenticated())
    {
      $('#sponsor').toggleClass('shown');
    }
  }

}
