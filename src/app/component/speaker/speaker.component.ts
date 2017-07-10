import { Component, OnInit,NgZone } from '@angular/core';

import { Speaker } from '../../model/speaker';
import { Shiurim } from '../../model/shiurim';
import { Page } from '../../model/page';
import { Letter } from '../../model/letter';
import { SpeakerService } from '../../service/speaker.service';
import { ShiurimService } from '../../service/shiurim.service';
import { PlayerService } from '../../service/player.service';

import { Injectable, Renderer2,ElementRef } from '@angular/core'

declare var $:any; 
declare var jwplayer:any;

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css'],
  providers:[SpeakerService,ShiurimService,PlayerService]
})
export class SpeakerComponent implements OnInit {

  allSpeakers:Array<Speaker>;
  currentSpeakers:Array<Speaker>;
  speaker:Speaker;



  allShiriums:Array<Shiurim>;
  shiriums:Array<Shiurim>;

  query_main:string='';
  
  pages:Array<Page>;
  allPages:number;
  iteration:number;
  allIteration:number;


//############################################### All Speakers #######################################################
  speakers:Array<Speaker>;  //list in UI

  query_all:string='';     //query in All
  
  pagesAll:Array<Page>;
  allPagesAll:number;
  iterationAll:number;
  allIterationAll:number;

  letters:Array<Letter>=[{letter:"A",current:true,disable:false},
                         {letter:"B",current:false,disable:false},
                         {letter:"C",current:false,disable:false},
                         {letter:"D",current:false,disable:false},
                         {letter:"E",current:false,disable:false},
                         {letter:"F",current:false,disable:false},
                         {letter:"G",current:false,disable:false},
                         {letter:"H",current:false,disable:false},
                         {letter:"I",current:false,disable:false},
                         {letter:"J",current:false,disable:false},
                         {letter:"K",current:false,disable:false},
                         {letter:"L",current:false,disable:false},
                         {letter:"M",current:false,disable:false},
                         {letter:"N",current:false,disable:false},
                         {letter:"O",current:false,disable:false},
                         {letter:"P",current:false,disable:false},
                         {letter:"Q",current:false,disable:false},
                         {letter:"R",current:false,disable:false},
                         {letter:"S",current:false,disable:false},
                         {letter:"T",current:false,disable:false},
                         {letter:"U",current:false,disable:false},
                         {letter:"V",current:false,disable:false},
                         {letter:"W",current:false,disable:false},
                         {letter:"X",current:false,disable:false},
                         {letter:"Y",current:false,disable:false},
                         {letter:"Z",current:false,disable:false}]; 



  constructor( private renderer:Renderer2,private speakerService:SpeakerService,private shiurimService:ShiurimService,private elementRef: ElementRef,private ngZone:NgZone,private playerService:PlayerService) {
      this.allSpeakers=[];
      this.speaker=new Speaker();
      this.currentSpeakers=[];

      this.allShiriums=[];
      this.shiriums=[];

      this.pages=[];
 //####################################################################################################################
      
      this.speakers=[];
      this.pagesAll=[];
      
   }

  ngOnInit() {
    this.ReadMainSpeaker();
    this.ReadAllSpeaker();

    let self=this;
     $('#field-8').change(function(){   //combo (main,my,all)

          if($(this).val()=='#tile-tab-2') //if is 'my'
          {
                self.speakerService.readMy().subscribe(
                    function(response){
                          self.InitializeMySlide(response);
                          self.ngZone.run(()=>{

                            self.speaker=response[0];
                            self.ReadLectures(response[0].id);

                          })
                    },
                    function(error){

                    },function()
                    {

                    });
          }
          else
          {
            if(localStorage.getItem("mainSpeakers")!=null ||localStorage.getItem("mainSpeakers")!='')
             {
               self.InitializeMySlide(JSON.parse(localStorage.getItem("mainSpeakers")));  //set the slide with "main"
             }

             if($(this).val()=='#tile-tab-1')  //if is "main"
             { 
               self.ngZone.run(()=>{
                     self.speaker=JSON.parse(localStorage.getItem("mainSpeakers"))[0]; //set the first                         
                     self.ReadLectures(JSON.parse(localStorage.getItem("mainSpeakers"))[0].id); //get the lectures for the first

               })
             }
             else  //if is all
             {
               self.ngZone.run(()=>{

                     self.RefreshViewAll(); 

               })
               
             }
            
          }
        
     })

      this.renderer.listen('document','click',(event)=>{

        
         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="all-search-shirium") //click on all search
         {
             this.query_all=$($('.all-search-nor')[0]).val();  //update the query field in my component (remenber double data binding)
             
             if(localStorage.getItem("allSpeakers")!=null ||localStorage.getItem("allSpeakers")!='')
             {
               this.allSpeakers=JSON.parse(localStorage.getItem("allSpeakers"));  //recover the originals
             }

             this.UpdateAll();               
         }
         
         if(event.currentTarget.activeElement.attributes["class"]!=null && event.currentTarget.activeElement.attributes["class"].value=="paging-prev-all") //click on paging-prev-all 
         {
              this.iterationAll--;
              if(this.iterationAll<=0)
              {
                   this.iterationAll=1;
              }
              else
              this.CreatePagesAll();
         }

         if(event.currentTarget.activeElement.attributes["class"]!=null && event.currentTarget.activeElement.attributes["class"].value=="paging-next-all") //click on paging-next-all
         {
              this.iterationAll++;
              if(this.iterationAll>Math.ceil(this.allPagesAll/6) )
              {
                this.iterationAll=Math.ceil(this.allPagesAll/6);
              }
              else
              this.CreatePagesAll();
         }

         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="page-All") //click on page-all
         {
              var id=event.currentTarget.activeElement.attributes["id"].value;
              this.pagesAll.forEach(function(p){

                 if(p.id!=id)
                 p.current=false;
                 else
                 p.current=true;
              })

              this.PopulatedShiriumAll(id);
              this.RefreshViewAll();
         }
        
         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="letter") //click on main search
         {
                 this.letters.forEach(function(l){
                       if(l.letter==event.currentTarget.activeElement.attributes["id"].value)
                       l.current=true;
                       else
                       l.current=false;
                 });


                 // find the first ocurrence of the letter

                 for(var i=0;i<this.allSpeakers.length;i++)
                 {
                        if(this.allSpeakers[i].lastName[0]==event.currentTarget.activeElement.attributes["id"].value)
                        {
                                
                
                                var page;
                                if(i==0)
                                page =  Math.ceil (1/9);
                                else
                                page =  Math.ceil (i/9);

                                this.iterationAll=  Math.ceil(page/6);

                                this.CreatePagesAllLetter(page);
                                break;
                        }
                 }

                 

         }

