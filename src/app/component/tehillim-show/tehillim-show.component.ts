import { Component, OnInit,NgZone,OnChanges,Input} from '@angular/core';
import { TehillimService } from '../../service/tehillim.service';
import { Tehillim,Country,Category,Comunity } from '../../model/Tehillim/tehillim';

declare var $:any; 
@Component({
  selector: 'app-tehillim-show',
  templateUrl: './tehillim-show.component.html',
  styleUrls: ['./tehillim-show.component.css'],
  providers:[TehillimService]
})
export class TehillimShowComponent implements OnInit,OnChanges {
   
   selectedCountry:number;
   countries:Array<Country>;
   //countryRaw:string;

   selectedComunity:number;
   comunities:Array<Comunity>;
   //comunityRaw:string;

   selectedCategory:number;
   categories:Array<Category>;

   tehellims:Array<Tehillim>

   @Input()
   accion:string="";
   rendering:boolean=false;

  constructor(private ngZone:NgZone,private tehillimService:TehillimService) { 
    this.countries=[];
    this.comunities=[];
    this.categories=[];
    this.tehellims=[];
  }


  ngOnChanges(changes:any) {
     if(changes.accion!=null&&!changes.accion.firstChange)
     {
       this.rendering=true;   
       this.RefreshView();
     }
      
  }
  

  ngOnInit() {
    this.ReadCountry();

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
                         self.RefreshView();
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
                       self.RefreshView();

                   },function(error){},function(){}
                   )
  }


  RefreshView()
  {

    if(!this.rendering)  //the first time don't renderize
        return;

    let self=this;

       setTimeout(function(){ 

          $('#ballon').html($('#item-content-3').html());
          $('#field-3').val($('#item-content-3 #field-3').val())
          $('#field-2').val($('#item-content-3 #field-2').val())
          $('#field-1').val($('#item-content-3 #field-1').val())


          $('#field-3').change(function(){   //country

            var id= parseInt($(this).val().split(":")[1]) //id
           // self.countryRaw=$(this).val();

            self.ngZone.run(()=>{
                      
                       self.selectedCountry=id;
                       self.ReadComunity(id)        

                    })
            });

            $('#field-2').change(function(){   //comunities

            var id= parseInt($(this).val().split(":")[1]) //id
            //self.comunityRaw=$(this).val();

            self.ngZone.run(()=>{
                      
                       self.selectedComunity=id;
                       self.ReadCategory(id)        

                    })
            });

            $('#field-1').change(function(){   //categories

            var id= parseInt($(this).val().split(":")[1]) //id
            //self.comunityRaw=$(this).val();

            self.ngZone.run(()=>{
                      
                       self.selectedCategory=id;
                       self.ReadTehillim()        

                    })
            });

      },500) 
  }

}
