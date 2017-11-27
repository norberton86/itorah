import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemQueue } from '../../model/shiurim';
import { QueueService } from '../../service/queue.service';
import { PlayerService } from '../../service/player.service';

import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css'],
  providers: [PlayerService]
})
export class QueueComponent implements OnInit, OnDestroy {

  queues: Array<ItemQueue>;
  cursor: string = "-webkit-grab"

  constructor(private queueService: QueueService, private playerService: PlayerService) {

    this.queueService.getItem().subscribe(item => {
      this.Add(item)
    });

    this.queueService.getLogin().subscribe(item => {
      if (item == "Signed")
         this.Read();
      else
        this.Fill()
    });
  }

  Fill() {
    this.queues = [{
      "title": "The Transition / Bene Gad",
      "dateRecorded": new Date(),
      "length": "60:0         ",
      "language": "English",
      "audio": "http://peleyoetz.com/PeleYoetz/4.mp3",
      "video": "",
      "id": "1",
      "wowzaVideoUrl": "",
      "speaker": "Rabbi Eli J Mansour",
      "sourceID": 1,
      "dayWeek":"",
      "type":"",
      "pdfUrl":"",
       "cost":6,
       "sponsor":"Rabbi Mansour"
    },
    {
      "title": "Word Power",
      "dateRecorded": new Date(),
      "length": "60:0         ",
      "language": "English",
      "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
      "video": "",
      "id": "2",
      "wowzaVideoUrl": "",
      "speaker": "Rabbi Eli J Mansour",
      "sourceID": 1,
      "dayWeek":"",
      "type":"",
      "pdfUrl":"",
       "cost":6,
       "sponsor":"Rabbi Mansour"
    },
    {
      "title": "Perush Rashi on Parashat Hukat",
      "dateRecorded": new Date(),
      "length": "60:0         ",
      "language": "English",
      "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
      "video": "",
      "id": "3",
      "wowzaVideoUrl": "",
      "speaker": "Rabbi Eli J Mansour",
      "sourceID": 1,
      "dayWeek":"",
      "type":"",
      "pdfUrl":"",
       "cost":6,
       "sponsor":"Rabbi Mansour"
    },
    {
      "title": "The Aderet / Jewish Home",
      "dateRecorded": new Date(),
      "length": "60:0         ",
      "language": "English",
      "audio": "http://peleyoetz.com/PeleYoetz/5.mp3",
      "video": "http://media.learntorah.com/LT-Video/mp4:LBM227.mp4/playlist.m3u8",
      "id": "4",
      "speaker": "Rabbi Eli J Mansour",
      "wowzaVideoUrl": "",
      "sourceID": 1,
      "dayWeek":"",
      "type":"",
      "pdfUrl":"",
       "cost":6,
       "sponsor":"Rabbi Mansour"
    }];
  }

  ngOnInit() {
    if (this.queueService.getToken() != "") //if it is not loged
      this.Read();
    else
      this.Fill();
  }

  Read() {

    this.queueService.read(this.queueService.getToken()).subscribe(
      result => this.queues = result
    )

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks

  }

  Add(item: ItemQueue) {
    if (this.queues.filter(function (s) {return s.id == item.id;}).length == 0)
    {
      
      this.queues.push(item);
      this.CallAdd()
    }
      
  }

  CallAdd()
  {
    let self=this

    var req=[]
    this.queues.forEach(function(a){
           req.push({ItemID:a.id,SourceId:a.sourceID})
    })

    this.queueService.add(this.queueService.getToken(),req).subscribe(
        function(respond){
              
           },
           function(error){
                
               self.queueService.Notify("Error trying to add",true) 
           },
           function(){}
      )
  }

  Remove(id: string) {

    var  item= this.queues.filter(function (s) {return s.id == id;})[0]

    for (var index = 0; index < this.queues.length; index++) {
      if (this.queues[index].id == id)
        this.queues.splice(index, 1)
    }
     
     let self=this
     this.queueService.remove(this.queueService.getToken(),[{ItemID:item.id,SourceID:item.sourceID}]).subscribe(
        function(respond){
              
           },
           function(error){
                
               self.queueService.Notify("Error trying to remove",true) 
           },
           function(){}
      )

  }

  Play(title: string, media: string) {
    if (media.indexOf(".mp3") < 0) //if not is *.mp3 extension
      this.playerService.Play(title, media, title.includes('LT-Audio'))
    else
      this.playerService.PlayAudio(title, media)
  }

  Moved() {
        this.CallAdd() 
  }

}

