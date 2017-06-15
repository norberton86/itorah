import { Component, OnInit } from '@angular/core';
import { Queue } from '../../model/queue';
import { QueueService } from '../../service/queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css'],
  providers: [QueueService]
})
export class QueueComponent implements OnInit {

  queues:Array<Queue>;
  
  constructor(private queueService:QueueService) {


       this.queues=[];
      //mock
      var p1=new Queue();
      p1.date=new Date();
      p1.description="Queue Description 1";
      p1.time=70;
      p1.title="Queue Title 1";
      p1.language="EN";
      p1.author="Rabbi Eli Mansour";

     var p2=new Queue();
      p2.date=new Date();
      p2.description="Queue Description 2";
      p2.time=90;
      p2.title="Queue Title 2";
      p2.language="HB";
      p2.author="Rabbi Eli Mansour";

      this.queues.push(p1);
      this.queues.push(p2);

   }

  ngOnInit() {
    //this.Read();
  }

  Read() {
       this.queueService.read().subscribe(
           result=>this.queues = result
       )

   }

}
