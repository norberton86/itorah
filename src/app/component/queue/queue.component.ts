import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemQueue } from '../../model/shiurim';
import { QueueService } from '../../service/queue.service';
import { PLayerQueueService } from '../../service/player.service';

import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit, OnDestroy {

  queues: Array<ItemQueue>;
  cursor: string = "-webkit-grab"

  constructor(private queueService: QueueService, private playerQueueService: PLayerQueueService) {

    this.queueService.getItem().subscribe(item => {
      this.Add(item)
    });

    this.queueService.getLogin().subscribe(item => {
      if (item == "Signed")
        this.Read();
      else
        this.Fill()
    });

    this.playerQueueService.getCompleted().subscribe(mediaId => {

      var position;
      for (var index = 0; index < this.queues.length; index++) {
        if (mediaId == this.queues[index].id)
          position = index;
      }

      this.playerQueueService.setQueue(this.queues[position + 1]) //play the next item
      this.queues.splice(position, 1)
    })

    this.playerQueueService.getPosition().subscribe(data => {
      var pos=-1;
      for (var index = 0; index < this.queues.length; index++) {
        if (data.mediaId == this.queues[index].id)
          pos = index;
      }
      
      if(pos!=-1)
      this.queues[pos].position = data.position

    })

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
      "dayWeek": "",
      "type": "",
      "pdfUrl": "",
      "cost": 6,
      "sponsor": "Rabbi Mansour",
      "categoryCount": 1,
      "position": "40"
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
      "dayWeek": "",
      "type": "",
      "pdfUrl": "",
      "cost": 6,
      "sponsor": "Rabbi Mansour",
      "categoryCount": 1,
      "position": "40"
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
      "dayWeek": "",
      "type": "",
      "pdfUrl": "",
      "cost": 6,
      "sponsor": "Rabbi Mansour",
      "categoryCount": 1,
      "position": "40"
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
      "dayWeek": "",
      "type": "",
      "pdfUrl": "",
      "cost": 6,
      "sponsor": "Rabbi Mansour",
      "categoryCount": 1,
      "position": "40"
    }];
  }

  ngOnInit() {
    if (this.queueService.getToken() != "") //if it is not loged
      this.Read();
    else
      this.Fill();
  }

  getStyle(item: ItemQueue) {

    var time = item.length.trim().split(':')
    var totalSeconds;

    switch (time.length) {
      case 3:
        var hourSeconds = parseInt(time[0]) * 60 * 60  //get the seconds of the hour
        var minuteSeconds = parseInt(time[1]) * 60     //get the seconds of the minute
        totalSeconds = hourSeconds + minuteSeconds + parseInt(time[2])

        break;      //hour:minute:second
      case 2:
        var minuteSeconds = parseInt(time[0]) * 60     //get the seconds of the minute
        totalSeconds = minuteSeconds + parseInt(time[1])

        break;     //minute:second
    }

    return Math.trunc(parseInt(item.position) * 100 / totalSeconds).toString() + '%'
  }

  Read() {

    this.queueService.read(this.queueService.getToken()).subscribe(
      result => {
        this.queues = result
        this.queueService.setQueue(this.queues) //emit the event with the queue

      }, error => { }, () => { }
    )

  }



  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks

  }

  Add(item: ItemQueue) {
    if (this.queues.filter(function (s) { return s.id == item.id; }).length == 0) {

      this.queues.push(item);
      this.CallAdd()
    }

  }

  CallAdd() {
    let self = this

    var req = []
    this.queues.forEach(function (a) {
      req.push({ ItemID: a.id, SourceId: a.sourceID })
    })

    this.queueService.add(this.queueService.getToken(), req).subscribe(
      respond => {
        this.queueService.Notify("Item added to queue", false);
        this.queueService.setQueue(this.queues) //emit the event with the queue
      },
      error => {

        this.queueService.Notify("Error trying to add", true)
      },
      () => { }
    )
  }

  Remove(id: string) {

    var item = this.queues.filter(function (s) { return s.id == id; })[0]

    for (var index = 0; index < this.queues.length; index++) {
      if (this.queues[index].id == id)
        this.queues.splice(index, 1)
    }

    let self = this
    this.queueService.remove(this.queueService.getToken(), [{ ItemID: item.id, SourceID: item.sourceID }]).subscribe(
      respond => {
        this.queueService.setQueue(this.queues) //emit the event with the queue
      },
      error => {

        this.queueService.Notify("Error trying to remove", true)
      },
      () => { }
    )

  }

  Play(item: ItemQueue) {

    this.playerQueueService.setQueue(item)
  }

  Moved() {
    this.CallAdd()
  }

}

