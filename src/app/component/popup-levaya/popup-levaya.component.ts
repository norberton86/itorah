import { Component, OnInit } from '@angular/core';
import { TehillimService } from '../../service/tehillim.service';
import { RegisterTehellimService } from '../../service/register-tehellim.service';
import { Country, Comunity } from '../../model/Tehillim/tehillim';
import { RegisterLevaya } from '../../model/register-levaya';
import { IMyDrpOptions } from 'mydaterangepicker';

declare var $: any;
declare var VirtualKeyboard: any;

@Component({
  selector: 'app-popup-levaya',
  templateUrl: './popup-levaya.component.html',
  styleUrls: ['./popup-levaya.component.css'],
  providers: [RegisterTehellimService]
})
export class PopupLevayaComponent implements OnInit {

  country: Country;
  countries: Array<Country> = [];

  comunity: Comunity;
  comunities: Array<Comunity> = [];


  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'mm.dd.yyyy',
  };

  private model: any = {
    beginDate: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
    endDate: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
  };

  constructor(private tehillimService: TehillimService, private registerTehellimService: RegisterTehellimService) { }

  ngOnInit() {
    this.ReadCountry()

  }

  SetKeyboard(id) {
    var $keyboard = $('#VirtualKeyboardHolder');
    VirtualKeyboard.toggle(id, $keyboard.attr('id'));
  }

  openField() {
    $('#form__row-info-levaya').removeClass('hidden');
  }

  closeField() {
    $('#form__row-info-levaya').addClass('hidden');
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

  englishFirstName: string
  englishLastName: string
  translitFirstName: string
  translitMotherName: string
  survivingMembers: string
  prayerTimes: string
  funeralInfo: string
  funeralDate: Date
  shivaAddress: string
  arayatDate: Date
  arayatDetails: string
  additionalCommentsForEmail: string
  startDate: Date
  endDate: string
  emailMessage: string
  phone: string
  isImmediateFamily: string = '2'
  commentsToAdmin: string
  relationshiptoPerson: string
  contactName: string
  contactRelationshipToPerson: string
  contactPhone: string
  contactEmail: string

  Send() {
    var data = new RegisterLevaya()

    data.englishFirstName = this.englishFirstName
    data.englishLastName = this.englishLastName
    data.survivingMembers = this.survivingMembers
    data.prayerTimes = this.prayerTimes
    data.funeralInfo = this.funeralInfo
    data.funeralDate = this.funeralDate
    data.shivaAddress = this.shivaAddress
    data.arayatDate = this.arayatDate
    data.arayatDetails = this.arayatDetails
    data.additionalCommentsForEmail = this.additionalCommentsForEmail
    data.isEmergency = false
    data.categoryID = 0

    data.isBat = false

    data.translitFirstName = this.translitFirstName
    data.translitMotherName = this.translitMotherName
    data.countryID = this.country.id
    data.communityID = this.comunity.id
    data.condition = ''

    data.emailMessage = this.emailMessage
    data.phone = this.phone

    data.relationshiptoPerson = this.relationshiptoPerson
    data.contactName = this.contactName
    data.contactRelationshipToPerson = this.contactRelationshipToPerson
    data.contactPhone = this.contactPhone
    data.contactEmail = this.contactEmail
    data.commentsToAdmin = this.commentsToAdmin


    data.hebrewFirstName = $('#field-hebrew-fname-levaya').val()
    data.hebrewMotherName = $('#field-hebrew-lname-levaya').val()

    data.startDate = new Date(this.model.beginDate.year, this.model.beginDate.month, this.model.beginDate.day)
    data.endDate = new Date(this.model.endDate.year, this.model.endDate.month, this.model.endDate.day)
    data.isImmediateFamily = this.isImmediateFamily == '2' ? false : true


    let self = this;
    this.registerTehellimService.addLevaya(data).subscribe(
      function (response) {
        self.registerTehellimService.Notify("Registered", false)
        //self.Reset()
        $('#form-register-levaya-step').toggleClass('shown');
      },
      function (error) {
        self.registerTehellimService.Notify("Error trying to register", true)
      },
      function () {

      }
    )
  }

  /*Reset() {
    this.englishFirstName=""
    this.englishLastName=""
    this.translitFirstName=""
    this.translitMotherName=""
    this.survivingMembers=""
    this.prayerTimes=""
    this.funeralInfo=""
    this.funeralDate: Date
    this.shivaAddress=""
    this.arayatDate: Date
    this.arayatDetails=""
    this.additionalCommentsForEmail=""
    this.startDate: Date
    this.endDate=""
    this.emailMessage=""
    this.phone =""
    this.isImmediateFamily = '2'
    this.commentsToAdmin=""
    this.relationshiptoPerson=""
    this.contactName=""
    this.contactRelationshipToPerson=""
    this.contactPhone=""
    this.contactEmail=""
  }*/
}


  //englishFirstName: string
  //englishLastName: string
  //survivingMembers: string
  //prayerTimes: string
  //funeralInfo: string
  //funeralDate: Date
  //shivaAddress: string
  //arayatDate: Date
  //arayatDetails: string
  //additionalCommentsForEmail: string
  //isEmergency: true
  //categoryID: number
  //hebrewFirstName: string
  //isBat: true
  //hebrewMotherName: string
  //translitFirstName: string
  //translitMotherName: string
  //countryID: number
  //communityID: number
  //condition: string
  //startDate: Date
  //endDate: string
  //emailMessage: string
  //phone: string
  //isImmediateFamily: true
  //relationshiptoPerson: string
  //contactName: string
  //contactRelationshipToPerson: string
  //contactPhone: string
  //contactEmail: string
  //commentsToAdmin: string