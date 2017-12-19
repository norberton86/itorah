import { Component, OnInit } from '@angular/core';
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
  providers: [HokService]
})
export class HokSearchComponent implements OnInit {

  selectedChumash: number;
  chumashs: Array<Chumash>;

  selectedParasha: number;
  parashas: Array<Parasha>;

  hoks: Array<Hok>
  classes: Array<string>=["Class","Additional","Rashi"]
  selectedClass: string = "Class"

  defaultChumash:number;
  defaultparasha:number;
  firstTime:boolean=true

  query_main: string = '';

  constructor(private hokService: HokService, private playerService: PlayerService,  private queueService: QueueService) {
    
    this.hoks = [];
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
      
      self.ReadHok()
    });

    this.ReadDefault()
  }

  ReadDefault()
  {
  
    let self = this;
    this.hokService.readDefault().subscribe(
      function (response) {
        self.defaultChumash = response.ChumashID;
        self.defaultparasha = response.ParashaID;
        self.ReadChumash()

      }, function (error) { }, function () { }
    )
  
  }

  ReadChumash() {
   
    this.chumashs = [{id:1,name: "Bereshit"},{id:2,name: "Shemot"},{id:3,name: "Vayikra"},{id:4,name: "Bamidbar"},{id:5,name: "Devarim"}];

    if(!this.firstTime)
    this.selectedChumash = this.chumashs[0].id;
    else
    this.selectedChumash = this.defaultChumash;

    this.ReadParasha(this.selectedChumash);

  }

  ReadParasha(idChumash: number) {
    let self = this;
    this.hokService.readParasha(idChumash).subscribe(
      function (response) {
        self.parashas = response;

        if(!self.firstTime)
        self.selectedParasha = response[0].ID;
        else
        {
          self.selectedParasha = self.defaultparasha;
          self.firstTime=false;
        }
        
        
        self.ReadHok()

      }, function (error) { }, function () { }
    )
  }

  ReadHok() {
    let self = this;
    this.hokService.readHok(self.selectedParasha, self.selectedClass).subscribe(
      function (response) {

        self.hoks = response;

      }, function (error) { }, function () { }
    )
  }

  Play(id: string, title: string) {
    // var onlyAudio = title.includes('LT-Audio');
    this.playerService.PlayAudio(title, id,"");
  }

  Add(id: string) {


    var myShirium = new Hok();
    myShirium = this.hoks.filter(function (s) {
      return s.id == id;
    })[0];

    this.queueService.setItem(myShirium, "Rabbi Eli J Mansour");
  }

}
