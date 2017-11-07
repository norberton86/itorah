import { Component, OnInit, NgZone, EventEmitter, Output } from '@angular/core';

import { Speaker } from '../../model/speaker';
import { Shiurim } from '../../model/shiurim';
import { Page } from '../../model/page';
import { Letter } from '../../model/letter';
import { SpeakerService } from '../../service/speaker.service';
import { ShiurimService } from '../../service/shiurim.service';
import { PlayerService } from '../../service/player.service';
import { DatabaseService } from '../../service/database.service';
import { QueueService } from '../../service/queue.service';

import { Injectable } from '@angular/core'

declare var $: any;

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css'],
  providers: [SpeakerService, PlayerService, DatabaseService]
})
export class SpeakerComponent implements OnInit {

  current: string = "tile-tab-1"
  detailed: boolean = false

  @Output()
  public myEvent = new EventEmitter<boolean>();

  @Output()
  public myEventSpeakers = new EventEmitter<string>();


  allSpeakers: Array<Speaker>;
  currentSpeakers: Array<Speaker>;
  speaker: Speaker;



  allShiriums: Array<Shiurim>;
  shiriums: Array<Shiurim>;

  query_main: string = '';

  pages: Array<Page>;
  allPages: number;
  iteration: number;
  allIteration: number;


  //############################################### All Speakers #######################################################
  speakers: Array<Speaker>;  //list in UI

  query_all: string = '';     //query in All

  pagesAll: Array<Page>;
  allPagesAll: number;
  iterationAll: number;
  allIterationAll: number;

  letters: Array<Letter> = [{ letter: "A", current: true, disable: false },
  { letter: "B", current: false, disable: false },
  { letter: "C", current: false, disable: false },
  { letter: "D", current: false, disable: false },
  { letter: "E", current: false, disable: false },
  { letter: "F", current: false, disable: false },
  { letter: "G", current: false, disable: false },
  { letter: "H", current: false, disable: false },
  { letter: "I", current: false, disable: false },
  { letter: "J", current: false, disable: false },
  { letter: "K", current: false, disable: false },
  { letter: "L", current: false, disable: false },
  { letter: "M", current: false, disable: false },
  { letter: "N", current: false, disable: false },
  { letter: "O", current: false, disable: false },
  { letter: "P", current: false, disable: false },
  { letter: "Q", current: false, disable: false },
  { letter: "R", current: false, disable: false },
  { letter: "S", current: false, disable: false },
  { letter: "T", current: false, disable: false },
  { letter: "U", current: false, disable: false },
  { letter: "V", current: false, disable: false },
  { letter: "W", current: false, disable: false },
  { letter: "X", current: false, disable: false },
  { letter: "Y", current: false, disable: false },
  { letter: "Z", current: false, disable: false }];



  constructor(private speakerService: SpeakerService, private shiurimService: ShiurimService, private ngZone: NgZone, private playerService: PlayerService, private databaseService: DatabaseService, private queueService: QueueService) {
    this.allSpeakers = [];
    this.speaker = new Speaker();
    this.currentSpeakers = [];

    this.allShiriums = [];
    this.shiriums = [];

    this.pages = [];
    //####################################################################################################################

    this.speakers = [];
    this.pagesAll = [];

  }



  isAuthenticated(): boolean {
    let self = this;
    if (localStorage.getItem('userItorah') == null || localStorage.getItem('userItorah') == "")//needs credentials to access
    {
      setTimeout(function () {

        $("#field-8").val("#" + self.current) //restore value in select
        //------------------------------------------------------------------------------------------
        $('.nav-access > li > .dropdown-signin').addClass('shown').show() //open the Sign in session

      }, 500)
      return false;
    }
    else
      return true;
  }


  mainSearch() {
    this.Search()
  }

  lecturesBySpeaker(id: number) {
    this.query_main = "";

    this.speaker = this.currentSpeakers.filter(function (s) {
      return s.id == id;
    })[0];

    this.checkLocalExistence(id);
  }

  pagingPrev() {
    this.iteration--;
    if (this.iteration <= 0) {
      this.iteration = 1;
    }
    else
      this.CreatePages();
  }

