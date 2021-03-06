import { Component, OnInit } from '@angular/core';
import { Comunity, Category, Country } from '../../model/Tehillim/tehillim';
import { RegisterLevaya } from '../../model/register-levaya';
import { RegisterTehellim, TehillimResult } from '../../model/register-tehellim';
import { RegisterTehellimService, Generate } from '../../service/register-tehellim.service';
import { PlayerService } from '../../service/player.service';
import { EntireList, Perek, Need } from '../../model/entire-list';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TehillimService } from "app/service/tehillim.service";
import { HomeService } from '../../service/home.service';
import { PrintService } from '../../service/print.service';

declare var $: any;
declare var VirtualKeyboard: any;

@Component({
  selector: 'app-popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.css'],
  providers:[PrintService]
})
export class PopupRegisterComponent implements OnInit {


  tile: string

  //--------------------- Announcement --------------
  mother: string = ''
  firstName: string = ''
  lastName: string = ''
  communities: Array<Comunity> = []
  countries: Array<Country> = []
  results: Array<TehillimResult> = []
  existResults: number = 0

  ages: Array<number> = []

  form: FormGroup;
  formLevaya: FormGroup;
  constructor(private printService:PrintService,private homeService: HomeService, private registerTehellimService: RegisterTehellimService, private playerService: PlayerService, private _fb: FormBuilder, private tehillimService: TehillimService) {

    this.form = this._fb.group({
      mother: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      ben: ['ben'],
      country: [0],
      community: [0]
    });

    this.formLevaya = this._fb.group({
      transFirstName: ['', [Validators.required]],
      transMotherName: ['', [Validators.required]],
      EnglishFirstName: ['', [Validators.required]],
      EnglishLastName: ['', [Validators.required]],
      ben: ['ben'],
      Age: [0]
    });

    this.registerTehellimService.getItem().subscribe(item => {
      this.tile = item
      if(this.tile=='Read') //if comming from glass icon
      {
        /* this.existResults=0  //hide the third column
         $('#form-register-119').addClass('hidden')
         $('#form-register-perek').removeClass('hidden')*/

         //in case that the component is in the second panel(panel that use the back button) , then clear
         this.perekPassuk=''

         if($('input[name="form-register-perek"]:checked').length == 0)   //check if the checkbox is checked
         $('#field-register-perek').get(0).click();
      }
    });
  }


  ReadCountry() {

    this.tehillimService.readCountry().subscribe(
      response => {

        this.countries = response;
        this.ReadComunity(this.countries[0].id);

      }, error => { }, () => { }
    )
  }


  ReadCommunitySelect() {

    this.ReadComunity(this.form.value.country)
  }

  ReadComunity(countryId: number) {

    this.tehillimService.readComunity(countryId).subscribe(
      response => {
        this.communities = response;

        var data = {
          mother: '',
          firstName: '',
          ben: 'ben',
          country: countryId,
          community: this.communities[0].id
        }

        this.form.patchValue(data);

      }, error => { }, () => { }
    )
  }

  Validate() {
    return this.form.controls.mother.errors != null || this.form.controls.firstName.errors != null
  }

  ValidateLevaya() {
    return this.formLevaya.controls.transFirstName.errors != null || this.formLevaya.controls.transMotherName.errors != null || this.formLevaya.controls.EnglishFirstName.errors != null || this.formLevaya.controls.EnglishLastName.errors != null
  }

  ngOnInit() {

    this.getPdf()

    for (var i = 1; i <= 90; i++) {
      this.ages.push(i)
    }

    this.readCategories()
    this.readNeeds()
    this.readPerek()

    this.ReadCountry()
  }

  Update(HakdashaID: number) {

    this.OpenLevaya()
    var values = new Array<any>()

    values.push(this.formLevaya.value.transFirstName)
    values.push(this.formLevaya.value.transMotherName)
    values.push(this.formLevaya.value.EnglishFirstName)
    values.push(this.formLevaya.value.EnglishLastName)
    values.push(HakdashaID)

    this.registerTehellimService.setData(values)
  }

  searchDatabase(type: string) {
    let self = this

    if (type == "tehillim") {
      this.registerTehellimService.checkTehillim(this.form.value.mother.trim(), this.form.value.firstName.trim(), this.form.value.community).subscribe(
        function (respond) {
          //"No similar names"
          if (respond == "No similar names") {
            self.existResults = 1
          }
          else {
            self.results = respond
            self.existResults = 3
          }
        },
        function (error) {

          self.registerTehellimService.Notify("Error trying to search", true)
        },
        function () { }
      )
    }
    else {

      this.registerTehellimService.checkLevaya(this.formLevaya.value.transMotherName.trim(), this.formLevaya.value.transFirstName.trim(), this.formLevaya.value.EnglishFirstName.trim(), this.formLevaya.value.EnglishLastName.trim(), this.formLevaya.value.Age).subscribe(
        function (respond) {
          //"No similar names"
          if (respond == "No similar names") {
            self.existResults = 2
          }
          else {
            self.results = respond
            self.existResults = 3
          }
        },
        function (error) {

          self.registerTehellimService.Notify("Error trying to search", true)
        },
        function () { }
      )
    }

  }

