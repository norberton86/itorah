import { Component, OnInit } from '@angular/core';
import { Sponsor, SponsorShiur, SponsorMedia } from '../../model/sponsors';
import { Page } from '../../model/Page';
import { Shiurim } from '../../model/shiurim';
import { SponsorService, Category } from '../../service/sponsor.service';
import { HomeService } from '../../service/home.service';
import { ShiurimService } from '../../service/shiurim.service';
import { IMyDpOptions } from 'mydatepicker';
import { ComboItem } from '../../model/combo-item';
import { CreditCard } from '../../model/credit-card';
declare var $: any;

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css'],
  providers: [SponsorService]
})
export class SponsorComponent implements OnInit {
  value: number = 0

  sourceId: number = -1

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


  public date: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };

  sponsorshipFor: string = ''
  name: string = ''



  constructor(private sponsorService: SponsorService, private shiurimService: ShiurimService, private homeService: HomeService) {

  }

  ngOnInit() {
    setTimeout(function () {
      $('#sponsorDate .mydp .selectiongroup').css('padding-right', '10px')
      $('#sponsorDate .mydp .btnclear,#sponsorDate .mydp .btnpicker').css('background', 'transparent')
      $('#sponsorDate .mydp .selbtngroup').css('top', '6px')
    }, 1000)

    this.dT = this.dedicationType[0]

    /* this.shiurimService.read(8).subscribe(response=>{  //remove this
       this.all=response
     }) */


    

    this.getCats()

  }

  unAvailable(source: number) {
    let self = this
    this.sponsorService.getUnAvailable(source).subscribe(function (response) {

      var un = []

      response.forEach(function (a) {
        un.push({ year: new Date(a).getFullYear(), month: new Date(a).getMonth() + 1, day: new Date(a).getDate() })
      })

      self.myDatePickerOptions = {
        // other options...
        dateFormat: 'mm.dd.yyyy',
        disableDays: un
      };


    }, function (error) {

    }, function () { })
  }

  requesting:boolean=false

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
        this.requesting=false
        if (result == "Success")
          this.sponsorService.Notify("Thank you for your sponsorship. Your credit card will show a payment Torah Learning Resources LTD, an approved 501c# charity. You will receive an email receipt conforming your sponsorship after our administrative team reviews ans posts your sponsorship. Normally this takes about one bussiness day.", false);
        else
          this.sponsorService.Notify("Transaction Declined", true);
      },
        error => {
          this.requesting=false
          this.sponsorService.Notify("Error trying to access", true);
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
          this.requesting=false
          if (result == "Success")
            this.sponsorService.Notify("Thank you for your sponsorship. Your credit card will show a payment Torah Learning Resources LTD, an approved 501c# charity. You will receive an email receipt conforming your sponsorship after our administrative team reviews ans posts your sponsorship. Normally this takes about one bussiness day.", false);
          else
            this.sponsorService.Notify("Transaction Declined", true);
        },
          error => {
            this.requesting=false
            this.sponsorService.Notify("Error trying to access", true);
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
          this.requesting=false
          if (result == "Success")
            this.sponsorService.Notify("Sponsor Completed", false);
          else
            this.sponsorService.Notify("Transaction Declined", true);
        },
          error => {
            this.requesting=false
            this.sponsorService.Notify("Error trying to access", true);
          }, () => {

          })
      }

  }

  Check(name: number) {

    this.itorah = name == 17 ? true : false
    this.halacha = name == 6 ? true : false
    this.tehillim = name == 7 ? true : false

    switch (name) {
      case 17: this.value = 180; break;
      case 6: this.value = 52; break;
      case 7: this.value = 52; break;
    }

    this.sourceId = name

    this.unAvailable(name)
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
  }
  section: string
  payment: boolean = false

  ShowPayment() {

    if (this.section == 'day' && ((!this.tehillim && !this.halacha && !this.itorah) || this.sponsorshipFor == '' || this.name == '')) {
      this.sponsorService.Notify("Please fill the form complety", true);
      return;
    }

    if (this.section == 'shiur' && (this.sponsorshipFor == '' || this.name == '' || this.shiurID == -1)) {
      this.sponsorService.Notify("Please fill the form complety", true);
      return;
    }

    if (this.section == 'play' && (this.sponsorshipFor == '' || this.name == '' || this.option == 0)) {
      this.sponsorService.Notify("Please fill the form complety", true);
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

  getBySubs()
  {
    this.Load()
  }

  getSelecteCategory():number
  {
    var categoryQuery=this.cat.id
    if(this.sub.id!=-1)
    categoryQuery=this.sub.id

    return categoryQuery
  }

  Load() {
    let self = this;



    self.shiurimService.search(this.query_main, 24, 1,this.getSelecteCategory())
      .subscribe(function (response) {

        self.Update(response.totalPageCount, response.shiurList)
        self.alltotal = response.totalResultCount;

      }, function (error) { }, function () { }
      );
  }

  setShiur(s: Shiurim) {
    this.shiurID = parseInt(s.id)
    this.value=180
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

    this.shiurimService.search(this.query_main, 24, id,this.getSelecteCategory())
      .subscribe(response => this.all = response.shiurList)

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


  cats: Array<Category> = []
  cat: Category
  subs: Array<Category> = []
  sub: Category

  getCats() {
    this.sponsorService.getCategory().subscribe(result => {
      this.cats = result
      this.cat=this.cats[0]
      this.getSubs()
    }, error => { }, () => { })
  }

  getSubs() {
    this.subs=[]
    this.sponsorService.getSubCategory().subscribe(result => {
      this.subs.push({id:-1,name:"All",parentID:0})
      var others=result.filter(r=>r.parentID==this.cat.id)
      others.forEach(o=>{
        this.subs.push(o)
      })
      this.sub=this.subs[0]
      this.Load()
    }, error => { }, () => { })
  }

}