  pagindNext() {
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

  //---------------------------------------------------------------------------------------------------------------------------------------------------------

  Letter(id: string) {
    this.letters.forEach(function (l) {
      if (l.letter == id)
        l.current = true;
      else
        l.current = false;
    });


    // find the first ocurrence of the letter

    for (var i = 0; i < this.allSpeakers.length; i++) {
      if (this.allSpeakers[i].lastName[0] == id) {


        var page;
        if (i == 0)
          page = Math.ceil(1 / 28);
        else
          page = Math.ceil(i / 28);

        this.iterationAll = Math.ceil(page / 6);

        this.CreatePagesAllLetter(page);
        break;
      }
    }

  }

  PageAll(id: number) {
    this.pagesAll.forEach(function (p) {

      if (p.id != id)
        p.current = false;
      else
        p.current = true;
    })

    this.PopulatedShiriumAll(id);

  }

  pageNextAll() {
    this.iterationAll++;
    if (this.iterationAll > Math.ceil(this.allPagesAll / 6)) {
      this.iterationAll = Math.ceil(this.allPagesAll / 6);
    }
    else
      this.CreatePagesAll();
  }

  pagePrevAll() {
    this.iterationAll--;
    if (this.iterationAll <= 0) {
      this.iterationAll = 1;
    }
    else
      this.CreatePagesAll();
  }

  searchAll() {
    this.SearchAll()
  }

  addToQueue(id: string) {
    let self = this;

    if (self.isAuthenticated()) {
      var myShirium = new Shiurim();
      myShirium = self.shiriums.filter(function (s) {
        return s.id == id;
      })[0];

      self.queueService.setItem(myShirium, self.speaker.firstName + " " + self.speaker.lastName);
    }
  }

  Play(id: string, title: string) {
    var onlyAudio = title.includes('LT-Audio');
    this.playerService.Play(title, id, onlyAudio);
  }


  enter: boolean = false;
  ngOnInit() {
    this.ReadMainSpeaker();
    this.ReadAllSpeaker();
  }


  zIndex: number;
  width: string;
  height: number;
  position: string;
  left: number;
  top: number;
  background: string;


  FullScreen() {

    this.enter = !this.enter

    if (this.enter) {

      this.zIndex = $('.tile-box-speakers').css('z-index');
      this.width = $('.tile-box-speakers').css('width')
      this.height = $('.tile-box-speakers').css('height')
      this.position = $('.tile-box-speakers').css('position')
      this.left = $('.tile-box-speakers').css('left')
      this.top = $('.tile-box-speakers').css('top')
      this.background = $('.tile-box-speakers').css('background')

      $('.tile-box-speakers').css('z-index', '9999')
      $('.tile-box-speakers').css('width', ' 100%')
      $('.tile-box-speakers').css('height', ' 100%')
      $('.tile-box-speakers').css('position', ' fixed')
      $('.tile-box-speakers').css('left', ' 0')
      $('.tile-box-speakers').css('top', ' 0')
      $('.tile-box-speakers').css('background', 'rgb(255,255,255)')

      $('.tile-box-tab').forEach(function (a) {
        $(a).addClass('expanded')
      })
    }
    else {

      $('.tile-box-speakers').css('z-index', this.zIndex)
      $('.tile-box-speakers').css('width', this.width)
      $('.tile-box-speakers').css('height', this.height)
      $('.tile-box-speakers').css('position', this.position)
      $('.tile-box-speakers').css('left', this.left)
      $('.tile-box-speakers').css('top', this.top)
      $('.tile-box-speakers').css('background', this.background)

      $('.tile-box-tab').forEach(function (a) {
        $(a).removeClass('expanded')
      })

    }

  }


  filterChanged(value: string) {
    let self = this
    if (value == '#tile-tab-2') //if is 'my'
    {
      if (self.isAuthenticated())//needs credentials to access
        self.speakerService.readMy().subscribe(
          function (response) {

            self.current = "tile-tab-1"
            self.InitializeMySlide(response);

            self.speaker = response[0];
            self.ReadLectures(response[0].id);
          },
          function (error) {

          }, function () {

          });
    }
    else {
      if (localStorage.getItem("mainSpeakers") != null || localStorage.getItem("mainSpeakers") != '') {
        self.InitializeMySlide(JSON.parse(localStorage.getItem("mainSpeakers")));  //set the slide with "main"
      }

      if (value == '#tile-tab-1')  //if is "main"
      {
        self.current = "tile-tab-1"
        self.speaker = JSON.parse(localStorage.getItem("mainSpeakers"))[0]; //set the first                         
        self.checkLocalExistence(JSON.parse(localStorage.getItem("mainSpeakers"))[0].id); //get the lectures for the first


      }
      else  //if is all
      {
        self.current = "tile-tab-3"
      }

    }
  }


  ManageFavorites(id: number, isMy: boolean) {
    let self = this;
    if (isMy) {
      this.speakerService.deactivateSpeaker(id).subscribe(
        function (response) {
          self.speakers.forEach(function (s) {
            if (s.id == id)
              s.isMySpeaker = false;
          })
        }, function (error) { }, function () { }
      )
    }
    else {
      this.speakerService.activateSpeaker(id).subscribe(
        function (response) {
          self.speakers.forEach(function (s) {
            if (s.id == id)
              s.isMySpeaker = true;
          })
        }, function (error) { }, function () { }
      )
    }
  }

  Current(section: string) {
    return section == this.current;
  }

  Selected(id: number) {
    return id == this.speaker.id
  }


  SearchAll() {


    if (localStorage.getItem("allSpeakers") != null || localStorage.getItem("allSpeakers") != '') {
      this.allSpeakers = JSON.parse(localStorage.getItem("allSpeakers"));  //recover the originals
    }

    this.UpdateAll();
  }

  Search() {


    if (localStorage.getItem("shirium") != null || localStorage.getItem("shirium") != '') {
      this.allShiriums = JSON.parse(localStorage.getItem("shirium"));  //recover the originals
    }

    this.Update();
  }


  InitializeMySlide(data: Array<Speaker>) {
    this.currentSpeakers = data;
    this.RefreshSlide(data);

    let self = this;
    $('li[data-type="lecture"]').click(function () {

      var id = $(this).attr('id')

      self.ngZone.run(() => {
        self.lecturesBySpeaker(id)
      })

    })
  }

  RefreshSlide(data: Array<Speaker>) {

    var content = '<div class="slider-clip">' +
      '<ul class="slides">';

    data.forEach(function (a) {

      var image = a.picUrl != '' ? '<img  src="' + a.picUrl + '" alt="">' : ''

      content += '<li  class="slider-slide"   data-type="lecture" id="' + a.id + '"  >' +
        '<div class="slider-inner" >' +
        '<div class="slider-avatar">' +
        image +
        '</div><!-- /.slider-avatar -->' +

        '<div class="slider-content">' +
        '<h5>' + a.title + ' ' + a.firstName + ' ' + a.lastName + '</h5>' +
        '<p>' + a.totalShiurim + '  Shiurim</p>' +
        '</div><!-- /.slider-content -->' +
        '</div><!-- /.slider-inner -->' +
        '</li>'
    });
    content += '</ul>' +
      '</div>';


    $('.ballon .slider-profiles').html(content);

    $('.ballon .slider-profiles .slides').slick({
      dots: false,
      arrows: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1624,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 1424,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 1224,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 678,
          settings: {
            slidesToShow: 1
          }
        }]
    });


  }


  //-------------------------------------------------------------------------------------------------------------------------
  ReadAllSpeaker() {

    this.speakerService.read().subscribe(
      result => this.InitializeAllSpeakers(result)
    )

  }

  InitializeAllSpeakers(data: Array<Speaker>) {
    this.letters.forEach(function (l) {

      l.disable = false;  //first reset

      if (data.filter(function (s) {
        return s.lastName[0] == l.letter;
      }).length == 0) {
        l.disable = true;
      }
    });

    this.myEventSpeakers.next(data.length.toString())

    this.allSpeakers = data;
    localStorage.setItem("allSpeakers", JSON.stringify(this.allSpeakers));     //save the originals
    this.UpdateAll();
  }

  UpdateAll() {
    if (this.query_all != "")  //if exist some filter
    {
      var query = this.query_all;
      this.allSpeakers = this.allSpeakers.filter(function (s) {
        return s.lastName.toLowerCase().includes(query.toLowerCase()) || s.firstName.toLowerCase().includes(query.toLowerCase());
      });
    }

    this.allPagesAll = this.allSpeakers.length / 28;
    this.iterationAll = 1;

    this.CreatePagesAll();
  }

  UpdateByLetterAll() {

  }

  CreatePagesAll() {
    this.pagesAll = [];

    for (var i = this.iterationAll * 6 - 6; i < this.iterationAll * 6 && i < this.allPagesAll; i++) //populate the pages array
    {
      if (i == (this.iterationAll - 1) * 6) {
        this.pagesAll.push({ id: i + 1, current: true });
        this.PopulatedShiriumAll(i + 1);  //the page            
      }
      else
        this.pagesAll.push({ id: i + 1, current: false });
    }


  }

  CreatePagesAllLetter(page: number) {
    this.pagesAll = [];

    for (var i = this.iterationAll * 6 - 6; i < this.iterationAll * 6 && i < this.allPagesAll; i++) //populate the pages array
    {
      if (i == (page - 1)) {
        this.pagesAll.push({ id: i + 1, current: true });
        this.PopulatedShiriumAll(i + 1);  //the page            
      }
      else
        this.pagesAll.push({ id: i + 1, current: false });
    }


  }

  PopulatedShiriumAll(id: number) {
    this.speakers = [];
    for (var i = id * 28 - 28; i < id * 28 && i < this.allSpeakers.length; i++) {
      this.speakers.push(this.allSpeakers[i]);  //populate the grid
    }

  }

  keyDownSpeakerAllFunction(event) {

    this.SearchAll()

  }

  //---------------------------------------------------------------------------------------------------------------------- 

  ReadMainSpeaker() {
    this.myEvent.next(true)
    this.speakerService.readMain().subscribe(
      result => this.InitializeMainSpeakers(result)
    )

  }

  InitializeMainSpeakers(data: Array<Speaker>) {
    this.myEvent.next(false)
    this.currentSpeakers = data;

    localStorage.setItem("mainSpeakers", JSON.stringify(data));

    this.speaker = data[0];

    this.checkLocalExistence(data[0].id);
  }

  checkLocalExistence(id: number) {
    let self = this;

    if ($('#field-8').val() == '#tile-tab-2') //if is 'my'
    {
      self.ReadLectures(id);
      return;
    }

    var mains = JSON.parse(localStorage.getItem("mainSpeakers")) //get the mainspeakers
    var totalShiurim = mains.filter(function (s) {
      return s.id == id;
    })[0].totalShiurim;    //get the totalshirium by speaker

    var user = this.databaseService.getSpeakerbyId(id.toString())
    if (user.length > 0 && user[0].data.length == totalShiurim)  //if user exist and the amount of shirium is equal  
    {
      self.FillShirium(user[0].data); //use the local backup
    }
    else //in other case
    {
      self.ReadLectures(id); //call the webservice 
    }


  }

  FillShirium(data: any) {
    this.allShiriums = data;

    localStorage.setItem("shirium", JSON.stringify(data));

    this.Update();
  }

  ReadLectures(idSpeaker: number) {
    let self = this;
    self.myEvent.next(true)

    this.shiurimService.read(idSpeaker).subscribe(
      function (respond) {
        self.myEvent.next(false)


        self.FillShirium(respond);

        //-----------------------------------------------------------------------------------//  

        self.databaseService.Manage(idSpeaker.toString(), respond);//create the local backup              
      },
      function (error) { },
      function () { }
    )

  }

  Update() {

    if (this.query_main != "") {
      var query = this.query_main;
      this.allShiriums = this.allShiriums.filter(function (s) {
        return s.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    this.speaker.totalShiurim = this.allShiriums.length;

    this.allPages = this.allShiriums.length / 28; //pagination
    this.iteration = 1; //pagination

    this.CreatePages();

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
    this.shiriums = [];
    for (var i = id * 28 - 28; i < id * 28 && i < this.allShiriums.length; i++) {
      this.shiriums.push(this.allShiriums[i]);  //populate the grid
    }

  }


  keyDownSpeakerFunction(event) {

    this.Search()

  }



  //---------------------------------------------------------------------------------------------------------------------- 

  Back() {
    this.current = "tile-tab-3"
    this.detailed = false
  }

  Detailed(id: number) {


    this.query_main = "";

    this.speaker = this.allSpeakers.filter(function (s) {
      return s.id == id;
    })[0];

    this.ReadLectures(id);

    this.current = "tile-tab-1"
    this.detailed = true

  }

  Download(s: Shiurim) {
    if (s.sponsored) {
      //download
    }
    else {

      if (this.isAuthenticated()) {
        $("#downloadShirium").toggleClass('shown');
        this.shiurimService.setItem(s)
      }


    }
  }

}
