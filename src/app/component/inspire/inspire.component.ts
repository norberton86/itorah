import { Component, OnInit } from '@angular/core';
import { InspireService } from '../../service/inspire.service';
import { PlayerService } from '../../service/player.service';
import { Inspire } from '../../model/inspire';

@Component({
  selector: 'app-inspire',
  templateUrl: './inspire.component.html',
  styleUrls: ['./inspire.component.css'],
  providers: [InspireService, PlayerService]
})
export class InspireComponent implements OnInit {

  inspire: Inspire;
  possible: boolean=false
  currentWeekId:number=0

  constructor(private inspireService: InspireService, private playerService: PlayerService) { }

  ngOnInit() {
    this.Read()
  }

  Play() {
    this.playerService.PlayAudio(this.inspire.title, this.inspire.audio);
  }

  Download() {
    document.getElementById('inspireDownload').click()
  }

  Read() {
    this.inspireService.read().subscribe(
      result =>this.setValue(result)
    )
  }

  Forward() {
    this.inspireService.navigate(this.inspire.id,"next").subscribe(
      result => this.setValue(result)
    )
  }

  Back() {
    this.inspireService.navigate(this.inspire.id,"prev").subscribe(
      result => this.setValue(result)
    )
  }
 

  setValue(_inspire:Inspire)
  {
      if(this.currentWeekId==0)//if is the first time
      {
         this.currentWeekId=_inspire.id  //set the current week id
      }
      this.inspire=_inspire
      this.possible=_inspire.id==this.currentWeekId  //checkif is possible go to the next week
  }
  


}
