import { Component, OnInit } from '@angular/core';

import { Speaker } from '../../model/speaker';
import { Shiurim } from '../../model/shiurim';
import { Page } from '../../model/page';
import { SpeakerService } from '../../service/speaker.service';
import { ShiurimService } from '../../service/shiurim.service';

import { Injectable, Renderer2 } from '@angular/core'

declare var $:any; 

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css'],
  providers:[SpeakerService,ShiurimService]
})
export class SpeakerComponent implements OnInit {

  allSpeakers:Array<Speaker>;
  currentSpeakers:Array<Speaker>;
  speaker:Speaker;

  allShiriums:Array<Shiurim>;
  shiriums:Array<Shiurim>;
  
  pages:Array<Page>;
  allPages:number;
  iteration:number;
  allIteration:number;

  constructor( private renderer:Renderer2,private speakerService:SpeakerService,private shiurimService:ShiurimService) {
      this.allSpeakers=[];
      this.speaker=new Speaker();

      this.allShiriums=[];
      this.shiriums=[];

      this.pages=[];
   }

  ngOnInit() {
    this.ReadSpeaker();
  }
  
  ReadSpeaker() {

       this.speakerService.read().subscribe(
           result=>this.InitializeSpeakers(result)
       )

   }

   InitializeSpeakers(data:Array<Speaker>)
   {
      this.allSpeakers=data;
      this.currentSpeakers=data;
      /*this.mainSpeakers=data.filter(function (s) {
            return s.isMainSpeaker;
      });*/   
      this.speaker=data[0];
      this.ReadLectures(data[0].id); 

      this.renderer.listen('document', 'click', (event) => {
         
         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="search-shirium") //click on search
         {
               $($('.main-search-nor')[0]).val()
         }

         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="lecture") //click on speaker
         {
             var id=event.currentTarget.activeElement.attributes["id"].value;
             
           
              this.speaker=this.currentSpeakers.filter(function (s) {
                 return s.id==id;
               })[0];

              this.ReadLectures(id); 

           
         }

         if(event.currentTarget.activeElement.attributes["class"]!=null && event.currentTarget.activeElement.attributes["class"].value=="paging-prev") //click on paging-prev 
         {
              this.iteration--;
              if(this.iteration<=0)
              {
                   this.iteration=1;
              }
              else
              this.CreatePages();
         }

         if(event.currentTarget.activeElement.attributes["class"]!=null && event.currentTarget.activeElement.attributes["class"].value=="paging-next") //click on paging-next
         {
              this.iteration++;
              if(this.iteration>this.allPages/6 )
              {
                this.iteration=Math.floor(this.allPages);
              }
              else
              this.CreatePages();
         }

         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="page") //click on page
         {
              var id=event.currentTarget.activeElement.attributes["id"].value;
              this.pages.forEach(function(p){

                 if(p.id!=id)
                 p.current=false;
                 else
                 p.current=true;
              })

              this.PopulatedShirium(id);
              this.RefreshView();
         }
            
      });
  }

  ReadLectures(idSpeaker:number)
  {
      this.shiurimService.read(idSpeaker).subscribe(
           result=>this.Update(result)
       )
   
  }

  Update(data:Array<Shiurim>)
  {
        data.forEach(function(a){  //remove the seconds en length property
          a['length']=a['length'].split(':')[0]
          a['language']=a['language'][0]+a['language'][1]
        })

        this.allShiriums=data;

        this.allPages=this.allShiriums.length/12;
        this.iteration=1;

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

        this.RefreshView();  
  }

  PopulatedShirium(id:number)
  {
       this.shiriums=[];
       for(var i=id*12-12;i<id*12 && i<this.allShiriums.length;i++)
       {
           this.shiriums.push(this.allShiriums[i]);  //populate the grid
       }
       
  }
  
  RefreshView()
  {
      setTimeout(function(){ 
               $('#ballon .tile-box-tab').html($('app-speaker .current').html());
      },100) 

  }


}
