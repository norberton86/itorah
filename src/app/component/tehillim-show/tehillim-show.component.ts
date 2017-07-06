import { Component, OnInit,NgZone, Renderer2,ElementRef } from '@angular/core';
import { TehillimService } from '../../service/tehillim.service';
import { Tehillim,Country,Category,Comunity } from '../../model/Tehillim/tehillim';

declare var $:any; 
@Component({
  selector: 'app-tehillim-show',
  templateUrl: './tehillim-show.component.html',
  styleUrls: ['./tehillim-show.component.css'],
  providers:[TehillimService]
})
export class TehillimShowComponent implements OnInit {
   
   selectedCountry:number;
   countries:Array<Country>;

   selectedComunity:number;
   comunities:Array<Comunity>;

   selectedCategory:number;
   categories:Array<Category>;

   tehellims:Array<Tehillim>

  constructor(private renderer:Renderer2,private elementRef: ElementRef,private ngZone:NgZone,private tehillimService:TehillimService) { 
    this.countries=[];
    this.comunities=[];
    this.categories=[];
    this.tehellims=[];
  }

  ngOnInit() {
    this.Initialize();
    this.ReadCountry();

  }

  Initialize()
  {
    let self=this;

    $('#field-1').change(function(){   //all

          $(this).val()
          self.RefreshView();
          
    });

    $('#field-2').change(function(){   //currently showing

          $(this).val()
          self.RefreshView();
          
    });

    $('#field-3').change(function(){   //country

          $(this).val()
          self.RefreshView();
          
    });

    

  }


  ReadCountry()
  {
        let self=this;
        this.tehillimService.readCountry().subscribe(
                   function(response){
                       self.countries=response;
                       self.selectedCountry=response[0].id;
                       self.ReadComunity(response[0].id);

                   },function(error){},function(){}
                   )
  }

  
  ReadComunity(idCountry:number)
  {
        let self=this;
        this.tehillimService.readComunity(idCountry).subscribe(
                   function(response){
                       self.comunities=response;
                       self.selectedComunity=response[0].id;
                       self.ReadCategory(response[0].id);

                   },function(error){},function(){}
                   )
  }

  ReadCategory(idComunity:number)
  {
        let self=this;
        this.tehillimService.readCategory(idComunity).subscribe(
                   function(response){
                       self.categories=response;
                       self.selectedCategory=response[0].id;
                       self.ReadTehillim();

                   },function(error){},function(){}
                   )
  }

  ReadTehillim()
  {
        let self=this;
        this.tehillimService.readTehillim(self.selectedComunity,self.selectedCountry).subscribe(
                   function(response){
                       self.tehellims=response;

                   },function(error){},function(){}
                   )
  }


  RefreshView()
  {
       setTimeout(function(){ 

          $('#ballon').html($('#item-content-3').html());

      },500) 
  }

}
