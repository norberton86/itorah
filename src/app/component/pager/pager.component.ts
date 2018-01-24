import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { Browse } from '../../model/shiurim';
import { Page } from '../../model/page';
import { ShiurimService, Category } from '../../service/shiurim.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']

})
export class PagerComponent implements OnInit {

  @Input()
  allResults: Array<Browse> = []
  results: Array<Browse> = []


  //---------------------------------------------------------------------------------------------------------------------------------------
  OpenPopover(id) {
    if (this.requesting)
      return;

    this.requesting = true

    this.shiurimService.relatedCategories(id).subscribe(result => {
      this.requesting = false
      this.rCategories = result

    }, error => { this.requesting = false }, () => { })
  }

  RelatedShiurs(idShiur, idCategory) {
    if (this.requesting)
      return;

    this.requesting = true

    this.selectedCategory = this.rCategories.find(c => c.ID == idCategory).Name

    this.shiurimService.relatedBrowse(idShiur, idCategory).subscribe(result => {
      this.requesting = false

      if (!this.navigatedToCategory)  //only the first time when the user navigaet for categories
        this.shiurOriginalsBeforecategory = this.allResults //create the copy  

       this.FillShirium(result)
      this.navigatedToCategory = true
    }, error => { this.requesting = false }, () => { })
  }

  BackFromCategories() {
    this.FillShirium(this.shiurOriginalsBeforecategory)
    this.navigatedToCategory = false
  }

  FillShirium(data: Array<Browse>) {
    this.allResults = data
    this.Update()
  }

  rCategories: Array<Category> = []
  shiurOriginalsBeforecategory: Array<Browse> = []  //copy to navigate back
  requesting: boolean = false
  navigatedToCategory: boolean = false
  selectedCategory: string = ''
  //--------------------------------------------------------------------------------------------------------------------------------------------



  constructor(private playerService: PlayerService, private shiurimService: ShiurimService) { 

  }

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
    var onlyAudio = id.includes('LT-Audio');
    this.playerService.Play(title, id, onlyAudio, speakerName, sponsor, 1, mediaId);
  }

  pages: Array<Page> = [];
  allPages: number;
  iteration: number;
  allIteration: number;
  elem: number = 24

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
