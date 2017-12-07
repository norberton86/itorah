import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../service/classe.service';
import { PlayerService } from '../../service/player.service';
import { Classes } from '../../model/classes';
import { Page } from '../../model/page';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  providers:[ClasseService,PlayerService]
})
export class ClassesComponent implements OnInit {

  allClasses:Array<Classes>;
  classesS:Array<Classes>;
  

  amount:number;

  pages:Array<Page>;
  allPages:number;
  iteration:number;

  asc:boolean=false;

  constructor(private classeService:ClasseService,private playerService:PlayerService) {
      this.allClasses=[];
      this.classesS=[];
      this.pages=[];
   }

  ngOnInit() {
    this.Read();
  }

  Read()
  {
    let self=this;
      this.classeService.read().subscribe(
           function(respond){

             
              self.allClasses=respond;

             

              self.Update();  
           },
           function(error){},
           function(){}
       )
   
  }

  Update()
  {

        this.amount=this.allClasses.length; 

        this.allPages=this.allClasses.length/9; //pagination
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
       this.classesS=[];
       for(var i=id*9-9;i<id*9 && i<this.allClasses.length;i++)
       {
           this.classesS.push(this.allClasses[i]);  //populate the grid
       }
       
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

  
  Play(title: string, media: string) {
      this.playerService.PlayAudio(title, media,"")
  }

 Desc(a,b) {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }

  Asc(a,b) {
    if (a.date > b.date)
      return -1;
    if (a.date < b.date)
      return 1;
    return 0;
  }

 Sort(col)
 {   
     this.asc=!this.asc;  
     if(this.asc)
     col=col.sort(this.Asc)
     else
     col=col.sort(this.Desc)

     this.Update()
 }

}
