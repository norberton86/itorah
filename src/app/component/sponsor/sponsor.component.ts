import { Component, OnInit } from '@angular/core';
import { Sponsor, SponsorShiur, SponsorMedia } from '../../model/sponsors';
import { Page } from '../../model/Page';
import { Shiurim } from '../../model/shiurim';
import { SponsorService } from '../../service/sponsor.service';
import { HomeService } from '../../service/home.service';
import { BrowseService } from '../../service/browse.service';
import { IMyDpOptions } from 'mydatepicker';
import { ComboItem } from '../../model/combo-item';
import { CreditCard } from '../../model/credit-card';
import { Category, SubCategory } from '../../model/shiurim';
import { Speaker } from '../../model/speaker';
import { SpeakerService } from '../../service/speaker.service';
import { PaymentService } from '../../service/payment.service';
import { PlayerService } from '../../service/player.service';
declare var $: any;

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css'],
  providers: [SponsorService, BrowseService, SpeakerService]
})
export class SponsorComponent implements OnInit {
  value: number = 0

  sourceId: Array<number> = []

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm.dd.yyyy',
  };

  dedicationType: Array<ComboItem> = [
    { id: "1", description: "For Refuah Shelemah for" },
    { id: "2", description: "In Honor Of" },
    { id: "3", description: "In Memory Of" },
    { id: "4", description: "None" },
    { id: "5", description: "For The Hatzlacha of" },
    { id: "6", description: "Other" }
  ]
  dT: ComboItem
  other: string = ''

  shiurID: number = -1
  
  step1:boolean=false


  public date: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };

  sponsorshipFor: string = ''
  name: string = ''

  elem: number = 24

  constructor(private playerService:PlayerService , private sponsorService: SponsorService, private browseService: BrowseService, private homeService: HomeService, private speakerService: SpeakerService, private paymentService: PaymentService) {

     this.playerService.getShiurFromPlayer().subscribe(result=>{
           
           var s=new Shiurim()
           s.id=result.id
           s.title=result.title
           this.setShiur(s)
           this.step1=true
           this.section='shiur'
     })

     this.playerService.getDayFromPlayer().subscribe(result=>{
           this.step1=true
           this.section='day'
     })
  }

  ngOnInit() {
    setTimeout(function () {
      $('#sponsorDate .mydp .selectiongroup').css('padding-right', '10px')
      $('#sponsorDate .mydp .btnclear,#sponsorDate .mydp .btnpicker').css('background', 'transparent')
      $('#sponsorDate .mydp .selbtngroup').css('top', '6px')
    }, 1000)

    this.dT = this.dedicationType[0]

    this.ReadSpeakers()
    this.ReadCategory();
  }

  isSourceNotAvailable(source: number): boolean {
    return this.availables.findIndex(s => s == source) < 0
  }


  availables: Array<number> = []
  alertMessage: string = ""
  Availables(event: any) {

    if (event.jsdate != null) {
      let self = this
      this.sponsorService.Availables(event.date.month + "/" + event.date.day + "/" + event.date.year).subscribe(function (response) {

        if (response == "Please select a date that is not Shabbat or a Holiday.") {
          self.alertMessage = response
        }
        else {
          self.alertMessage = ""
          self.itorah = false
          self.halacha = false
          self.tehillim = false
          self.availables = response
        }

      }, function (error) {

      }, function () { })
    }
  }

  requesting: boolean = false
  paymentError: boolean = false

  Save(cc: CreditCard) {

    if (this.requesting)
      return

    this.requesting = true

    let self = this
    if (this.section == 'day') {

      var sponsor = new Sponsor()
      sponsor.SourceID = this.sourceId
      sponsor.ForDate = new Date(this.date.date.year, this.date.date.month, this.date.date.day)
      sponsor.DedicationTypeID = parseInt(this.dT.id)
      sponsor.SponsoredForName = this.sponsorshipFor
      sponsor.SponsoredByName = this.name
      sponsor.PaymentInfo = {
        Amount: cc.Amount,
        CardExpDate: cc.CardExpDate.replace(" / ", ""),
        CardHolderName: cc.CardHolderName,
        CardNumber: cc.CardNumber,
        CVV: cc.CVV
      }

      this.sponsorService.addDay(sponsor).subscribe(result => {
        this.requesting = false
        if (result == "Success") {
          this.paymentService.setItem('reset')  //order reset the nested payment component
          $('#payConfirmed').toggleClass('shown');
          this.Close();
          //this.sponsorService.Notify("Thank you for your sponsorship. Your credit card will show a payment Torah Learning Resources LTD, an approved 501c# charity. You will receive an email receipt conforming your sponsorship after our administrative team reviews ans posts your sponsorship. Normally this takes about one bussiness day.", false);
        }
        else
          this.paymentError = true
      },
        error => {
          this.requesting = false
          this.paymentError = true
        }, () => {

        })
    }
    else
      if (this.section == 'shiur') {

        var sponsorShiur = new SponsorShiur()

        sponsorShiur.ShiurID = this.shiurID
        sponsorShiur.DedicationTypeID = parseInt(this.dT.id)
        sponsorShiur.SponsoredForName = this.sponsorshipFor
        sponsorShiur.SponsoredByName = this.name
        sponsorShiur.PaymentInfo = {
          Amount: cc.Amount,
          CardExpDate: cc.CardExpDate.replace(" / ", ""),
          CardHolderName: cc.CardHolderName,
          CardNumber: cc.CardNumber,
          CVV: cc.CVV
        }


        this.sponsorService.addShiur(sponsorShiur).subscribe(result => {
          this.requesting = false
          if (result == "Success") {
            this.paymentService.setItem('reset')  //order reset the nested payment component
            $('#payConfirmed').toggleClass('shown');
            this.Close();
          }
          else
            this.paymentError = true

        },
          error => {
            this.requesting = false
            this.paymentError = true
          }, () => {

          })
      }
      else {

        var sponsorMedia = new SponsorMedia()
        sponsorMedia.PaymentInfo = {
          Amount: cc.Amount,
          CardExpDate: cc.CardExpDate.replace(" / ", ""),
          CardHolderName: cc.CardHolderName,
          CardNumber: cc.CardNumber,
          CVV: cc.CVV
        }

        switch (this.value) {
          case 25: sponsorMedia.impressionCount = 10; break;
          case 50: sponsorMedia.impressionCount = 25; break;
          case 100: sponsorMedia.impressionCount = 60; break;
        }

        sponsorMedia.DedicationTypeID = parseInt(this.dT.id)
        sponsorMedia.SponsoredForName = this.sponsorshipFor
        sponsorMedia.SponsoredByName = this.name

        this.sponsorService.addMedia(sponsorMedia).subscribe(result => {
          this.requesting = false
          if (result == "Success") {
            this.paymentService.setItem('reset')  //order reset the nested payment component
            $('#payConfirmed').toggleClass('shown');
            this.Close();
          }
          else
            this.paymentError = true
        },
          error => {
            this.requesting = false
            this.paymentError = true
          }, () => {

          })
      }

  }

  Check() {

    this.sourceId = []
    this.value = 0

    if (this.itorah) {
      this.value += 180
      this.sourceId.push(17)
    }

    if (this.halacha) {
      this.value += 52
      this.sourceId.push(6)
    }

    if (this.tehillim) {
      this.value += 52
      this.sourceId.push(7)
    }



  }

  itorah: boolean = false
  halacha: boolean = false
  tehillim: boolean = false

  Reset() {
    this.date = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } }
    this.dT = this.dedicationType[0]
    this.sponsorshipFor = ""
    this.name = ""
  }

  SetSection(section: string) {
    this.section = section
    this.payment = false

    this.step1=true
  }
  section: string=""
  payment: boolean = false

  blankField:boolean=false


  ShowErrorBlank()
  {
    this.blankField=true      //show error
    let self=this
    setTimeout(function(){
      self.blankField=false  //hide error in 2 seconds
    },4000)
  }

  ShowPayment() {

    if (this.section == 'day' && (this.sourceId.length == 0 || this.sponsorshipFor == '' || this.name == '')) {
      this.ShowErrorBlank()
      return;
    }

    if (this.section == 'shiur' && (this.sponsorshipFor == '' || this.name == '' || this.shiurID == -1)) {
      this.ShowErrorBlank()
      return;
    }

    if (this.section == 'play' && (this.sponsorshipFor == '' || this.name == '' || this.option == 0)) {
      this.ShowErrorBlank()
      return;
    }

    this.payment = true
  }

  //------------------------------------------------------------------------------------------------------------------------------------------
  searchShiurim: boolean = false
  query_main: string = ""
  sectionPanel: string = "main"
  nameShiurSelected: string = ''

  FindShiur() {
    this.sectionPanel = 'shiur'
  }

  Back() {
    this.sectionPanel = 'main'
  }

  pages: Array<Page> = [];
  allPages: number;
  iteration: number;
  alltotal: number
  all: Array<Shiurim> = []

  keyDown(event) {
    if (event.keyCode == 13) {
      this.Load()
    }
  }

  finalCategory: number
  loading: boolean = false

  Load() {

    this.all = []

    if (this.category.id == 0)
      return

    let self = this;

    this.finalCategory = this.subCategory.id == 0 ? this.category.id : this.subCategory.id
    this.loading = true

    self.browseService.readCategory(1, this.elem, this.finalCategory, this.speaker.id, 'true',this.query_main)
      .subscribe(function (response) {

        self.loading = false
        self.Update(response.totalPageCount, response.shiurList)
        self.alltotal = response.totalResultCount;

      }, function (error) { self.loading = false }, function () { }
      );
  }

  setShiur(s: Shiurim) {
    this.shiurID = parseInt(s.id)
    this.value = 180
    this.Back();
    this.nameShiurSelected = s.title
  }

  Update(totalPageCount: number, searchItems: Array<any>) {

    this.allPages = totalPageCount; //pagination
    this.iteration = 1; //pagination

    this.CreatePages();
    this.all = searchItems
  }

  CreatePages() {
    this.pages = [];

    for (var i = this.iteration * 6 - 6; i < this.iteration * 6 && i < this.allPages; i++) //populate the pages array
    {
      if (i == (this.iteration - 1) * 6) {
        this.pages.push({ id: i + 1, current: true });
      }
      else
        this.pages.push({ id: i + 1, current: false });
    }

  }


  Page(id: number) {

    this.pages.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.loading = true
    this.browseService.readCategory(id, this.elem, this.finalCategory, this.speaker.id,'true', this.query_main)
      .subscribe(response => {
        this.loading = false
        this.all = response.shiurList
      }, error => { this.loading = false }, () => { })

  }

  PagingPrev() {
    this.iteration--;
    if (this.iteration <= 0) {
      this.iteration = 1;
    }
    else
      this.CreatePages();

    this.Page(this.iteration)
  }

  PagingNext() {
    this.iteration++;
    if (this.iteration > Math.ceil(this.allPages / 6)) {
      this.iteration = Math.ceil(this.allPages / 6);
    }
    else
      this.CreatePages();

    this.Page(this.iteration)
  }
  //-----------------------------------------------------------Media PLayer---------------------------------------------------------------
  option: number = 0
  setOptionValue(value) {
    this.value = value
  }

  SubCategory() {

    this.subCategorys = []
    this.browseService.getSubCategorys().subscribe(result => {

      this.subCategorys.push({ id: 0, name: "Select Sub Category", parentID: 0, shiurCount: 0 })
      result = result.filter(i => i.parentID == this.category.id)  //filter by category
      this.subCategorys = this.subCategorys.concat(result)
      this.subCategory = this.subCategorys[0]

      this.Load()

    }, error => { }, () => { })
  }

  ReadCategory() {
    let self = this
    this.browseService.getCategorys().subscribe(function (response) {
      self.categorys.push({ id: 0, name: "Select Category", shiurCount: 0 })
      self.categorys = self.categorys.concat(response)
      self.category = self.categorys[0]

      self.SubCategory()
    }, function (error) { }, function () { })
  }

  ReadSpeakers() {
    this.speakerService.read().subscribe(result => {

      var speakerEmpty = new Speaker()
      speakerEmpty.id = 0
      speakerEmpty.firstName = "Select Speaker"

      this.speakers.push(speakerEmpty)
      this.speakers = this.speakers.concat(result)
      this.speaker = this.speakers[0]
    }, error => { }, () => { })
  }

  category: Category
  categorys: Array<Category> = []

  subCategory: SubCategory
  subCategorys: Array<SubCategory> = []

  speaker: Speaker
  speakers: Array<Speaker> = []

  Close() {

  this.sponsorshipFor= ''
  this.name= ''
  this.other = ''
  this.nameShiurSelected=''
  this.shiurID = -1

    //------------------------------------

    this.payment=false
   

    this.paymentService.setItem('reset')
    $('#sponsor').toggleClass('shown');
  }

  NameforSelect(c: Category) {
    if (c.id != 0)
      return c.name + " (" + c.shiurCount + ")"
    else
      return c.name
  }


}
