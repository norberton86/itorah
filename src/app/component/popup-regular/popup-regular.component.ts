import { Component, OnInit } from '@angular/core';
import { TehillimService } from '../../service/tehillim.service';
import { Country, Category, Comunity } from '../../model/Tehillim/tehillim';
import { RegisterTehellim } from '../../model/register-tehellim';

declare var $: any;

@Component({
  selector: 'app-popup-regular',
  templateUrl: './popup-regular.component.html',
  styleUrls: ['./popup-regular.component.css'],
})
export class PopupRegularComponent implements OnInit {

  country: Country;
  countries: Array<Country>=[];

  comunity: Comunity;
  comunities: Array<Comunity>=[];

  category: Category;
  categories: Array<Category>=[];
  
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

  ChangeCountry()
  {
    this.ReadComunity()
  }

  ChangeCommunity()
  {
   this.ReadCategory()
  }

  Send()
  {
    var data=new RegisterTehellim()
    data.isEmergency=false
    data.categoryID=this.country.id
    data.hebrewFirstName=this.hebrewFirstName
    data.hebrewMotherName=this.hebrewMotherName
    data.translitFirstName=this.translitFirstName
    data.translitMotherName=this.translitMotherName
    data.isBat=false
    data.countryID=this.country.id
    data.communityID=this.comunity.id
  }

  hebrewFirstName:string
  hebrewMotherName:string
  translitFirstName:string
  translitMotherName:string
  condition: string
  
  /*
  
  startDate: Date
  endDate: string
  emailMessage: string
  phone: string
  isImmediateFamily: boolean
  relationshiptoPerson: string
  contactName: string
  contactRelationshipToPerson: string
  contactPhone: string
  contactEmail: string
  commentsToAdmin: string
  */
}
