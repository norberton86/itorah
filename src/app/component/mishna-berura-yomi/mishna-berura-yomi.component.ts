import { Component, OnInit } from '@angular/core';
import { Topic,SubTopic,chelek,seif,SubSeif,ContentSeif } from '../../model/topic';
import { YomiService } from '../../service/yomi.service';
import { PlayerService } from '../../service/player.service';
import { Observable } from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-mishna-berura-yomi',
  templateUrl: './mishna-berura-yomi.component.html',
  styleUrls: ['./mishna-berura-yomi.component.css'],
  providers:[YomiService]
})
export class MishnaBeruraYomiComponent implements OnInit {

  loading:string="Loading..."
  firstTime:boolean=true
  content: ContentSeif
  
  relateds:Array<SubSeif>=[]
  selectedRelated:SubSeif

  cheleks:Array<chelek>=[]
  selectedCheleck:chelek
  
  seifs:Array<seif>=[]
  selectedSeif:seif

  topics:Array<Topic>=[]
  selectedTopic:Topic

  subTopics:Array<SubTopic>=[]
  selectedSubTopic:SubTopic

  constructor(private playerService:PlayerService,private yomiService:YomiService) { }

  ngOnInit() {
   this.ReadCheleck() 
   this.ReadTopic()
 }


  setValue(cont:ContentSeif)
  {
      this.content=cont
      this.loading=cont.subTopicName
  }

  setValueCombo(cont:ContentSeif)
  {
      this.content=cont
      this.setByContent()

  }

  Forward() {
    this.yomiService.navigate(this.content.id,"next").subscribe(
      result => this.setValue(result)
    )
  }

  Back() {
    this.yomiService.navigate(this.content.id,"prev").subscribe(
      result =>result=="There is no previous content."?this.yomiService.Notify(result,false) :this.setValue(result)
    )
  }

  ReadCheleck()
  {
      let self=this;
      this.yomiService.readChelek().subscribe(
           function(respond){
              self.cheleks=respond;
              self.selectedCheleck=respond[0]
              self.ReadSeif(respond[0].id)
           },
           function(error){},
           function(){}
       )
   
  }

  ReadSeif(idChelek:number)
  {
      let self=this;
      this.yomiService.readSeif(idChelek).subscribe(
           function(respond){
              self.seifs=respond;
              self.selectedSeif=respond[0]
              self.ReadContent(respond[0].id,true)

           },
           function(error){},
           function(){}
       )
   
  }

  ReadContent(idSeif:number,combo:boolean)
  {
      let self=this;
      this.yomiService.readContentSeif(idSeif).subscribe(
           function(respond){
              if(!combo)
              self.setValue(respond);
              else
              self.setValueCombo(respond);
           },
           function(error){},
           function(){}
       )
  }

  setByContent()
  {
   
    this.selectedTopic=this.topics.filter(i=>i.id==this.content.topicID)[0]
    
    let self=this;
    this.ReadSubTopics(this.selectedTopic.id,true)
    
  }

  getRelated(id:number)
  {
    return this.relateds.filter(i=>i.idFather==id)
  }

  ReadTopic()
  {
      let self=this;
      this.yomiService.readTopic().subscribe(
           function(respond){
              self.topics=respond;
              self.selectedTopic=respond[0]
              self.ReadSubTopics(respond[0].id,true)
           },
           function(error){},
           function(){}
       )
   
  }

  ReadSubTopics(idTopic:number,combo:boolean)
  {
      this.loading="Loading..."
      this.subTopics=[]
      let self=this;
      this.yomiService.readSubTopic(idTopic).subscribe(
           function(respond){
             
              self.ReadBySubTopics(respond,combo)
           },
           function(error){},
           function(){}
       )
   
  }

  ReadBySubTopics(subs:Array<SubTopic>,combo:boolean)
  {
      let self=this;
      self.relateds=[]

       var obs:Array<Observable<seif[]>>=[]

        for(var  i=0;i<subs.length;i++)
        {
          obs.push(this.yomiService.readBySubTopic(subs[i].id))
        } 
  
        Observable.forkJoin(
          obs
        )
        .subscribe(function (response) {
           
          var i=-1; 
          response.forEach(function(r){

                   i++; 
                  for (var j = 0; j < r.length; j++) {
                    
                     self.relateds.push({id:r[j].id,name:r[j].name,idFather:subs[i].id})
                  }     
                         
          })
          self.subTopics=subs
          if(!combo)
          {
            self.selectedSubTopic=subs[0]
            self.selectedRelated=self.relateds[0]
            self.ReadContent(self.selectedRelated.id,false)
          }
          else
          {
             self.selectedSubTopic=self.subTopics.filter(i=>i.id==self.content.subTopicID)[0]
             self.selectedRelated=self.relateds.filter(i=>i.id==self.content.id)[0]
          }
          self.loading=self.selectedSubTopic.name
          
          
        }, function (error) { }, function () { }
        );

  }

  Play()
  {
    this.playerService.PlayAudio("",this.content.audio,"")
  }

  Print()
  {
    $('#printYomi').print();
  }




}
