import { Component, OnInit,NgZone,Renderer2} from '@angular/core';

import { Perasha } from '../../model/perasha';
import { PerashaService } from '../../service/perasha.service';

declare var $:any; 

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  providers:[PerashaService]
})
export class WeeklyComponent implements OnInit {

  perashas:Array<Perasha>;
  selectedPerasha:Perasha=null;
  clipTitle:string;
  parragraphs:Array<string>;

  constructor(private renderer:Renderer2,private perashaService:PerashaService,private ngZone:NgZone) {
    this.perashas=[];
    this.parragraphs=[];
    
   }

  ngOnInit() {
    this.ReadParasha();
    this.Initialize();
  }


  ReadParasha() 
 {       
       let self=this;
       this.perashaService.read().subscribe(
           function(response){
              self.perashas=response;    
              self.selectedPerasha= response[0];
              self.parragraphs=response[0].emailText.split("\n").filter(function (s) {
               return s!="";
              });

           },function(error){},function(){}
       )

 }

  Initialize()
  {
     let self=this;
     $('#field-6').change(function(){   //date combo

          //$(this).val()
        
     })

     
     $('#field-7').change(function(){   //title combo

          var comboValue= $(this).val()

           self.ngZone.run(()=>{

                  self.selectedPerasha=self.perashas[comboValue.split(":")[0]]  // select per position
                  self.parragraphs=self.selectedPerasha.emailText.split("\n").filter(function (s) {
                     return s!="";
                  });
                  self.RefreshView();
          })
     })
     

    this.Print();
     
     $('#weekly-play').click(function(){
          
     })

  }

  RefreshView()
  {
     let self=this;
     setTimeout(function(){ 
         $('#ballon .tile-box-body').html($('app-weekly .tile-box-body').html()); //Refresh the view
         self.Print();
         
     },300)
      
    
  }

  Print()
  {
    $('#weekly-print').click(function(){
            //$('#print').print({stylesheet: 'dist/css/print.css'});
            $('#print').print(); 
     })

  }

}