  addTehillim(tehillim: RegisterTehellim) {

    let self = this
    this.registerTehellimService.addTehillim(tehillim).subscribe(
      function (respond) {

      },
      function (error) {

        self.registerTehellimService.Notify("Error trying to register", true)
      },
      function () { }
    )
  }

  addLevaya(levaya: RegisterLevaya) {

    let self = this
    this.registerTehellimService.addLevaya(levaya).subscribe(
      function (respond) {

      },
      function (error) {

        self.registerTehellimService.Notify("Error trying to register", true)
      },
      function () { }
    )
  }


  NavigateNewRegistration() {

    if (this.section == "levaya")
      this.OpenLevaya()
    else
      this.existResults = 1
  }

  Close() {
    $('#popup-register').toggleClass('shown');
    this.ResetForms()
  }

  ResetForms()
  {
    //perek
    this.categoryPerek=this.categoriesPerek[0]
    this.perekSearch=''
    this.perek=1

   //pasuk
   $('#field-first-Pasuk-name').val('')
    this.benPasuk="ben"
    $('#field-mothers-Pasuk-name').val('')
    this.existResults=0
  }

  OpenRegular() {
    this.Close()
    $('#form-register-tehillim-step-regular').toggleClass('shown');
    $('.mydrp').css('width', '224px')
    this.registerTehellimService.setData([this.form.value.firstName, this.form.value.mother])
  }

  OpenEmergency() {

    this.Close()
    $('#form-register-tehillim-step-emergency').toggleClass('shown');
    $('.mydrp').css('width', '224px')
    this.registerTehellimService.setData([this.form.value.firstName, this.form.value.mother])
  }

  OpenLevaya() {
    this.Close()
    $('#form-register-levaya-step').toggleClass('shown');
  }

  CloseResults(section: string) {
    this.existResults = 0
    this.section = section

    if (this.section == 'cientoNueve')
      {
        this.existResults = 119
        if($('input[name="form-register-119"]:checked').length == 0)   //check if the checkbox is unChecked
        {
          this.existResults=0  //then hide the third column
        } 
      }

    if (this.section == 'today') {
      this.existResults = 44
      this.perekPassuk = 'today'

      //uncheck  the other checkbox
      if($('input[name="form-register-119"]:checked').length > 0)   //check if the checkbox is checked
         $('#field-register-119').get(0).click();

      if($('input[name="form-register-perek"]:checked').length > 0)   //check if the checkbox is checked
         $('#field-register-perek').get(0).click();
    }

    if (this.section == 'whats') {
      this.existResults = 44
      this.perekPassuk = 'whats'

      //uncheck  the other checkbox
      if($('input[name="form-register-perek"]:checked').length > 0)   //check if the checkbox is checked
         $('#field-register-perek').get(0).click();
    }


  }

  section: string

  //---------------------------------------------------------Perek-----------------------------------------------------------------//
  categoriesPerek: Array<Category> = [{ id: 0, name: "Select Category", MainCategory: false, ParentID: 0 }]
  categoryPerek: Category = this.categoriesPerek[0]

  perekSearch: string = ''
  perek: number = 1

  needsToShow: Array<string> = []
  needs: Array<Need> = []

  entireList: Array<EntireList> = []

  pereks: Array<Perek> = []

  kindSearch: string = ''
  searchValue: string = ''

  readCategories() {
    this.registerTehellimService.readCategory().subscribe(result => {
      for (var i = 0; i < result.length; i++)
        this.categoriesPerek.push(result[i])
    }, error => { }, () => { })
  }

  readNeeds() {
    this.registerTehellimService.readEntireList().subscribe(result => {
      this.entireList = result
      this.getNeeds()
    }, error => { }, () => { })
  }

  getNeeds() {
    let self = this
    this.entireList.forEach(
      a => {
        a.needs.forEach(
          n => {
            this.needsToShow.push(n.need)
            this.needs.push(n)
          }
        )
      }
    )
  }

  readPerek() {
    this.registerTehellimService.readPerek().subscribe(result => {
      this.pereks = result
      this.pereks.forEach(p => {
        if (p.categories == null)
          p.categories = []
      })
    }, error => { }, () => { })
  }

  pereksGroup: Array<Perek> = []
  ChangeCategoryPerek() {
    if (this.categoryPerek.id != 0) {
      this.pereksGroup = []
      this.pereks.forEach(p => {
        p.categories.forEach(c => {
          if (c == this.categoryPerek.id)
            this.pereksGroup.push(p)
        })
      })
      this.existResults = 22
      this.kindSearch = "Category"
      this.searchValue = this.categoryPerek.name
    }

  }

  Go(event: any) {
    var need = this.needs.find(n => n.need == this.perekSearch)
    if (need == null || need == undefined)
      return

    this.pereksGroup = []
    this.pereks.forEach(p => {
      if (p.needs != null && p.needs.find(c => c == need.id))
        this.pereksGroup.push(p)
    })
    this.existResults = 22
    this.kindSearch = "Need"
    this.searchValue = this.perekSearch
  }

