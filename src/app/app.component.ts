import { Component, OnInit, Inject } from '@angular/core';
import { AnalitycService } from './service/analityc.service';
import { HomeService } from './service/home.service';
import { PlayerService } from './service/player.service';
import { PerashaService } from './service/perasha.service';
import { ReadNow } from './model/home';
import { creditsTable } from './model/shiurim-buy';
import { RegisterTehellimService} from './service/register-tehellim.service';
import { MyCreditsService} from './service/my-credits.service';
import { GemaraService} from './service/gemara.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AnalitycService]
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

  constructor(private gemaraService:GemaraService, private analitycService: AnalitycService, private homeService: HomeService, private playerService: PlayerService, private perashaService: PerashaService,private registerTehellimService:RegisterTehellimService,private myCreditsService:MyCreditsService) { 
    this.myCreditsService.getCredits().subscribe(credit=>{
           this.credit=credit
    })

    this.homeService.getBrowse().subscribe(result=>{
          if(result=='close')
            $('#browseDrop').val('')
    })
  }

  setCount()
  {
     this.homeService.read().subscribe(
           result=>{
                    for(var i=0;i<result.Table.length;i++)
                      switch(result.Table[i].Site)
                      {
                        case "Daily Emunah":this.emunahCounter=result.Table[i].Count; break;
                        case "Weekly Parasha": this.parashaCounter=result.Table[i].Count; break;
                        case "Weekly Inspire": this.inspireCounter=result.Table[i].Count; break;
                      }                     
           },
           error=>{},()=>{}
       )
  }
  
  emunahCounter:number=0
  parashaCounter:number=0
  inspireCounter:number=0

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
    this.getHalachaDedication();
    this.setCount()

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   let self=this
    $("a[data-size='full']").click(function(){  //ballon close popup
       
       if(self.cerrar)
       self.CloseOtherPopu("#everBody")

       self.cerrar=true
    })
  }

  OpenPopup(id: string) {
    if (this.isAuthenticated()) {
      $(id).toggleClass('shown');
      
      if(id=='#fileShowerEmpty')
      {
        $('#fileShower').toggleClass('shown');
        this.gemaraService.setData('empty');
      }

      //to close the other popups
      this.CloseOtherPopu(id)
    }
    this.CloseMenu()
  }

  CloseOtherPopu(id:string)
  {
    $('.popup').each(function(){                 //close the rest of popups
       if($(this).attr('id')!=id.split("#")[1])
         $(this).removeClass("shown")
    })

    //close Broswse component
    document.getElementById('CloseDedicationButton').click()

   this.CloseBalloon()   //close ballon
  }
  
  CloseBalloon()
  {
    var href =$('.vissible').attr('id')
    if(href!=undefined)
    {
      this.cerrar=false                    //this is to avoid close the same popup that is opening
      $('a[href="#'+href+'"]')[0].click() //close the balloon
    }
   
  }
  
  cerrar:boolean =true

  getTehillimDedication() {
    this.homeService.readNow(7).subscribe(response => {
      this.tehillimDedication = response.dedication
    })
  }

  getHalachaDedication() {
    this.homeService.readNow(6).subscribe(response => {
      this.halachaDedication = response.dedication
    })
  }

  tehillimDedication: string = ""
  halachaDedication: string = ""

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

    //close the others popup
    this.CloseOtherPopu("#aboutUs")
    this.MoveToTop()
  }
  Privacy() {
    $("#privacy").toggleClass('shown');

    //close the others popup
    this.CloseOtherPopu("#privacy")
    this.MoveToTop()
  }

  Contact() {
    $("#contact").toggleClass('shown');

    //close the others popup
    this.CloseOtherPopu("#contact")
    this.MoveToTop()
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

  sourceRead:number
  readNow(id: number) {
    this.sourceRead=id
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
            window.scrollTo(0,0)
          }

      }, function (error) { }, function () { }
    )

    //close the others popup
    this.CloseOtherPopu("#readNow")
  }

  readNowEmunah()
  {
    $("#readNowEmunah").toggleClass('shown');
    this.CloseOtherPopu("#readNowEmunah")
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
    if(value!='')
    {
    this.browseClasses = value
    this.Browse()
    this.CloseMenu()
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

  CloseMenu()
  {
        //close menu
    $('.btn-menu').removeClass('open')
    $('.nav').removeClass('visible')
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

  MoveToTop()
  {
    window.scrollTo(0, 0);
  }

 setInspireOption(option:string)
 {
   this.perashaService.setOption(option)
 }

}
