import { Component, OnInit } from '@angular/core';
import { Topic,SubTopic,chelek,seif,ContentSeif } from '../../model/topic';
import { YomiService } from '../../service/yomi.service';
import { PlayerService } from '../../service/player.service';

declare var $: any;

@Component({
  selector: 'app-mishna-berura-yomi',
  templateUrl: './mishna-berura-yomi.component.html',
  styleUrls: ['./mishna-berura-yomi.component.css'],
  providers:[YomiService,PlayerService]
})
export class MishnaBeruraYomiComponent implements OnInit {


  firstTime:boolean=true
  content: ContentSeif
  
  relateds:Array<seif>=[]
  selectedRelated:seif

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

      if(!this.firstTime)
      this.setByContent()

      this.firstTime=false
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
              self.ReadContent(respond[0].id)

           },
           function(error){},
           function(){}
       )
   
  }

  ReadContent(idSeif:number)
  {
      let self=this;
      this.yomiService.readContentSeif(idSeif).subscribe(
           function(respond){
              self.setValue(respond);
           },
           function(error){},
           function(){}
       )
   
  }

  setByContent()
  {
    this.selectedCheleck=this.cheleks.filter(i=>i.id==this.content.chelekID)[0]
    this.selectedTopic=this.topics.filter(i=>i.id==this.content.topicID)[0]
    
    let self=this;
    this.yomiService.readSubTopic(this.content.topicID).subscribe(
           function(respond){
              self.subTopics=respond;
              self.selectedSubTopic=respond.filter(i=>i.id==self.content.subTopicID)[0]
              self.ReadBySubTopics(self.selectedSubTopic.id)
           },
           function(error){},
           function(){}
    )
    
  }

  ReadTopic()
  {
      let self=this;
      this.yomiService.readTopic().subscribe(
           function(respond){
              self.topics=respond;
              self.selectedTopic=respond[0]
              self.ReadSubTopics(respond[0].id)
           },
           function(error){},
           function(){}
       )
   
  }

  ReadSubTopics(idTopic:number)
  {
      let self=this;
      this.yomiService.readSubTopic(idTopic).subscribe(
           function(respond){
              self.subTopics=respond;
              self.selectedSubTopic=respond[0]
              self.ReadBySubTopics(respond[0].id)
           },
           function(error){},
           function(){}
       )
   
  }

  ReadBySubTopics(idSubTopic:number)
  {
      let self=this;
      this.yomiService.readBySubTopic(idSubTopic).subscribe(
           function(respond){
             self.relateds=respond
             self.selectedRelated=respond[0]
           },
           function(error){},
           function(){}
       )
   
  }

  Play()
  {
    this.playerService.PlayAudio("",this.content.audio)
  }

  Print()
  {
    $('#printYomi').print();
  }

  onChangeCheleck()
  {
    this.ReadSeif(this.selectedCheleck.id)
  }


  onChangeSeif()
  {
    this.ReadContent(this.selectedSeif.id)
  }

  onChangeTopic()
  {
    this.ReadSubTopics(this.selectedTopic.id)
  }

}
