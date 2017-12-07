import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import { EmunahService } from '../../service/emunah.service';
import { PlayerService } from '../../service/player.service';
import {  Emuna } from '../../model/emuna';
import { Page } from '../../model/page';
declare var $: any;

@Component({
  selector: 'app-emunah-search',
  templateUrl: './emunah-search.component.html',
  styleUrls: ['./emunah-search.component.css'],
  providers: [EmunahService, PlayerService]
})
export class EmunahSearchComponent implements OnInit {

  allEmunas: Array<Emuna>;
  emunas: Array<Emuna>;
  query_main: string = '';Z

  amount: number;

  pages: Array<Page>;
  allPages: number;
  iteration: number;

  valor: string = ""

  constructor(private emunahService: EmunahService, private playerService: PlayerService, private renderer: Renderer2, private ngZone: NgZone) {
    this.allEmunas = [];
    this.emunas = [];

    this.pages = [];
  }


  keyDownEmunahFunction(event) {
    this.Search()
  }


  searchShiriumEmunah() {
    this.Search()
  }

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

  PLayEmunah(id: string, title: string) {
    var onlyAudio = title.includes('LT-Audio');
    this.playerService.PlayAudio(title, id,"");
  }

  ngOnInit() {
    this.ReadLectures();

  }

  Search() {


    if (localStorage.getItem("emuna") != null || localStorage.getItem("emuna") != '') {
      this.allEmunas = JSON.parse(localStorage.getItem("emuna"));  //recover the originals
    }

    this.Update();
  }

  ReadLectures() {
    let self = this;
    this.emunahService.read().subscribe(
      function (respond) {


        self.allEmunas = respond;

        localStorage.setItem("emuna", JSON.stringify(respond));

        self.Update();
      },
      function (error) { },
      function () { }
    )

  }

  Update() {

    if (this.query_main != "") {
      var query = this.query_main;
      this.allEmunas = this.allEmunas.filter(function (s) {
        return s.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    this.amount = this.allEmunas.length;

    this.allPages = this.allEmunas.length / 9; //pagination
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
    this.emunas = [];
    for (var i = id * 9 - 9; i < id * 9 && i < this.allEmunas.length; i++) {
      this.emunas.push(this.allEmunas[i]);  //populate the grid
    }

  }



}
