import { Component, OnInit, NgZone, Renderer2, Input,OnChanges } from '@angular/core';

import { Perasha, AllParasha } from '../../model/perasha';
import { PerashaService } from '../../service/perasha.service';
import { PlayerService } from '../../service/player.service';

declare var $: any;

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  providers: [PerashaService, PlayerService]
})
export class WeeklyComponent implements OnInit,OnChanges {

  perashas: Array<Perasha>;
  selectedPerasha: Perasha = null;
  clipTitle: string;
  parragraphs: Array<string>;
  allParasha: Array<AllParasha> = []

  last: Perasha
  more: boolean = false;

  matrix: any = [];
  visited: Array<number> = []
  data: Array<any> = []

  optional: boolean = false

  @Input()
  valCombo: string;

  constructor(private renderer: Renderer2, private perashaService: PerashaService, private ngZone: NgZone, private playerService: PlayerService) {
    this.perashas = [];
    this.parragraphs = [];

    this.last = new Perasha()
    this.last.id = 999
    this.last.parashaName = "More..."

    this.selectedPerasha = this.last

  }

  ngOnInit() {
    this.ReadParasha();
    this.AllParashas();
  }

  
  ngOnChanges(changes: any) {
    if(!changes.valCombo.isFirstChange())
    {
         if(changes.valCombo.currentValue=="more")
         this.filterChanged('More...')
         else
          this.filterChanged(this.perashas[0].parashaName)
    }

  }

  Back() {
    this.more = true
  }
  ReadParasha() {
    let self = this;
    this.perashaService.read().subscribe(
      function (response) {
        self.perashas = response;

        //add the last element
        self.perashas.push(self.last);

        self.selectedPerasha = response[0];
        self.parragraphs = response[0].emailText.split("\n").filter(function (s) {
          return s != "";
        });

      }, function (error) { }, function () { }
    )

  }



  AllParashas() {
    let self = this;
    this.perashaService.readAll().subscribe(
      function (response) {
        self.allParasha = response;
        self.CreateTable();

      }, function (error) { }, function () { }
    )
  }

  CreateTable() {
    var total = this.allParasha.length
    var elePage = 5;
    var pages = total / elePage;


    var k = 0;
    for (var i = 0; i < pages; i++) {
      this.matrix.push([]);
      for (var j = 0; j < 5; j++) {
        if (k == total)
          break;

        this.matrix[i].push(k);
        k++;
      }
    }

  }

  readById(id: number) {

    if (this.visited.find(a => a == id))
      return;

    this.visited.push(id);

    let self = this;
    this.perashaService.readById(id).subscribe(
      function (response) {

        self.SaveData(response);

        var obj = '{';
        for (var i = 0; i < response.length; i++) {
          if (i == response.length - 1)
            obj += '"' + response[i].id + '":{"name":"' + response[i].clipTitle + '","icon":"fa-book"}'
          else
            obj += '"' + response[i].id + '":{"name":"' + response[i].clipTitle + '","icon":"fa-book"},'
        }
        obj += '}'

        $.contextMenu({
          selector: '#wp' + id,
          trigger: 'left',
          callback: function (key, options) {
            self.ShowParashaTotal(key);
          },
          items: JSON.parse(obj)
        });

        $('#wp' + id).contextMenu();

      }, function (error) { }, function () { }
    )
  }


  SaveData(_data: Array<any>) {
    this.data = this.data.concat(_data)
  }

  ShowParashaTotal(id: any) {
    this.selectedPerasha = this.data.filter(function (s) {
      return s.id == id
    })[0]

    this.parragraphs = this.selectedPerasha.emailText.split("\n").filter(function (s) {
      return s != "";
    });

    this.more = false;
    this.optional = true
  }


  filterChanged(value) {
    if (value == "More...") {
      this.more = true;
    }
    else {
      this.more = false;
      this.optional = false

      this.selectedPerasha = this.perashas.filter(function (s) { //select by name
        return s.parashaName == value
      })[0]

      this.parragraphs = this.selectedPerasha.emailText.split("\n").filter(function (s) {
        return s != "";
      });
    }
  }

  Print() {
    $('#print').print();
  }

  Play() {

    this.playerService.PlayAudio("", this.selectedPerasha.audio,"")

  }
}
