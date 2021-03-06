import { Component, OnInit } from '@angular/core';
import { TehillimService } from '../../service/tehillim.service';
import { RegisterTehellimService } from '../../service/register-tehellim.service';
import { Country, Category, Comunity } from '../../model/Tehillim/tehillim';
import { RegisterTehellim } from '../../model/register-tehellim';
import { IMyDrpOptions } from 'mydaterangepicker';

declare var $: any;
declare var VirtualKeyboard: any;

@Component({
  selector: 'app-popup-emergency',
  templateUrl: './popup-emergency.component.html',
  styleUrls: ['./popup-emergency.component.css']
})
export class PopupEmergencyComponent implements OnInit {

  country: Country;
  countries: Array<Country> = [];

  comunity: Comunity;
  comunities: Array<Comunity> = [];

  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'mm.dd.yyyy',
  };

  model: any 

  constructor(private tehillimService: TehillimService, private registerTehellimService: RegisterTehellimService) {
    this.registerTehellimService.getData().subscribe(item => {
      this.translitFirstName = item[0]
      this.translitMotherName = item[1]
    });
  }

  ngOnInit() {

    this.model = {
      beginDate: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
      endDate: { year: this.addDays(new Date(), 14).getFullYear(), month: this.addDays(new Date(), 14).getMonth()+1, day: this.addDays(new Date(), 14).getDate() }
    };

    this.ReadCountry()
  }

  addDays(date, days) :Date{
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  SetKeyboard(id) {
    var $keyboard = $('#VirtualKeyboardHolder-1');
    VirtualKeyboard.toggle(id, $keyboard.attr('id'));
  }

  ReadCountry() {
    let self = this;
    this.tehillimService.readCountry().subscribe(
      function (response) {

        self.countries = response;
        self.country = response[0]
        self.ReadComunity();

      }, function (error) { }, function () { }
    )
  }

  ReadComunity() {
    let self = this;
    this.tehillimService.readComunity(this.country.id).subscribe(
      function (response) {
        self.comunities = response;
        self.comunity = response[0];

      }, function (error) { }, function () { }
    )
  }

  ChangeCountry() {
    this.ReadComunity()
  }

  openField() {
    $('#form__row-info-emergency').removeClass('hidden');
  }

  closeField() {
    $('#form__row-info-emergency').addClass('hidden');
  }

  requesting:boolean=false
  Send() {
    var data = new RegisterTehellim()

    data.isEmergency = true
    data.categoryID = 1
    data.hebrewFirstName = $('#field-hebrew-fname-eme').val()
    data.hebrewMotherName = $('#field-hebrew-lname-eme').val()
    data.translitFirstName = this.translitFirstName
    data.translitMotherName = this.translitMotherName
    data.isBat = false
    data.countryID = this.country.id
    data.communityID = this.comunity.id
    data.condition = this.condition
    data.startDate = new Date(this.model.beginDate.year, this.model.beginDate.month, this.model.beginDate.day)
    data.endDate = new Date(this.model.endDate.year, this.model.endDate.month, this.model.endDate.day)
    data.isImmediateFamily = this.isImmediateFamily == '2' ? false : true
    data.phone = this.phone
    data.relationshiptoPerson = this.relationshiptoPerson
    data.contactName = this.contactName;
    data.contactPhone = this.contactPhone
    data.contactRelationshipToPerson = this.contactRelationshipToPerson
    data.contactEmail = this.contactEmail
    data.commentsToAdmin = this.commentsToAdmin
    data.emailMessage = this.emailMessage

    let self = this;
    self.requesting=true
    this.registerTehellimService.addTehillim(data).subscribe(
      function (response) {
        self.requesting=false
        self.registerTehellimService.Notify("Registered", false)
        self.Reset()
        $('#form-register-tehillim-step-emergency').toggleClass('shown');
      },
      function (error) {
        self.requesting=false
        self.registerTehellimService.Notify("Error trying to register", true)
      },
      function () {

      }
    )
  }

  hebrewFirstName: string = ''
  hebrewMotherName: string = ''
  translitFirstName: string = ''
  translitMotherName: string = ''
  condition: string = ''
  isImmediateFamily: string = '2'
  phone: string = ''
  relationshiptoPerson: string = ''

  contactName: string = ''
  contactPhone: string = ''
  contactRelationshipToPerson: string = ''
  contactEmail: string = ''
  commentsToAdmin: string = ''
  emailMessage: string = ''

  Reset() {
    this.hebrewFirstName = ""
    this.hebrewMotherName = ""
    this.translitFirstName = ""
    this.translitMotherName = ""
    this.condition = ""
    this.isImmediateFamily = '2'
    this.phone = ""
    this.relationshiptoPerson = ""

    this.contactName = ""
    this.contactPhone = ""
    this.contactRelationshipToPerson = ""
    this.contactEmail = ""
    this.commentsToAdmin = ""
    this.emailMessage = ""

    this.model = {
      beginDate: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
      endDate: { year: this.addDays(new Date(), 14).getFullYear(), month: this.addDays(new Date(), 14).getMonth()+1, day: this.addDays(new Date(), 14).getDate() }
    };

    $('#field-hebrew-fname-eme').val('')
    $('#field-hebrew-lname-eme').val('')
  }
}
