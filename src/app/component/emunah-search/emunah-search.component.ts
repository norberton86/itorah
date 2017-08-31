import { Component, OnInit,Renderer2 ,NgZone} from '@angular/core';
import { EmunahService } from '../../service/emunah.service';
import { PlayerService } from '../../service/player.service';
import { QueueService } from '../../service/queue.service';
import { Shiurim,ItemQueue } from '../../model/shiurim';
import { Page } from '../../model/page';
declare var $:any; 
@Component({
  selector: 'app-emunah-search',
  templateUrl: './emunah-search.component.html',
  styleUrls: ['./emunah-search.component.css'],
  providers:[EmunahService,PlayerService]
})
export class EmunahSearchComponent implements OnInit {

  allShiriums:Array<Shiurim>;
  shiriums:Array<Shiurim>;
  query_main:string='';

  amount:number;

  pages:Array<Page>;
  allPages:number;
  iteration:number;

  valor:string=""

  
 

  constructor(private emunahService:EmunahService,private playerService:PlayerService,private renderer:Renderer2,private ngZone:NgZone,private queueService:QueueService)
  {
      this.allShiriums=[];
      this.shiriums=[];

      this.pages=[];
  }




  keyDownEmunahFunction(event)
  {
    this.Search()
  }

  
searchShiriumEmunah()
{
  this.Search()
}

PagingPrev()
{
  this.iteration--;
              if(this.iteration<=0)
              {
                   this.iteration=1;
              }
              else
              this.CreatePages();
}

PagingNext()
{
   this.iteration++;
              if(this.iteration>Math.ceil(this.allPages/6) )
              {
                this.iteration=Math.ceil(this.allPages/6);
              }
              else
              this.CreatePages();
}

Page(id:number)
{

              this.pages.forEach(function(p){

                 if(p.id!=id)
                 p.current=false;
                 else
                 p.current=true;
              })

              this.PopulatedShirium(id);
             
}

PLayEmunah(id:string,title:string)
{
  var onlyAudio=title.includes('LT-Audio');
  this.playerService.Play(title,id,onlyAudio);   
}

  ngOnInit() {
    this.ReadLectures();
  
  }

Search()
{
  
             
             if(localStorage.getItem("shirium")!=null ||localStorage.getItem("shirium")!='')
             {
               this.allShiriums=JSON.parse(localStorage.getItem("shirium"));  //recover the originals
             }

             this.Update();   
}

  ReadLectures()
  {
    let self=this;
      this.emunahService.read().subscribe(
           function(respond){

             
              self.allShiriums=respond;

              localStorage.setItem("shirium",JSON.stringify(respond));

              self.Update();  
           },
           function(error){},
           function(){}
       )
   
  }

  Update()
  {

      if(this.query_main!="")
      {
        var query= this.query_main;
         this.allShiriums= this.allShiriums.filter(function (s) {
            return s.title.toLowerCase().includes(query.toLowerCase());
         });
      }
      
        this.amount=this.allShiriums.length; 

        this.allPages=this.allShiriums.length/9; //pagination
        this.iteration=1; //pagination

       this.CreatePages();

  }

  CreatePages()
  {
       this.pages=[];

        for(var i=this.iteration*6-6;i<this.iteration*6 && i<this.allPages;i++) //populate the pages array
        {
          if(i==(this.iteration-1)*6)
          {
              this.pages.push({id:i+1,current:true});
              this.PopulatedShirium(i+1);  //the page            
          } 
          else
          this.pages.push({id:i+1,current:false});
        }    

  }

  PopulatedShirium(id:number)
  {
       this.shiriums=[];
       for(var i=id*9-9;i<id*9 && i<this.allShiriums.length;i++)
       {
           this.shiriums.push(this.allShiriums[i]);  //populate the grid
       }
       
  }


 

  Add(id:string)
  {
               var  myShirium=new Shiurim();
               myShirium=this.shiriums.filter(function (s) {
               return s.id==id;
              })[0];
     
              this.queueService.setItem(myShirium,"Rabbi Eli J Mansour");      
  }

}
