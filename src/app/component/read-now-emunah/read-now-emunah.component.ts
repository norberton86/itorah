import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { HomeService } from '../../service/home.service';
import { PrintService } from '../../service/print.service';
import { ReadNow } from '../../model/home';



@Component({
  selector: 'app-read-now-emunah',
  templateUrl: './read-now-emunah.component.html',
  styleUrls: ['./read-now-emunah.component.css'],
  providers:[PrintService]
})
export class ReadNowEmunahComponent implements OnInit {

  rNow: ReadNow
  htmlFormatted:boolean

  constructor(private playerService: PlayerService, private homeService: HomeService,private printService:PrintService) { }

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
    this.printService.Print('printReadEmunah');
  }

  Play() {

    this.homeService.playNow(3).subscribe(response => {

      this.playerService.PlayAudio("", response[0].AudioUrl, "", 3, response[0].ID.toString())

    }, error => { }, () => { })

  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 /* readLink() {
    this.homeService.readLinks().subscribe(
      result => {
        this.links = result
      }, error => { }, () => { }
    )
  }

  NavigateLink(link: Link) {
    this.link = link

    this.title = link.Title
    this.content = link.Content
    this.dedication = link.Dedication
  }
  link: Link

  LinksToShow():Array<Link>
  {
    return this.links.filter(i=>i.Title!=this.title)
  }*/

}
