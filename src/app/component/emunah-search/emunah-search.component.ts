import { Component, OnInit,Renderer2,OnChanges,Input ,NgZone} from '@angular/core';
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
export class EmunahSearchComponent implements OnInit,OnChanges {

  allShiriums:Array<Shiurim>;
  shiriums:Array<Shiurim>;
  query_main:string='';

  amount:number;

  pages:Array<Page>;
  allPages:number;
  iteration:number;

  valor:string=""

  
   @Input()
   accion:string="";
   rendering:boolean=false;

  constructor(private emunahService:EmunahService,private playerService:PlayerService,private renderer:Renderer2,private ngZone:NgZone,private queueService:QueueService)
  {
      this.allShiriums=[];
      this.shiriums=[];

      this.pages=[];
  }

 ngOnChanges(changes:any) {
     if(changes.accion!=null&&!changes.accion.firstChange)
     {
       this.rendering=true;   
       this.RefreshView();
     }
      
  }

  ngOnInit() {
    this.ReadLectures();
    this.renderer.listen('document', 'click', (event) => {
         


         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="search-shirium-emunah") //click on main search
         {
             this.Search()
               
         }


         if(event.currentTarget.activeElement.attributes["class"]!=null && event.currentTarget.activeElement.attributes["class"].value=="paging-prev-emula") //click on paging-prev 
         {
              this.iteration--;
              if(this.iteration<=0)
              {
                   this.iteration=1;
              }
              else
              this.CreatePages();
         }

         if(event.currentTarget.activeElement.attributes["class"]!=null && event.currentTarget.activeElement.attributes["class"].value=="paging-next-emula") //click on paging-next
         {
              this.iteration++;
              if(this.iteration>Math.ceil(this.allPages/6) )
              {
                this.iteration=Math.ceil(this.allPages/6);
              }
              else
              this.CreatePages();
         }

         if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="page-emula") //click on page
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

        if(event.currentTarget.activeElement.attributes["data-type"]!=null && event.currentTarget.activeElement.attributes["data-type"].value=="media-emuna") //click on mnedia icons
         {
              var id=event.currentTarget.activeElement.attributes["id"].value;
              var title=event.currentTarget.activeElement.attributes["title"].value;
               var onlyAudio=title.includes('LT-Audio');
              this.playerService.Play(title,id,onlyAudio);   
         }

    });
  }

Search()
{
  this.query_main=$('#ballon .search-field').val();  //update the query field in my component (remenber double data binding)
             
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
        if(!this.rendering)  //the first time don't renderize
        return;
         
         let self=this

      var query=this.query_main;

       setTimeout(function(){ 
          $('#ballon').html($('#item-content-4').html());
          $('#ballon .search-field').val(query)

          $('#ballon form').submit(function (e) {
                 e.preventDefault();
                 self.ngZone.run(() => {
                    self.Search();
                 })
                 
          })
 
          $('#ballon .link-add').click(function(){ //add to my list

               var id=$(this).attr('id');
               
               var  myShirium=new Shiurim();
               myShirium=self.shiriums.filter(function (s) {
               return s.id==id;
              })[0];
     
              self.queueService.setItem(myShirium,"Rabbi Eli J Mansour");       

          })

       },500)
  }

}
