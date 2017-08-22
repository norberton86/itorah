import { Component, OnInit,NgZone,Renderer2} from '@angular/core';

import { Perasha } from '../../model/perasha';
import { PerashaService } from '../../service/perasha.service';
import { PlayerService } from '../../service/player.service';

declare var $:any; 

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  providers:[PerashaService,PlayerService]
})
export class WeeklyComponent implements OnInit {

  perashas:Array<Perasha>;
  selectedPerasha:Perasha=null;
  clipTitle:string;
  parragraphs:Array<string>;

  last:Perasha
  more:boolean=false;
  
  constructor(private renderer:Renderer2,private perashaService:PerashaService,private ngZone:NgZone,private playerService:PlayerService) {
    this.perashas=[];
    this.parragraphs=[];

    this.last=new Perasha()
    this.last.id=999
    this.last.parashaName="More..."
    
    this.selectedPerasha=this.last

   }

  ngOnInit() {
    this.ReadParasha();
  }


  ReadParasha() 
 {       
       let self=this;
       this.perashaService.read().subscribe(
           function(response){
              self.perashas=response;    

              //add the last element
              self.perashas.push(self.last);              

              self.selectedPerasha= response[0];
              self.parragraphs=response[0].emailText.split("\n").filter(function (s) {
               return s!="";
              });

           },function(error){},function(){}
       )

 }

 filterChanged(value)
 {
          if(value=="More...")
          {
                 this.more=true;
          }
          else
          {
                  this.more=false;

                  this.selectedPerasha=this.perashas.filter(function(s){ //select by name
                      return s.parashaName==value
                  })[0] 

                  this.parragraphs=this.selectedPerasha.emailText.split("\n").filter(function (s) {
                     return s!="";
                  });       
          }
 }

  Print()
  {
    $('#print').print(); 
  }

  Play()
  {
     
   this.playerService.Play("Lana","",true);
    
  }
}
