import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { HomeService } from '../../service/home.service';
import { PrintService } from '../../service/print.service';
import { ReadNow,LinkEmunah } from '../../model/home';

@Component({
  selector: 'app-read-now-emunah',
  templateUrl: './read-now-emunah.component.html',
  styleUrls: ['./read-now-emunah.component.css'],
  providers:[PrintService]
})
export class ReadNowEmunahComponent implements OnInit {

  link:LinkEmunah 
  links:Array<LinkEmunah>=[]
  htmlFormatted:boolean

  constructor(private playerService: PlayerService, private homeService: HomeService,private printService:PrintService) { }

  ngOnInit() {
    this.ReadLink()
  }

  ReadLink() {
    this.homeService.readLinksEmunah().subscribe(
      result => {
        this.links = result
        this.Read()
      }, error => { }, () => { }
    )
  }

 Close(){
    this.link=this.links.find(i=>i.title!="<p>No Content Available</p>")  //reset to the element with content available
 }

  Read()
  {
   this.homeService.readNow(3).subscribe(
      response => {

        this.link=this.links.find(i=>i.title==response.title)
        this.link.content=response.content

        this.links.forEach(l=>{
           if(l.title!=response.title)
           l.content="<p style='padding-bottom: 1em;'>No Content Available</p>"
        })

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

      this.playerService.PlayAudio("", this.link.audioUrl, "", 3, this.link.id.toString())
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  NavigateLink(link: LinkEmunah) {
    this.link = link
  }

  LinksToShow():Array<LinkEmunah>
  {
    if(this.links!=null && this.links!=undefined && this.link!=null && this.link!=undefined)
    return this.links.filter(i=>i.title!=this.link.title)
    else
    return []
  }

}
