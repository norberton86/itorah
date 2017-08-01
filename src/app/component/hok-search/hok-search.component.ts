import { Component, OnInit, NgZone, OnChanges, Input } from '@angular/core';
import { HokService } from '../../service/hok.service';
import { PlayerService } from '../../service/player.service';
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
export class HokSearchComponent implements OnInit, OnChanges {

  selectedChumash: number;
  chumashs: Array<Chumash>;

  selectedParasha: number;
  parashas: Array<Parasha>;

  originalHoks:Array<Hok>
  hoks: Array<Hok>
  classes:Array<string>
  selectedClass:string="Class"

  @Input()
  accion: string = "";
  rendering: boolean = false;

  constructor(private hokService: HokService, private playerService: PlayerService, private ngZone: NgZone) {
    this.originalHoks=[];
    this.hoks = [];
    this.classes=[];
  }

  ngOnChanges(changes: any) {
    if (changes.accion != null && !changes.accion.firstChange) {
      this.rendering = true;
      this.RefreshView();
    }

  }

  ngOnInit() {
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

  AddClass(c:string,response:Array<Hok>)
  {
     for (var index = 0; index < response.length; index++) {
          if(response[index].myClass==c)
          {
            this.classes.push(c)
            break;       
          }
     }
  }


  ReadHok() {
    let self = this;
    this.hokService.readHok(self.selectedChumash, self.selectedParasha).subscribe(
      function (response) {


       self.classes=["Class"]
       self.AddClass("Additional",response);
       self.AddClass("Rashi",response);
       self.selectedClass="Class"
       self.originalHoks = response;

       self.hoks=self.HoksbyClass()
       self.RefreshView();

      }, function (error) { }, function () { }
    )
  }

  HoksbyClass():Array<Hok>
  {
      let self=this; 
      return this.originalHoks.filter(function (s) {
                 return s.myClass==self.selectedClass;
               })
  }


  RefreshView() {

    if (!this.rendering)  //the first time don't renderize
      return;

    let self = this;

    setTimeout(function () {

      $('#ballon').html($('#item-content-6').html());
      $('#ballon #field-search-parasha').val($('#item-content-6 #field-search-parasha').val())
      $('#ballon #field-search-chumash').val($('#item-content-6 #field-search-chumash').val())
      $('#ballon #field-search-class').val($('#item-content-6 #field-search-class').val())

      
      $('#ballon #field-search-parasha').change(function () {   //parasha

        var id = parseInt($(this).val().split(":")[1]) //id
        //self.comunityRaw=$(this).val();

        self.ngZone.run(() => {

          self.selectedParasha = id;
          self.ReadHok()

        })
      });

      $('#ballon #field-search-chumash').change(function () {   //chumash

        var id = parseInt($(this).val().split(":")[1]) //id
        //self.comunityRaw=$(this).val();

        self.ngZone.run(() => {

          self.selectedChumash = id;
          self.ReadParasha(id)

        })
      });

       $('#ballon #field-search-class').change(function () {   //chumash

        var id = $(this).val().split(":")[1].trim() //id
        

        self.ngZone.run(() => {
             
             self.selectedClass=id;
             self.hoks=self.HoksbyClass()
             self.RefreshView();

        })
      });

      //---------------------------------

      $("[data-type='media']").click(function () {

        var id = $(this).attr('id')
        var title = $(this).attr('title')

       // var onlyAudio = title.includes('LT-Audio');
        self.playerService.PlayAudio(title, id);

      })

    }, 500)

  }

}
