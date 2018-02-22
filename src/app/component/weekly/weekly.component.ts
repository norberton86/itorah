import { Component, OnInit, NgZone, Renderer2, Input,OnChanges } from '@angular/core';

import { Perasha, AllParasha } from '../../model/perasha';
import { PerashaService } from '../../service/perasha.service';
import { PlayerService } from '../../service/player.service';

declare var $: any;

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  providers: [PlayerService]
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

   // this.selectedPerasha = this.last

  }

  ngOnInit() {
    this.ReadParasha();
    this.AllParashas();
  }

  
  ngOnChanges(changes: any) {
    if(!changes.valCombo.isFirstChange())
    {
         if(changes.valCombo.currentValue=="more")
          this.selectedPerasha=this.perashas[this.perashas.length-1]  //more always in the last position
         else
          this.selectedPerasha=this.perashas[0]

          this.filterChanged()
    }

  }

  Back() {
    this.more = true

  }
  ReadParasha() {
    
    this.perashaService.read().subscribe(
      response=> {
        this.perashas = response;

        //add the last element
        this.perashas.push(this.last);

        this.selectedPerasha = this.perashas[0];
        this.parragraphs = this.selectedPerasha.emailText.split("\n").filter(s=>s != "");

      }, error=> { }, ()=> { }
    )

  }

  AllParashas() {
    
    this.perashaService.readAll().subscribe(
      response=> {
        this.allParasha = response;
        this.CreateTable();

      }, error=> { }, ()=> { }
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
    var p = this.data.filter(function (s) {
      return s.id == id
    })[0]

    this.parragraphs = p.emailText.split("\n").filter(function (s) {
      return s != "";
    });

   this.titleInOptional=p.clipTitle

    this.more = false;
    this.optional = true
  }

  titleInOptional:string=''


  filterChanged() {
    if (this.selectedPerasha.parashaName == "More...") {
      this.more = true;
    }
    else {
      this.more = false;
      this.optional = false

      this.parragraphs = this.selectedPerasha.emailText.split("\n").filter(s=>s != "");
    }
  }

  Print() {
    $('#print').print();
  }

  Play() {

    this.playerService.PlayAudio("", this.selectedPerasha.audio,"",16,this.selectedPerasha.id.toString())

  }
}
