import { Component, OnInit } from '@angular/core';
import { Comunity ,Category} from '../../model/Tehillim/tehillim';
import { RegisterLevaya } from '../../model/register-levaya';
import { RegisterTehellim, TehillimResult } from '../../model/register-tehellim';
import { RegisterTehellimService } from '../../service/register-tehellim.service';

declare var $: any;

@Component({
  selector: 'app-popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.css'],
  providers: [RegisterTehellimService]
})
export class PopupRegisterComponent implements OnInit {

  //--------------------- Announcement --------------
  mother: string
  firstName: string
  lastName: string
  comunities: Array<Comunity> = []
  comunity: Comunity
  results: Array<TehillimResult> = []
  existResults: number = 0

  ages: Array<number> = []


  constructor(private registerTehellimService: RegisterTehellimService) { }

  ngOnInit() {
    for (var i = 1; i <= 90; i++) {
      this.ages.push(i)
    }

    this.readCategories()
  }

  searchDatabase(type: string) {
    let self = this

    if (type == "tehillim") {
      this.registerTehellimService.checkTehillim(type, this.mother, this.firstName, 1).subscribe(
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
      this.registerTehellimService.checkLevaya(type, this.mother, this.firstName, this.lastName).subscribe(
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
  }

  OpenRegular() {
    this.Close()
    $('#form-register-tehillim-step-regular').toggleClass('shown');
    $('.mydrp').css('width', '224px')
  }

  OpenEmergency() {

    this.Close()
    $('#form-register-tehillim-step-emergency').toggleClass('shown');
    $('.mydrp').css('width', '224px')
  }

  OpenLevaya() {
    this.Close()
    $('#form-register-levaya-step').toggleClass('shown');
  }

  CloseResults(section: string) {
    this.existResults = 0
    this.section = section
  }

  section: string

  //---------------------------------------------------------Perek-----------------------------------------------------------------//
  categoriesPerek: Array<Category> = [{ id: 0, name: "Select Category" }]
  categoryPerek: Category = this.categoriesPerek[0]

  perekSearch: string = ''
  perek: number = 1
  needs:Array<string>=[]

  readCategories()
  {
    this.registerTehellimService.readCategory().subscribe(result=>{
      for(var i=0;i<result.length;i++)
      this.categoriesPerek.push(result[i])
    },error=>{},()=>{})
  }


  ChangeCategoryPerek() {
    if(this.categoryPerek.id!=0)
    {

      this.existResults = 22
    }
    
  }

  Go() {
    this.existResults = 22
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
    this.existResults = 21
  }

  ShowList() {
    this.existResults = 23
  }

}

