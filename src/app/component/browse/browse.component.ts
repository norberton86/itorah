import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PlayerService } from '../../service/player.service';
import { BrowseService } from '../../service/browse.service';
import { HomeService } from '../../service/home.service';
import { Browse, Category, SubCategory } from '../../model/shiurim';
import { Observable } from 'rxjs/Observable';
import { Speaker } from '../../model/speaker';
import { SpeakerService } from '../../service/speaker.service';
import { Page } from '../../model/page';

declare var $:any

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers: [BrowseService, SpeakerService]
})
export class BrowseComponent implements OnInit, OnChanges {

  speaker: Speaker
  speakers: Array<Speaker> = []

  asc: boolean = false;

  //all: Array<Browse> = []
  recently: Array<Browse> = []
  popular: Array<Browse> = []
  relevant: Array<Browse> = []
  allBrowse: Array<Browse> = []


  loading: boolean = false

  category: Category
  categorys: Array<Category> = []

  subCategory: SubCategory
  subCategorys: Array<SubCategory> = []

  current: string = "Recently"



  @Input()
  browseClass: string

  constructor(private playerService: PlayerService, private browseService: BrowseService, private speakerService: SpeakerService,private homeService:HomeService) { }

  NameforSelect(c: Category) {
    if (c.id != 0)
      return c.name + " (" + c.shiurCount + ")"
    else
      return c.name
  }

  SubCategory() {

    this.subCategorys = []
    this.browseService.getSubCategorys().subscribe(result => {

      this.subCategorys.push({ id: 0, name: "Select Sub Category", parentID: 0, shiurCount: 0 })
      result = result.filter(i => i.parentID == this.category.id)  //filter by category
      this.subCategorys = this.subCategorys.concat(result)
      this.subCategory = this.subCategorys[0]


    }, error => { }, () => { })
  }

  ReadCategory() {
    let self = this
    this.browseService.getCategorys().subscribe(function (response) {
      self.categorys.push({ id: 0, name: "Select Category", shiurCount: 0 })
      self.categorys = self.categorys.concat(response)
      self.category = self.categorys[0]

      self.SubCategory()
    }, function (error) { }, function () { })
  }

  ReadSpeakers(mains:Array<Speaker>) {
    this.speakerService.read().subscribe(result => {

       mains.forEach(function(a){                      //remove the mains
          var index=  result.findIndex(i=>i.id==a.id)
          result.splice(index,1)
       })
      
      var speakerDivisor = new Speaker()
      speakerDivisor.id = 0
      speakerDivisor.firstName = " "

      result.unshift(speakerDivisor)

      mains.reverse().forEach(function(a){  //inserted at the begining
        result.unshift(a)
      })
      

      var speakerEmpty = new Speaker()
      speakerEmpty.id = 0
      speakerEmpty.firstName = "Select Speaker"

      this.speakers.push(speakerEmpty)
      
      var featuredTitle=new Speaker()
      featuredTitle.firstName="Featured Speakers"
      featuredTitle.id=0

      this.speakers.push(featuredTitle)

      this.speakers = this.speakers.concat(result)
      this.speaker = this.speakers[0]
    }, error => { }, () => { })
  }

  ngOnInit() {

    this.ReadMain()
    this.ReadCategory();
    this.Read();
    this.Resize()
  }

  ReadMain()
  {
    this.speakerService.readMain().subscribe(result=>{
       this.ReadSpeakers(result)
    },error=>{},()=>{})
  }

  ngOnChanges(changes: any): void {
    this.current = changes.browseClass.currentValue

  }

  Read() {
    let self = this
    self.loading = true
    Observable.forkJoin(
      this.browseService.readRecently(),
      this.browseService.readPopular(),
      this.browseService.readRelevant()
    )
      .subscribe(function (response) {

        self.recently = response[0]
        self.popular = response[1]
        self.relevant = response[2]

        /*self.all = self.all.concat(self.recently)
        self.all = self.all.concat(self.popular)
        self.all = self.all.concat(self.relevant)*/

        self.loading = false

      },
      function (error) {
        self.loading = false
      },
      function () { }
      );
  }

  Play(id: string, title: string, sponsor: string, mediaId: string) {
    var onlyAudio = title.includes('LT-Audio');
    this.playerService.Play(title, id, onlyAudio, this.speaker.firstName + " " + this.speaker.lastName, sponsor, 1, mediaId);
  }

  Current(c: string) {
    return c == this.current
  }

  setCurrent(c: string) {
    this.current = c

    if (c != 'Category') {
      this.category = this.categorys[0]
      this.subCategory = this.subCategorys[0]
      this.speaker = this.speakers[0]
    }
  }

  Status(event) {
    this.loading = event
  }

  Close() {
    this.setCurrent('Recently')
    this.homeService.setBrowse('close')
  }

  Resize()
  {
    /*
    $( window ).resize(function() {
       $('#browseSearch').css('max-height','calc(100vh - 110%)')
    });
    */
  }
  

}
