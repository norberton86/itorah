import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { HomeService } from '../../service/home.service';
import { ReadNow } from '../../model/home';

declare var $: any

@Component({
  selector: 'app-read-now-emunah',
  templateUrl: './read-now-emunah.component.html',
  styleUrls: ['./read-now-emunah.component.css']
})
export class ReadNowEmunahComponent implements OnInit {

  rNow: ReadNow
  htmlFormatted:boolean

  constructor(private playerService: PlayerService, private homeService: HomeService) { }

  ngOnInit() {

    this.homeService.readNow(3).subscribe(
      response => {

        this.rNow = response
        if (response.content.indexOf('</p>') >= 0)//determinate the format type(in this case has hmtl tags)
          this.htmlFormatted = true
        else
          this.htmlFormatted = false
        
      }, error => { }, () => { }
    )

  }

  Print() {
    $('#printReadEmunah').print();
  }

  Play() {

    this.homeService.playNow(3).subscribe(response => {

      this.playerService.PlayAudio("", response[0].AudioUrl, "", 3, response[0].ID.toString())

    }, error => { }, () => { })

  }

}
