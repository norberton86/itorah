import { Component, OnInit } from '@angular/core';
import { Sponsor, SponsorShiur } from '../../model/sponsors';
import { SponsorService } from '../../service/sponsor.service';
import { IMyDpOptions } from 'mydatepicker';
import { ComboItem } from '../../model/combo-item';
declare var $: any;

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css'],
  providers: [SponsorService]
})
export class SponsorComponent implements OnInit {
  value: number = 0

  sourceId: number

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

  shiurID: number = 10386


  public date: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };

  sponsorshipFor: string
  name: string


  constructor(private sponsorService: SponsorService) {

  }

  ngOnInit() {
    setTimeout(function () {
      $('#sponsorDate .mydp .selectiongroup').css('padding-right', '10px')
      $('#sponsorDate .mydp .btnclear,#sponsorDate .mydp .btnpicker').css('background', 'transparent')
      $('#sponsorDate .mydp .selbtngroup').css('top', '6px')
    }, 1000)

    this.dT = this.dedicationType[0]
  }


  unAvailable(source: number) {
    let self=this
    this.sponsorService.getUnAvailable(source).subscribe(function (response) {

      var un = []

      response.forEach(function (a) {
         un.push( {year: new Date(a).getFullYear(), month: new Date(a).getMonth()+1, day: new Date(a).getDate()})
      })
      
      self.myDatePickerOptions = {
      // other options...
       dateFormat: 'mm.dd.yyyy',
       disableDays:un
      };

            
    }, function (error) {

    }, function () { })
  }

  Save(status: boolean) {
    if (status) {

      let self = this
      if (this.section == 'day') {

        var sponsor = new Sponsor()
        sponsor.sourceID = this.sourceId
        sponsor.forDate = new Date(this.date.date.year, this.date.date.month, this.date.date.day)
        sponsor.dedicationTypeID = parseInt(this.dT.id)
        sponsor.sponsoredForName = this.sponsorshipFor
        sponsor.sponsoredByName = this.name

        this.sponsorService.addDay(sponsor).subscribe(function (response) {
          self.sponsorService.Notify("Sponsor Created", false)
          self.Reset();
        }, function (error) {
          self.sponsorService.Notify("Error trying to create the sponsor", true)
        }, function () { })
      }
      else {

        var sponsorShiur = new SponsorShiur()

        sponsorShiur.shiurID = this.shiurID
        sponsorShiur.dedicationTypeID = parseInt(this.dT.id)
        sponsorShiur.sponsoredForName = this.sponsorshipFor
        sponsorShiur.sponsoredByName = this.name

        this.sponsorService.addShiur(sponsorShiur).subscribe(function (response) {
          self.sponsorService.Notify("Sponsor Created", false)
          self.Reset();
        }, function (error) {
          self.sponsorService.Notify("Error trying to create the sponsor", true)
        }, function () { })
      }

    }
  }

  Check(name: number) {

    this.itorah = name == 17 ? true : false
    this.halacha = name == 6 ? true : false
    this.tehillim = name == 7 ? true : false

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
    this.payment = true
  }

}
