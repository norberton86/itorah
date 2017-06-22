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
         
         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="lecture")
         {
             var id=event.currentTarget.activeElement.attributes["id"].value;
             
           
              this.speaker=this.currentSpeakers.filter(function (s) {
                 return s.id==id;
               })[0];

              this.ReadLectures(id); 

           
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

        this.pages=[];

        for(var i=0;i<=data.length/12;i++) //populate the pages array
        {
          if(i==0)
          {
              this.pages.push({id:i+1,current:true});
              this.PopulatedShirium(1);            
          } 
          else
          this.pages.push({id:i+1,current:false});
        }    

        this.RefreshView();  

  }

  PopulatedShirium(id:number)
  {
       this.shiriums=[];
       for(var i=1;i<=12;i++)
       {
           this.shiriums.push(this.allShiriums[i*id]);
       }
       
  }
  
  RefreshView()
  {
      setTimeout(function(){ 
               $('#ballon .tile-box-tab').html($('app-speaker .current').html());
        },100) 

  }

}
