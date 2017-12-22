import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReadNow, Link } from '../../model/home';
import { PlayerService } from '../../service/player.service';
import { HomeService } from '../../service/home.service';

declare var $: any;

@Component({
  selector: 'app-read-now',
  templateUrl: './read-now.component.html',
  styleUrls: ['./read-now.component.css']
})
export class ReadNowComponent implements OnInit, OnChanges {

  @Input()
  title: string

  @Input()
  content: string

  @Input()
  dedication: string


  links: Array<Link> = []

  parragraphs: Array<string> = []

  formatted: boolean;

  constructor(private playerService: PlayerService, private homeService: HomeService) { }

  ngOnInit() {
    this.readLink();
  }

  ngOnChanges(changes: any): void {
    this.title = changes.title.currentValue
    this.content = changes.content.currentValue
    this.dedication = changes.dedication.currentValue


    if (this.content != null && this.content != '') {
      if (this.content.indexOf('</p>') >= 0)//determinate the format type(in this case has hmtl tags)
      {
        this.formatted = true
      }
      else
        if (this.content.indexOf('\n') >= 0) //in this case has special characters format
        {
          /*
          this.parragraphs=this.content.split("\n").filter(function (s) {  //split by '\n' and get parragraphs
            return s != "";
          });*/

          this.formatted = false

        }

    }


  }

  Print() {
    $('#printRead').print();
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
}
