import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReadNow, Link } from '../../model/home';
import { PlayerService } from '../../service/player.service';
import { HomeService } from '../../service/home.service';
import { PrintService } from '../../service/print.service';

declare var $: any;

@Component({
  selector: 'app-read-now',
  templateUrl: './read-now.component.html',
  styleUrls: ['./read-now.component.css'],
  providers:[PrintService]
})
export class ReadNowComponent implements OnInit, OnChanges {

  @Input()
  title: string

  @Input()
  content: string

  @Input()
  dedication: string

  @Input()
  source: number

  links: Array<Link> = []

  parragraphs: Array<string> = []

  formatted: boolean;

  constructor(private playerService: PlayerService, private homeService: HomeService,private printService:PrintService) { }

  ngOnInit() {
    this.readLink();
  }

  ngOnChanges(changes: any): void {

    if(changes.title!=undefined && changes.title!=null)
    this.title = changes.title.currentValue
    
    if(changes.content!=undefined && changes.content!=null)
    this.content = changes.content.currentValue

    if(changes.dedication!=undefined && changes.dedication!=null)
    this.dedication = changes.dedication.currentValue

    if(changes.source!=undefined && changes.source!=null)
    this.source = changes.source.currentValue


    if (this.content != null && this.content != '') {
      if (this.content.indexOf('</p>') >= 0)//determinate the format type(in this case has hmtl tags)
      {
        this.formatted = true
      }
      else
        if (this.content.indexOf('\n') >= 0) //in this case has special characters format
        {
         
          this.formatted = false

        }

    }


  }

  Print() {
      this.printService.Print('printRead')
  }

  Play() {

    if (this.link != undefined && this.link != null) {
      this.playerService.PlayAudio("", this.link.AudioUrl,"",6,this.link.ID.toString())
      return
    }


    let self = this;
    this.homeService.playNow(6).subscribe(
      function (response) {
        self.playerService.PlayAudio("", response[0].AudioUrl,"",6,response[0].ID.toString())
      }, function (error) { }, function () { }
    )

  }


  readLink() {
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
  }
}