  Decrement() {
    this.perek--
    if (this.perek == 0)
      this.perek = 1
  }

  Increment() {
    this.perek++
    if (this.perek == 151)
      this.perek = 150
  }

  SelectPerek() {

   if(this.perek<1||this.perek>150)
   return

    this.existResults = 21
  }

  ShowList() {
    this.existResults = 23
  }

  NavigatePerek() {
    this.perekPassuk = 'perek'
    this.images = this.pereks.find(p => p.id == this.perek).hebrewText
    this.TitleNUmber();

  }

  TitleNUmber() {
    this.perekNumberSelected = this.pereks.find(p => p.id == this.perek).id
    this.perekTitleSelected = ''
    this.pereks.find(p => p.id == this.perek).categories.forEach(c => {
      this.perekTitleSelected += this.categoriesPerek.find(t => t.id == c).name
    })
    this.downloadUrl = this.pereks.find(p => p.id == this.perek).audioUrl
  }

  setPerek(id: number) {
    this.perek = id
    this.NavigatePerek()
  }

  //--------------------------------------------------------------------Perek-------------------------------------------------------------------
  perekPassuk: string = ''
  images: Array<string> = []
  summary: string = ''
  perekNumberSelected: number = 0
  perekTitleSelected: string = ""
  downloadUrl: string = ''

  Back()
  {
    this.perekPassuk = ''
  }

  BackToday() {
    this.perekPassuk = ''
    this.existResults=44
  }

  BackWhat()
  {
    this.perekPassuk = ''
    this.existResults=119
  }

  setTabPerek(tab: string) {
    switch (tab) {
      case "hebrew": this.images = this.pereks.find(p => p.id == this.perek).hebrewText; this.summary = ''; break;
      case "english": this.images = this.pereks.find(p => p.id == this.perek).englishText; this.summary = ''; break;
      case "transliteration": this.images = this.pereks.find(p => p.id == this.perek).transliteration; this.summary = ''; break;
      case "both": this.images = this.pereks.find(p => p.id == this.perek).both; this.summary = ''; break;
      case "summary":
        this.summary = this.pereks.find(p => p.id == this.perek).perekSummary
        break;
    }
  }

  IncrementSpecial() {
    this.Increment()
    this.setTabPerek('hebrew')
    this.TitleNUmber();
  }

  DecrementSpecial() {
    this.Decrement()
    this.setTabPerek('hebrew')
    this.TitleNUmber();
  }

  Print() {
    this.printService.Print('printPerek')
  }

  Play() {
    this.playerService.PlayAudio("", this.pereks.find(p => p.id == this.perek).audioUrl, "", 7, this.pereks.find(p => p.id == this.perek).id.toString())
  }


 ValidatePerek()
 {
   if(isNaN(this.perek))
    this.perek=0
 }
  //----------------------------------------------------------Pasuk----------------------------------------------------------
  SetKeyboard(id) {
    var $keyboard = $('#VirtualKeyboardHolderPasuk');
    VirtualKeyboard.show(id, $keyboard.attr('id'));

  }

  option: number = 1
  motherPasuk: string = ''
  firstNamePasuk: string = ''
  benPasuk: string = 'ben'
  generate: Generate

  Generate() {
    var isBat = 'true'
    if (this.benPasuk == 'ben')
      isBat = 'false'


    if(this.isInvalidPasuk('#field-first-Pasuk-name'))
    {
      this.firstNameRequired=true
      let self=this
      setTimeout(function(){
        self.firstNameRequired=false
      },3000)
      return
    }

    if(this.isInvalidPasuk('#field-mothers-Pasuk-name'))
    {
      this.motherNameRequired=true
      let self=this
      setTimeout(function(){
        self.motherNameRequired=false
      },3000)
      return
    }

    var motherHebrew = $('#field-mothers-Pasuk-name').val()
    var firstHebrew = $('#field-first-Pasuk-name').val()

    this.registerTehellimService.Generate(motherHebrew, isBat, firstHebrew, this.option).subscribe(result => {
      this.generate = result
      this.perekPassuk = "pasuk"
    }, error => {
      this.registerTehellimService.Notify("No content for this selection", true);
    }, () => { })
  }

  firstNameRequired:boolean=false
  motherNameRequired:boolean=false

  isInvalidPasuk(id:string):boolean
  {
     return $(id).val()==''?true:false
  }


  PrintPasuk() {
    this.printService.Print('printPasuk')
  }
  //--------------------------------------------------------Read Now----------------------------------------------------------

  pdfTitle: string = ''
  pdfDedication: string = ''

  getPdf() {
    this.homeService.readNow(7).subscribe(result => {
      this.pdfTitle = result.title
      this.pdfDedication = result.dedication
      //this.pdfContent=result.content

      var content = '<object data="' + result.content + '" width="100%" height="100%" type="application/pdf">'
      content += ' <p>Sorry, the PDF could not be displayed :(</p>'
      content += '</object>'

      $('#pdf').html(content)

    }, error => { }, () => { })
  }
}

