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

  constructor(private inspireService: InspireService, private playerService: PlayerService) { }

  ngOnInit() {
    this.Read(1)
  }

  Read(id: number) {
    this.inspireService.read(id).subscribe(
      result => this.inspire = result
    )
  }

  Play() {
    this.playerService.PlayAudio(this.inspire.title, this.inspire.url);
  }

  Download() {
    document.getElementById('inspireDownload').click()
  }

  Forward() {
   
    this.Read(this.inspire.id + 1);
  }

  Back() {
    this.Read(this.inspire.id - 1);
  }
 
  ForwardImPosible():boolean
  {
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();

    if(this.inspire.date.getDate()>= first)
    return true
    else
    return false
  }


}
