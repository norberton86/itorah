import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { BrowseService } from '../../service/browse.service';
import { ItemQueue, Category } from '../../model/shiurim';
import { Observable } from 'rxjs/Observable';
import { Speaker } from '../../model/speaker';
import { SpeakerService } from '../../service/speaker.service';
import { Page } from '../../model/page';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers: [ BrowseService,SpeakerService]
})
export class BrowseComponent implements OnInit, OnChanges {

  speaker:Speaker
  speakers:Array<Speaker>=[]

  asc: boolean = false;

  all: Array<ItemQueue> = []
  recently: Array<ItemQueue> = []
  popular: Array<ItemQueue> = []
  relevant: Array<ItemQueue> = []
  
  allBrowse: Array<ItemQueue> = []
  browse: Array<ItemQueue> = []

  loading: boolean = false

  category: Category
  categorys: Array<Category> = []

  current: string = "All"

  loadingCategory:boolean=false

  @Input()
  browseClass: string

  constructor(private playerService: PlayerService, private browseService: BrowseService,private speakerService:SpeakerService) { }

  ReadCategory() {
    let self = this
    this.browseService.getCategorys().subscribe(function (response) {
      self.categorys.push({ id: 0, name: "Select Category" })
      self.categorys = self.categorys.concat(response)
      self.category = self.categorys[0]

    }, function (error) { }, function () { })
  }

  Category() {
    
    if (this.category.id != 0) {
      this.allBrowse = []
      let self = this
      this.loadingCategory=true
      this.browseService.readCategory(this.category.id).subscribe(function (response) {
        
        if(self.speaker.id!=0)
        {
          var complete=self.speaker.title+" "+self.speaker.firstName+" "+self.speaker.lastName
          self.allBrowse = response.filter(i=>i.speaker==complete)
        }
        else
        self.allBrowse = response

        self.Update()

        self.loadingCategory=false
      }, function (error) { 
        self.loadingCategory=false
      }, function () { }
      );
    }
  }

  ReadSpeakers()
  {
    this.speakerService.read().subscribe(result=>{
      
      var speakerEmpty=new Speaker()
      speakerEmpty.id=0
      speakerEmpty.firstName="Select Speaker"

      this.speakers.push(speakerEmpty)
      this.speakers=this.speakers.concat(result)
      this.speaker=this.speakers[0]
    },error=>{},()=>{})
  }

  ngOnInit() {

    this.ReadSpeakers()
    this.ReadCategory();
    this.Read();
  }

  ngOnChanges(changes: any): void {
    this.current = changes.browseClass.currentValue

  }

  Read() {
    let self = this
    Observable.forkJoin(
      this.browseService.readRecently(),
      this.browseService.readPopular(),
      this.browseService.readRelevant()
    )
      .subscribe(function (response) {

        self.recently = response[0]
        self.popular = response[1]
        self.relevant = response[2]

        self.all = self.all.concat(self.recently)
        self.all = self.all.concat(self.popular)
        self.all = self.all.concat(self.relevant)

      }, function (error) { }, function () { }
      );
  }

 Play(id: string, title: string, sponsor: string,mediaId:string) {
    var onlyAudio = title.includes('LT-Audio');
    this.playerService.Play(title, id, onlyAudio, this.speaker.firstName + " " + this.speaker.lastName, sponsor,1,mediaId);
  }


  Desc(a, b) {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }

  Asc(a, b) {
    if (a.date > b.date)
      return -1;
    if (a.date < b.date)
      return 1;
    return 0;
  }

  Sort(col) {
    this.asc = !this.asc;
    if (this.asc)
      col = col.sort(this.Asc)
    else
      col = col.sort(this.Desc)
  }

  Current(c: string) {
    return c == this.current
  }

  setCurrent(c: string) {
    this.current = c
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  pages: Array<Page>;
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
    this.browse = [];
    for (var i = id * this.elem - this.elem; i < id * this.elem && i < this.allBrowse.length; i++) {
      this.browse.push(this.allBrowse[i]);  //populate the grid
    }

  }

  Update() {

    this.allPages = this.allBrowse.length / this.elem; //pagination
    this.iteration = 1; //pagination

    this.CreatePages();

  }


}
