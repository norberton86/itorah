import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ItemQueue } from '../../model/shiurim';
import { QueueService } from '../../service/queue.service';
import { PlayerService } from '../../service/player.service';

import { Subscription } from 'rxjs/Subscription';
 


@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css'],
  providers:[PlayerService]
})
export class QueueComponent implements OnInit,OnDestroy {

  queues:Array<ItemQueue>;

  constructor(private queueService:QueueService,private playerService:PlayerService) {
    this.queues=[];
    this.queueService.getLogged().subscribe(item => {
         this.Add(item)
    });
   }

  ngOnInit() {
    //this.Read();
 
  }

  Read() {
       
       this.queueService.read(this.queueService.getToken()).subscribe(
           result=>this.queues = result
       )

  }

  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
       
  }

  Add(item:ItemQueue)
  {    
    if(this.queues.filter(function (s) {
                 return s.id==item.id;
               }).length==0)
    this.queues.push(item)
  }

  Remove(id:string)
  {
     for (var index = 0; index < this.queues.length; index++) {
          if(this.queues[index].id==id)
          this.queues.splice(index,1)
     }
  }

  Play(title:string,media:string)
  {     
        if(media.indexOf(".mp3")<0)
       this.playerService.Play(title,media,false)
       else
       this.playerService.Play(title,media,true)
  }
}

