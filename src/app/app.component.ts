import { Component, OnInit, Inject } from '@angular/core';
import { AnalitycService } from './service/analityc.service';
import { HomeService } from './service/home.service';
import { PlayerService } from './service/player.service';
import { PerashaService } from './service/perasha.service';
import { ReadNow } from './model/home';
import { creditsTable } from './model/shiurim-buy';
import { RegisterTehellimService} from './service/register-tehellim.service';
import { MyCreditsService} from './service/my-credits.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AnalitycService, PerashaService]
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

  browseClasses: string = "Recently"

  credit:creditsTable=null

  constructor(private analitycService: AnalitycService, private homeService: HomeService, private playerService: PlayerService, private perashaService: PerashaService,private registerTehellimService:RegisterTehellimService,private myCreditsService:MyCreditsService) { 
    this.myCreditsService.getCredits().subscribe(credit=>{
           this.credit=credit
    })
  }


  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.gSearchPattern = this.gSearch
      $('#gSearch').toggleClass('vissible');
      $('.header .search .search-field').blur();
    }
  }

  ngOnInit() {
    this.CheckResetPassword();
    this.getTehillimDedication();
  }

  getTehillimDedication() {
    this.homeService.readNow(7).subscribe(response => {
      this.tehillimDedication = response.dedication
    })
  }

  tehillimDedication: string = ""

  OpenLogin(id: string) {
    $("#" + id).hide().removeClass('shown')  //close it!!!!

    $('.nav-access > li > .dropdown-signin').addClass('shown').show() //open the Sign in session
  }

  CheckResetPassword() {
    if (location.href.indexOf('#email:') >= 0) {
      this.emailRecover = location.href;
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

  halachacomboValue: string
  AccionHalacha(halachacomboValue: string) {
    this.valHalacha = this.Generate();
    this.analitycService.emitEvent("Module", "Open", "Halacha");
    this.halachacomboValue = halachacomboValue
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

  requesting: boolean = false
  playNow(id: number, title: string) {

    if (this.requesting)
      return;

    if (id == 6 || id == 7) //halacha or tehellim
    {
      this.requesting=true
      this.homeService.readNow(id).subscribe(result => {   //execute to get the dedication field
        this.homeService.playNow(id).subscribe(resultPlay => {
          this.requesting = false
          this.playerService.PlayAudio(result.title+"<>", resultPlay[0].AudioUrl, result.dedication,id,resultPlay[0].ID) //use that dedication field
        }, error => {
          this.requesting = false
        }, () => { })
      }, error => {
        this.requesting = false

      }, () => { })
    }
    else {
      let self = this;
      this.homeService.playNow(id).subscribe(
        function (response) {
          self.playerService.PlayAudio(title, response[0].AudioUrl, "",id,response[0].ID)
        }, function (error) { }, function () { }
      )
    }


  }

  readNow(id: number) {
    let self = this;
    this.homeService.readNow(id).subscribe(
      function (response) {

        if (response.content.indexOf('.pdf') > 0) {
          window.open(response.content)
        }
        else
          if (response.content.indexOf('.gif,') > 0) {
            response.content.split(',').forEach(function (a) {
              window.open('http://' + a)
            })

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

  OpenRegister(tile:string) {
    if (this.isAuthenticated()) {
      this.registerTehellimService.setItem(tile)
      $('#popup-register').toggleClass('shown');
    }
  }

  OpenSponsor() {
    if (this.isAuthenticated()) {
      $('#sponsor').toggleClass('shown');
    }
  }

  OpenPopup(id: string) {
    if (this.isAuthenticated()) {
      $(id).toggleClass('shown');
    }
  }

  ReadPerashaInsigth() {
    this.perashaService.read().subscribe(result => {
      this.playerService.PlayAudio("", result[0].audio, "",16,result[0].id.toString())
    }, error => { }, () => { })
  }

  CloseSpeaker()
  {
    if($('#item-content-1').hasClass('vissible'))//is speakers is open
    {
      document.getElementById('speakers').click()  //execute a click over the button to produce a closing 
    }
  }

  CloseHeader(id:string)
  {
    $('#'+id).toggleClass('shown')
    $('#'+id).css('display', 'none')
  }

}
