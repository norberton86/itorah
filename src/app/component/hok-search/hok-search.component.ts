import { Component, OnInit, NgZone, Input } from '@angular/core';
import { HokService } from '../../service/hok.service';
import { PlayerService } from '../../service/player.service';
import { QueueService } from '../../service/queue.service';
import { Chumash } from '../../model/Hok/chumash';
import { Parasha } from '../../model/Hok/parasha';

import { Hok } from '../../model/shiurim';

declare var $: any;

@Component({
  selector: 'app-hok-search',
  templateUrl: './hok-search.component.html',
  styleUrls: ['./hok-search.component.css'],
  providers: [HokService, PlayerService]
})
export class HokSearchComponent implements OnInit {

  selectedChumash: number;
  chumashs: Array<Chumash>;

  selectedParasha: number;
  parashas: Array<Parasha>;

  originalHoks: Array<Hok>
  hoks: Array<Hok>
  classes: Array<string>
  selectedClass: string = "Class"

  @Input()
  accion: string = "";
  rendering: boolean = false;

  currentId: string = ""

  query_main: string = '';

  constructor(private hokService: HokService, private playerService: PlayerService, private ngZone: NgZone, private queueService: QueueService) {
    this.originalHoks = [];
    this.hoks = [];
    this.classes = [];
  }



  ngOnInit() {

    let self = this
    $('.ballon #field-search-parasha').change(function () {   //parasha

      var id = parseInt($(this).val().split(":")[1]) //id

      self.selectedParasha = id;
      self.ReadHok()

    });

    $('.ballon #field-search-chumash').change(function () {   //chumash

      var id = parseInt($(this).val().split(":")[1]) //id

      self.selectedChumash = id;
      self.ReadParasha(id)

    });

    $('.ballon #field-search-class').change(function () {   //chumash

      var id = $(this).val().split(":")[1].trim() //id

      self.selectedClass = id;
      self.hoks = self.HoksbyClass()

    });

    this.ReadChumash()
  }

  ReadChumash() {
    let self = this;
    this.hokService.readChumash().subscribe(
      function (response) {

        self.chumashs = response;

        self.selectedChumash = response[0].id;

        self.ReadParasha(self.selectedChumash);

      }, function (error) { }, function () { }
    )
  }


  ReadParasha(idChumash: number) {
    let self = this;
    this.hokService.readParasha(idChumash).subscribe(
      function (response) {
        self.parashas = response;
        self.selectedParasha = response[0].id;
        self.ReadHok()

      }, function (error) { }, function () { }
    )
  }

  AddClass(c: string, response: Array<Hok>) {
    for (var index = 0; index < response.length; index++) {
      if (response[index].myClass == c) {
        this.classes.push(c)
        break;
      }
    }
  }


  ReadHok() {
    let self = this;
    this.hokService.readHok(self.selectedChumash, self.selectedParasha).subscribe(
      function (response) {


        self.classes = ["Class"]
        self.AddClass("Additional", response);
        self.AddClass("Rashi", response);
        self.selectedClass = "Class"
        self.originalHoks = response;

        self.hoks = self.HoksbyClass()

      }, function (error) { }, function () { }
    )
  }

  HoksbyClass(): Array<Hok> {
    let self = this;
    return this.originalHoks.filter(function (s) {
      return s.myClass == self.selectedClass;
    })
  }


  Play(id: string, title: string) {
    // var onlyAudio = title.includes('LT-Audio');
    this.playerService.PlayAudio(title, id);
  }

  Add(id: string) {


    var myShirium = new Hok();
    myShirium = this.hoks.filter(function (s) {
      return s.id == id;
    })[0];

    this.queueService.setItem(myShirium, "Rabbi Eli J Mansour", 2);
  }



}
