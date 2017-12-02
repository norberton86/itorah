import { Component, OnInit } from '@angular/core';
import { Sponsor, SponsorShiur } from '../../model/sponsors';
import { Page } from '../../model/Page';
import { Shiurim } from '../../model/shiurim';
import { SponsorService } from '../../service/sponsor.service';
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

  sourceId: number=-1

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

  sponsorshipFor: string=''
  name: string=''



  constructor(private sponsorService: SponsorService, private shiurimService: ShiurimService) {

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


    this.Load()

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

  Save(cc: CreditCard) {


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
        if (result == "Success")
          this.sponsorService.Notify("Sponsor Completed", false);
        else
          this.sponsorService.Notify("Transaction Declined", true);
      },
        error => {
          this.sponsorService.Notify("Error trying to access", true);
        }, () => {

        })
    }
    else {

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
        if (result == "Success")
          this.sponsorService.Notify("Sponsor Completed", false);
        else
          this.sponsorService.Notify("Transaction Declined", true);
      },
        error => {
          this.sponsorService.Notify("Error trying to access", true);
        }, () => {

        })
    }


  }

  Check(name: number) {

    this.itorah = name == 17 ? true : false
    this.halacha = name == 6 ? true : false
    this.tehillim = name == 7 ? true : false

    switch(name)
    {
      case 17: this.value=180; break;
      case 6: this.value=52;break;
      case 7: this.value=52;break;
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

   if(this.section == 'day' && ((!this.tehillim&&!this.halacha&&!this.itorah) || this.sponsorshipFor=='' || this.name==''))
   {
     this.sponsorService.Notify("Please fill the form complety",true);
     return;
   } 

   if(this.section == 'shiur' && (this.sponsorshipFor==''|| this.name==''|| this.shiurID==-1))
   {
     this.sponsorService.Notify("Please fill the form complety",true);
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

  Load() {
    let self = this;
    self.shiurimService.search(this.query_main, 24, 1)
      .subscribe(function (response) {

        self.Update(response.totalPageCount, response.shiurList)
        self.alltotal = response.totalResultCount;

      }, function (error) { }, function () { }
      );
  }

  setShiur(s: Shiurim) {
    this.shiurID = parseInt(s.id)
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

    this.shiurimService.search(this.query_main, 24, id)
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


}
