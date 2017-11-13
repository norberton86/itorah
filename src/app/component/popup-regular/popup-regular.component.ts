import { Component, OnInit } from '@angular/core';
import { TehillimService } from '../../service/tehillim.service';
import { Country, Category, Comunity } from '../../model/Tehillim/tehillim';
import { RegisterTehellim } from '../../model/register-tehellim';
import { IMyDrpOptions } from 'mydaterangepicker';

declare var $: any;

@Component({
  selector: 'app-popup-regular',
  templateUrl: './popup-regular.component.html',
  styleUrls: ['./popup-regular.component.css'],
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
    dateFormat: 'dd.mm.yyyy',
  };

  private model: any = {
    beginDate: { year: 2018, month: 10, day: 9 },
    endDate: { year: 2018, month: 10, day: 19 }
  };

  constructor(private tehillimService: TehillimService) { }

  ngOnInit() {
    this.ReadCountry()

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
    data.hebrewFirstName = this.hebrewFirstName
    data.hebrewMotherName = this.hebrewMotherName
    data.translitFirstName = this.translitFirstName
    data.translitMotherName = this.translitMotherName
    data.isBat = false
    data.countryID = this.country.id
    data.communityID = this.comunity.id
    data.condition = this.condition
    data.startDate = new Date(this.model.beginDate.year, this.model.beginDate.month, this.model.beginDate.day)
    data.endDate = new Date(this.model.endDate.year, this.model.endDate.month, this.model.endDate.day)
    data.isImmediateFamily=this.isImmediateFamily=='2'?false:true
    data.phone = this.phone
    data.relationshiptoPerson=this.relationshiptoPerson
    data.contactName=this.contactName;
    data.contactPhone=this.contactPhone
    data.contactRelationshipToPerson=this.contactRelationshipToPerson
    data.contactEmail=this.contactEmail
    data.commentsToAdmin=this.commentsToAdmin
    data.emailMessage=""
  }

  hebrewFirstName: string
  hebrewMotherName: string
  translitFirstName: string
  translitMotherName: string
  condition: string
  isImmediateFamily: string='2'
  phone: string
  relationshiptoPerson:string
  
  contactName: string
  contactPhone: string
  contactRelationshipToPerson: string
  contactEmail: string
  commentsToAdmin: string
}
