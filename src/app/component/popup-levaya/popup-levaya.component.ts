import { Component, OnInit } from '@angular/core';
import { TehillimService } from '../../service/tehillim.service';
import { RegisterTehellimService } from '../../service/register-tehellim.service';
import { Country, Comunity } from '../../model/Tehillim/tehillim';
import { RegisterLevaya } from '../../model/register-levaya';
import { IMyDpOptions } from 'mydatepicker';

declare var $: any;
declare var VirtualKeyboard: any;

@Component({
  selector: 'app-popup-levaya',
  templateUrl: './popup-levaya.component.html',
  styleUrls: ['./popup-levaya.component.css']
})
export class PopupLevayaComponent implements OnInit {

  country: Country;
  countries: Array<Country> = [];

  comunity: Comunity;
  comunities: Array<Comunity> = [];


  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm.dd.yyyy',
  };

  // Initialized to specific date (09.10.2018).
  public startDate: any 
  public funeralDate: any
  
  public arayatDate: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };
  public endDate: any = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };

  constructor(private tehillimService: TehillimService, private registerTehellimService: RegisterTehellimService) {
    this.registerTehellimService.getData().subscribe(item => {

      this.translitFirstName = item[0]
      this.translitMotherName = item[1]
      this.englishFirstName = item[2]
      this.englishLastName = item[3]
      this.HakdashaID=item[4]
    });
   }

   HakdashaID:number=null

  ngOnInit() {
    this.startDate= { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };
      this.funeralDate = { date: { year: this.addDays(new Date(), 7).getFullYear(), month: this.addDays(new Date(), 7).getMonth() + 1, day: this.addDays(new Date(), 7).getDate() } };
    this.ReadCountry()

  }

  addDays(date, days) :Date{
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  SetKeyboard(id) {
    var $keyboard = $('#VirtualKeyboardHolder');
    VirtualKeyboard.toggle(id, $keyboard.attr('id'));
  }

  /*
  openField() {
    $('#form__row-info-levaya').removeClass('hidden');
  }

  closeField() {
    $('#form__row-info-levaya').addClass('hidden');
  }
*/
  ChangeCountry() {
    this.ReadComunity()
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

  englishFirstName: string=""
  englishLastName: string=""
  translitFirstName: string=""
  translitMotherName: string=""
  survivingMembers: string=""
  prayerTimes: string=""
  funeralInfo: string=""

  shivaAddress: string=""

  arayatDetails: string=""
  additionalCommentsForEmail: string=""


  emailMessage: string=""
  phone: string=""
  isImmediateFamily: string = '2'
  commentsToAdmin: string=""
  relationshiptoPerson: string=""
  contactName: string=""
  contactRelationshipToPerson: string=""
  contactPhone: string=""
  contactEmail: string=""

  Send() {
    var data = new RegisterLevaya()

    data.englishFirstName = this.englishFirstName
    data.englishLastName = this.englishLastName
    data.survivingMembers = this.survivingMembers
    data.prayerTimes = this.prayerTimes
    data.funeralInfo = this.funeralInfo
    data.funeralDate = new Date(this.funeralDate.date.year, this.funeralDate.date.month, this.funeralDate.date.day)
    data.shivaAddress = this.shivaAddress
    data.arayatDate = new Date(this.arayatDate.date.year, this.arayatDate.date.month, this.arayatDate.date.day)
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

    data.startDate = new Date(this.startDate.date.year, this.startDate.date.month, this.startDate.date.day)
    data.endDate = new Date(this.endDate.date.year, this.endDate.date.month, this.endDate.date.day)
    data.isImmediateFamily = this.isImmediateFamily == '2' ? false : true
    data.RemoveFromTehillim=this.HakdashaID


    let self = this;
    this.registerTehellimService.addLevaya(data).subscribe(
      function (response) {
        self.registerTehellimService.Notify("Registered", false)
        self.Reset()
        $('#form-register-levaya-step').toggleClass('shown');
      },
      function (error) {
        self.registerTehellimService.Notify("Error trying to register", true)
      },
      function () {

      }
    )
  }

  Reset() {
    this.englishFirstName = ""
    this.englishLastName = ""
    this.translitFirstName = ""
    this.translitMotherName = ""
    this.survivingMembers = ""
    this.prayerTimes = ""
    this.funeralInfo = ""
    this.funeralDate = { date: { year: this.addDays(new Date(), 7).getFullYear(), month: this.addDays(new Date(), 7).getMonth() + 1, day: this.addDays(new Date(), 7).getDate() } };
    this.shivaAddress = ""
    this.arayatDate = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } }
    this.arayatDetails = ""
    this.additionalCommentsForEmail = ""
    this.startDate = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } }
    this.endDate = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } }
    this.emailMessage = ""
    this.phone = ""
    this.isImmediateFamily = '2'
    this.commentsToAdmin = ""
    this.relationshiptoPerson = ""
    this.contactName = ""
    this.contactRelationshipToPerson = ""
    this.contactPhone = ""
    this.contactEmail = ""

    $('#field-hebrew-fname-levaya').val('')
    $('#field-hebrew-lname-levaya').val('')

    this.HakdashaID=null
  }
}