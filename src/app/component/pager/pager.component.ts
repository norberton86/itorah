import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { Browse } from '../../model/shiurim';
import { Page } from '../../model/page';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
  providers: [PlayerService]
})
export class PagerComponent implements OnInit {

  @Input()
  allResults: Array<Browse> = []



  results: Array<Browse> = []

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }


  ngOnChanges(changes: any): void {

    if (changes.allResults != undefined) {
      this.allResults = changes.allResults.currentValue

      if (this.allResults.length > 0)
        this.Update()
      else
        this.results = []
    }
  }

 


  Play(id: string, title: string, sponsor: string, mediaId: string, speakerName: string) {
    var onlyAudio = title.includes('LT-Audio');
    this.playerService.Play(title, id, onlyAudio, speakerName, sponsor, 1, mediaId);
  }

  pages: Array<Page> = [];
  allPages: number;
  iteration: number;
  allIteration: number;
  elem: number = 28

  PagingPrev() {
    this.iteration--;
    if (this.iteration <= 0) {
      this.iteration = 1;
    }
    else
      this.CreatePages();
  }

  PagingNext() {
    this.iteration++;
    if (this.iteration > Math.ceil(this.allPages / 6)) {
      this.iteration = Math.ceil(this.allPages / 6);
    }
    else
      this.CreatePages();
  }

  Page(id: number) {

    this.pages.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.PopulatedShirium(id);

  }

  CreatePages() {
    this.pages = [];

    for (var i = this.iteration * 6 - 6; i < this.iteration * 6 && i < this.allPages; i++) //populate the pages array
    {
      if (i == (this.iteration - 1) * 6) {
        this.pages.push({ id: i + 1, current: true });
        this.PopulatedShirium(i + 1);  //the page            
      }
      else
        this.pages.push({ id: i + 1, current: false });
    }

  }

  PopulatedShirium(id: number) {
    this.results = [];
    for (var i = id * this.elem - this.elem; i < id * this.elem && i < this.allResults.length; i++) {
      this.results.push(this.allResults[i]);  //populate the grid
    }

  }

  Update() {

    this.allPages = this.allResults.length / this.elem; //pagination
    this.iteration = 1; //pagination

    this.CreatePages();

  }
}
