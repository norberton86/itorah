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

  content: ContentSeif

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
              self.content=respond;

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
    $('#print').print();
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
