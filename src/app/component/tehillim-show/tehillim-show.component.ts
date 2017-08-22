import { Component, OnInit,NgZone} from '@angular/core';
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
   //countryRaw:string;

   selectedComunity:number;
   comunities:Array<Comunity>;
   //comunityRaw:string;

   selectedCategory:number;
   categories:Array<Category>;

   tehellims:Array<Tehillim>

 

  constructor(private ngZone:NgZone,private tehillimService:TehillimService) { 
    this.countries=[];
    this.comunities=[];
    this.categories=[];
    this.tehellims=[];
  }


  ngOnInit() {
    this.ReadCountry();

    let self= this;  

     $('#field-3').change(function(){   //country

            var id= parseInt($(this).val().split(":")[1]) //id
           // self.countryRaw=$(this).val();


                       self.selectedCountry=id;
                       self.ReadComunity(id)        


            });

            $('#field-2').change(function(){   //comunities

            var id= parseInt($(this).val().split(":")[1]) //id
            //self.comunityRaw=$(this).val();

            
                      
                       self.selectedComunity=id;
                       self.ReadCategory(id)        

                    
            });

            $('#field-1').change(function(){   //categories

            var id= parseInt($(this).val().split(":")[1]) //id
            //self.comunityRaw=$(this).val();

       
                      
                       self.selectedCategory=id;
                       self.ReadTehillim()        

                
            });
  }

  ReadCountry()
  {
        let self=this;
        this.tehillimService.readCountry().subscribe(
                   function(response){
                       
                       self.countries=response;
                       
                       self.selectedCountry=response[0].id;
                       
                       self.ReadComunity(self.selectedCountry);

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

                       if(response.length<=0) //if doesn't exist related communities
                       {
                         self.categories=[];
                         self.tehellims=[];
                        
                       }
                       else
                       {
                          self.categories=response;
                          self.selectedCategory=response[0].id;
                          self.ReadTehillim();
                       }
                       

                   },function(error){},function(){}
                   )
  }

  ReadTehillim()
  {
        let self=this;
        this.tehillimService.readTehillim(self.selectedComunity,self.selectedCategory).subscribe(
                   function(response){
                       self.tehellims=response;
                     

                   },function(error){},function(){}
                   )
  }


}
