import { Component, OnInit, NgZone } from '@angular/core';
import { TehillimService } from '../../service/tehillim.service';
import { Tehillim, Country, Category, Comunity } from '../../model/Tehillim/tehillim';

declare var $: any;
@Component({
  selector: 'app-tehillim-show',
  templateUrl: './tehillim-show.component.html',
  styleUrls: ['./tehillim-show.component.css']
})
export class TehillimShowComponent implements OnInit {

  selectedCountry: number;
  countries: Array<Country>;
  //countryRaw:string;

  selectedComunity: number;
  comunities: Array<Comunity>;
  //comunityRaw:string;

  selectedCategory: number;
  categories: Array<Category>;

  tehellims: Array<Tehillim>

  action: string = "briefcase"

  tableHeader:string="Add to"


  backupTehillim:Array<Tehillim>=[]
  backupMyTehillim:Array<Tehillim>=[]

  constructor(private ngZone: NgZone, private tehillimService: TehillimService) {
    this.countries = [];
    this.comunities = [];
    this.categories = [];
    this.tehellims = [];

    this.tehillimService.getLogin().subscribe(item => {
      if (item == "Signed")
      {
        this.ReadMyTehillim();
      }
      else
      {
        this.backupMyTehillim=[]
        this.action="briefcase"                 //restore the original icon 
        this.tableHeader="Add to"
      }
    });
  }

  isAuthenticated(): boolean {
    let self = this;
    if (localStorage.getItem('userItorah') == null || localStorage.getItem('userItorah') == "")//needs credentials to access
    {
      setTimeout(function () {

        $('.nav-access > li > .dropdown-signin').addClass('shown').show() //open the Sign in session

      }, 500)
      return false;
    }
    else
      return true;
  }

  MyList() {
    if (this.action=="briefcase")
    {
      if (this.isAuthenticated())
      {
        this.backupTehillim=this.tehellims //create backup
        this.tehellims=this.backupMyTehillim
        this.action = "long-arrow-left"   //put the back icon
        this.tableHeader="Remove from"
      }
        
    }
    else
    {
      this.tehellims=this.backupTehillim  //restore the original data
       this.action="briefcase"                 //restore the original icon 
       this.tableHeader="Add to"
    }

  }

  GetType(id:number)
  {
     if(this.backupMyTehillim.find(i=>i.ID==id))
     {
       return "fa fa-minus" 
     }
     else
     return  "ico-plus"
  }

  ngOnInit() {
    this.ReadCountry();

    let self = this;

    $('#field-3').change(function () {   //country

      var id = parseInt($(this).val().split(":")[1]) //id
      // self.countryRaw=$(this).val();


      self.selectedCountry = id;
      self.ReadComunity(id)


    });

    $('#field-2').change(function () {   //comunities

      var id = parseInt($(this).val().split(":")[1]) //id
      //self.comunityRaw=$(this).val();



      self.selectedComunity = id;
      self.ReadCategory(id)


    });

    $('#field-1').change(function () {   //categories

      var id = parseInt($(this).val().split(":")[1]) //id
      //self.comunityRaw=$(this).val();



      self.selectedCategory = id;
      self.ReadTehillim()


    });

    if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "") //at the begining we check if we are signed to load the favorites
    {
        this.ReadMyTehillim();
    }
  }

  ReadCountry() {
    let self = this;
    this.tehillimService.readCountry().subscribe(
      function (response) {

        self.countries = response;

        self.selectedCountry = response[0].id;

        self.ReadComunity(self.selectedCountry);

      }, function (error) { }, function () { }
    )
  }

  ReadComunity(idCountry: number) {
    let self = this;
    this.tehillimService.readComunity(idCountry).subscribe(
      function (response) {
        self.comunities = response;
        self.selectedComunity = response[0].id;
        self.ReadCategory(response[0].id);

      }, function (error) { }, function () { }
    )
  }

  ReadCategory(idComunity: number) {
    let self = this;
    this.tehillimService.readCategory(idComunity).subscribe(
      function (response) {

        if (response.length <= 0) //if doesn't exist related communities
        {
          self.categories = [];
          self.tehellims = [];

        }
        else {
          self.categories = response;
          self.selectedCategory = response[0].id;
          self.ReadTehillim();
        }


      }, function (error) { }, function () { }
    )
  }

  ReadTehillim() {
    this.action="spinner fa-pulse fa-fw"
    let self = this;
    this.tehillimService.readTehillim(self.selectedComunity, self.selectedCategory).subscribe(
      function (response) {
        self.tehellims = response;
        self.action="briefcase"
      }, function (error) { }, function () { }
    )
  }

  ReadMyTehillim() {

    let self = this;
    this.tehillimService.readMyTehillim().subscribe(
      function (response) {
        
        self.backupMyTehillim=response      //make backup for my favorites
        
      }, function (error) { }, function () { }
    )
  }

  Print() {
    $('.table-body').print();
  }

  Manage(id:number)
  {
     var index=  this.backupMyTehillim.findIndex(i=>i.ID==id)
    if(index>=0) //if is on the list then remove
    {
        this.backupMyTehillim.splice(index, 1)
    }
    else  //add
    {
      this.backupMyTehillim.push(this.tehellims.filter(i=>i.ID==id)[0])
    }
  }

}
