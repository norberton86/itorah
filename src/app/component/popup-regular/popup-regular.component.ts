import { Component, OnInit } from '@angular/core';
import { TehillimService } from '../../service/tehillim.service';
import { RegisterTehellimService } from '../../service/register-tehellim.service';
import { Country, Category, Comunity } from '../../model/Tehillim/tehillim';
import { RegisterTehellim } from '../../model/register-tehellim';
import { IMyDrpOptions } from 'mydaterangepicker';

declare var $: any;
declare var VirtualKeyboard: any;

@Component({
  selector: 'app-popup-regular',
  templateUrl: './popup-regular.component.html',
  styleUrls: ['./popup-regular.component.css'],
  providers: [RegisterTehellimService]
})
export class PopupRegularComponent implements OnInit {

  country: Country;
  countries: Array<Country> = [];

  comunity: Comunity;
  comunities: Array<Comunity> = [];

  category: Category;
  categories: Array<Category> = [];

  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'mm.dd.yyyy',
  };

 model: any = {
    beginDate: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
    endDate: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
  };

  constructor(private tehillimService: TehillimService, private registerTehellimService: RegisterTehellimService) { }

  ngOnInit() {
    this.ReadCountry()

  }

  SetKeyboard(id) {
    var $keyboard = $('#VirtualKeyboardHolder-2');
    VirtualKeyboard.toggle(id, $keyboard.attr('id'));
  }

  openField() {
    $('#form__row-info').removeClass('hidden');
  }

  closeField() {
    $('#form__row-info').addClass('hidden');
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
        self.ReadCategory();

      }, function (error) { }, function () { }
    )
  }

  ReadCategory() {
    let self = this;
    this.tehillimService.readCategory(this.comunity.id).subscribe(
      function (response) {

        if (response.length <= 0) //if doesn't exist related communities
        {
          self.categories = [];
        }
        else {
          self.categories = response;
          self.category = response[0];
        }

      }, function (error) { }, function () { }
    )
  }

  ChangeCountry() {
    this.ReadComunity()
  }

  ChangeCommunity() {
    this.ReadCategory()
  }

  Send() {
    var data = new RegisterTehellim()

    data.isEmergency = false
    data.categoryID = this.category.id
    data.hebrewFirstName = $('#field-hebrew-fname').val()
    data.hebrewMotherName = $('#field-hebrew-lname').val()
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
    data.emailMessage = ""

    let self = this;
    this.registerTehellimService.addTehillim(data).subscribe(
      function (response) {
        self.registerTehellimService.Notify("Registered", false)
        self.Reset()
        $('#form-register-tehillim-step-regular').toggleClass('shown');
      },
      function (error) {
        self.registerTehellimService.Notify("Error trying to register", true)
      },
      function () {

      }
    )
  }

  hebrewFirstName: string
  hebrewMotherName: string
  translitFirstName: string
  translitMotherName: string
  condition: string
  isImmediateFamily: string = '2'
  phone: string
  relationshiptoPerson: string

  contactName: string
  contactPhone: string
  contactRelationshipToPerson: string
  contactEmail: string
  commentsToAdmin: string

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

    this.model = {
      beginDate: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
      endDate: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
    }
    
    $('#field-hebrew-fname').val('')
    $('#field-hebrew-lname').val('')

  }
}