        if(event.currentTarget.activeElement.attributes["class"]!=null && event.currentTarget.activeElement.attributes["class"].value=="link-star") //click on start to deactivate
         {
                let self=this;
                var id=event.currentTarget.activeElement.attributes["id"].value;
                this.speakerService.deactivateSpeaker(id).subscribe(
                   function(response){
                      self.speakers.forEach(function(s){
                          if(s.id==id)
                                s.isMySpeaker=false;
                      })   
                   },function(error){},function(){}
                )

         }

         if(event.currentTarget.activeElement.attributes["class"]!=null && event.currentTarget.activeElement.attributes["class"].value=="link-star link-star-active") //click on start to activate
         {
                let self=this;
                var id=event.currentTarget.activeElement.attributes["id"].value;
                this.speakerService.activateSpeaker(id).subscribe(
                   function(response){
                      self.speakers.forEach(function(s){
                          if(s.id==id)
                                s.isMySpeaker=true;
                      })   
                   },function(error){},function(){}
                )
         }

      });

      this.renderer.listen('document', 'click', (event) => {
      

         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="search-shirium") //click on main search
         {
             this.query_main=$($('.main-search-nor')[0]).val();  //update the query field in my component (remenber double data binding)
             
             if(localStorage.getItem("shirium")!=null ||localStorage.getItem("shirium")!='')
             {
               this.allShiriums=JSON.parse(localStorage.getItem("shirium"));  //recover the originals
             }

             this.Update();   
               
         }

         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="lecture") //click on speaker
         {
             var id=event.currentTarget.activeElement.attributes["id"].value;

             
              this.query_main="";
           
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
              if(this.iteration>Math.ceil(this.allPages/6) )
              {
                this.iteration=Math.ceil(this.allPages/6);
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

        if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="media") //click on mnedia icons
         {
              var id=event.currentTarget.activeElement.attributes["id"].value;
              var title=event.currentTarget.activeElement.attributes["title"].value;
               
              this.playerService.Play(title,id);   
         }

      });

  }


 InitializeMySlide(data:Array<Speaker>)
 {    this.currentSpeakers=data;
      this.RefreshSlide(data);
 }
 
 RefreshSlide(data:Array<Speaker>)
 {

    var content='<div class="slider-clip">'+
						     '<ul class="slides">';

    data.forEach(function(a){

      var image=a.picUrl!=''? '<img  src="'+a.picUrl+'" alt="">':''

			content+= '<li  class="slider-slide"   data-type="lecture" id="'+a.id+'"  >'+
			    					'<div class="slider-inner" >'+
					    				'<div class="slider-avatar">'+ 
							       		image+
								      '</div><!-- /.slider-avatar -->'+
									
									    '<div class="slider-content">'+  
										   '<h5>'+a.title+' '+a.firstName+' '+a.lastName+'</h5>'+	
									     '<p>'+a.totalShiurim+'  Shiurim</p>'+
									   '</div><!-- /.slider-content -->'+
							      '</div><!-- /.slider-inner -->'+
							   '</li>'
    });
    content+=	 '</ul>'+
              '</div>';


    $('#ballon .slider-profiles').html(content);

    $('#ballon .slider-profiles .slides').slick({
		       dots: false,
		       arrows: true,
		       slidesToShow: 6,
			   slidesToScroll: 1,
			   responsive: [
			      {
			        breakpoint: 1624,
			        settings: {
			          slidesToShow: 5
			        }
			      },
			      {
			        breakpoint: 1424,
			        settings: {
			          slidesToShow: 4,
			        }
			      },
			      {
			        breakpoint: 1224,
			        settings: {
			          slidesToShow: 3
			        }
			      },
			      {
			        breakpoint: 1024,
			        settings: {
			          slidesToShow: 2
			        }
			      },
			      {
			        breakpoint: 678,
			        settings: {
			          slidesToShow: 1
			        }
			      }]
			});
 
   
 }


 //-------------------------------------------------------------------------------------------------------------------------
  ReadAllSpeaker() 
  {

       this.speakerService.read().subscribe(
           result=>this.InitializeAllSpeakers(result)
       )

  }
  
  InitializeAllSpeakers(data:Array<Speaker>)
  {
      this.letters.forEach(function(l){
           
           l.disable=false;  //first reset

          if( data.filter(function (s) {
            return s.lastName[0]==l.letter;
         }).length==0)
         {
            l.disable=true;
         }
      });

      this.allSpeakers=data;
      localStorage.setItem("allSpeakers",JSON.stringify(this.allSpeakers));     //save the originals
      this.UpdateAll();
  }

  UpdateAll()
  {
      if(this.query_all!="")  //if exist some filter
      {
           var query= this.query_all;
           this.allSpeakers= this.allSpeakers.filter(function (s) {
            return s.lastName.includes(query)||s.firstName.includes(query);
         });
      }

     this.allPagesAll=this.allSpeakers.length/9;
     this.iterationAll=1;

     this.CreatePagesAll();
  } 

  UpdateByLetterAll()
  {
   
  }
  
  CreatePagesAll()
  {
       this.pagesAll=[];

        for(var i=this.iterationAll*6-6;i<this.iterationAll*6 && i<this.allPagesAll;i++) //populate the pages array
        {
          if(i==(this.iterationAll-1)*6)
          {
              this.pagesAll.push({id:i+1,current:true});
              this.PopulatedShiriumAll(i+1);  //the page            
          } 
          else
          this.pagesAll.push({id:i+1,current:false});
        }    

        this.RefreshViewAll();  
  }

  CreatePagesAllLetter(page:number)
  {
       this.pagesAll=[];

        for(var i=this.iterationAll*6-6;i<this.iterationAll*6 && i<this.allPagesAll;i++) //populate the pages array
        {
          if(i==(page-1))
          {
              this.pagesAll.push({id:i+1,current:true});
              this.PopulatedShiriumAll(i+1);  //the page            
          } 
          else
          this.pagesAll.push({id:i+1,current:false});
        }    

        this.RefreshViewAll();  
  }

  PopulatedShiriumAll(id:number)
  {
       this.speakers=[];
       for(var i=id*9-9;i<id*9 && i<this.allSpeakers.length;i++)
       {
           this.speakers.push(this.allSpeakers[i]);  //populate the grid
       }
       
  }

  RefreshViewAll()
  {
      var query=this.query_all;
      setTimeout(function(){ 

              $('#ballon .current').html($('app-speaker #tile-tab-3').html());
              $($('.all-search-nor')[0]).val(query);
      },500) 

  }

  //---------------------------------------------------------------------------------------------------------------------- 

 ReadMainSpeaker() 
 {

       this.speakerService.readMain().subscribe(
           result=>this.InitializeMainSpeakers(result)
       )

 }

  InitializeMainSpeakers(data:Array<Speaker>)
  {
      this.currentSpeakers=data;

      localStorage.setItem("mainSpeakers",JSON.stringify(data));  

      this.speaker=data[0];
      this.ReadLectures(data[0].id); 
  }

  ReadLectures(idSpeaker:number)
  {
    let self=this;
      this.shiurimService.read(idSpeaker).subscribe(
           function(respond){

              respond.forEach(function(a){  //remove the seconds en length property
                a['length']=a['length'].split(':')[0]
                a['language']=a['language'][0]+a['language'][1]
              });

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
            return s.title.includes(query);
         });
      }
      
        this.speaker.totalShiurim=this.allShiriums.length; 

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

        this.RefreshView();  
  }

  PopulatedShirium(id:number)
  {
       this.shiriums=[];
       for(var i=id*9-9;i<id*9 && i<this.allShiriums.length;i++)
       {
           this.shiriums.push(this.allShiriums[i]);  //populate the grid
       }
       
  }
  
  RefreshView()
  {
      var query=this.query_main;
      setTimeout(function(){ 

          $('#ballon .current').html($('app-speaker #tile-tab-1').html());
          $($('.main-search-nor')[0]).val(query);

      },500) 

  }

  //---------------------------------------------------------------------------------------------------------------------- 


}
