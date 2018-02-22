import { Component, OnInit } from '@angular/core';

import { AllParasha } from '../../model/perasha';
import { PerashaService, InspireSearch, ParashaInspire } from '../../service/perasha.service';
import { PlayerService } from '../../service/player.service';
import { PrintService } from '../../service/print.service';

declare var $: any;

@Component({
  selector: 'app-inspire-search',
  templateUrl: './inspire-search.component.html',
  styleUrls: ['./inspire-search.component.css'],
  providers: [PrintService]
})
export class InspireSearchComponent implements OnInit {


  perashas: Array<ParashaInspire>;
  selectedPerasha: ParashaInspire = null;
  clipTitle: string;
  parragraphs: Array<string>;
  allParasha: Array<AllParasha> = []

  content: string = ''

  last: ParashaInspire
  more: boolean = true;

  matrix: any = [];
  visited: Array<number> = []
  data: Array<any> = []

  optional: boolean = false

  downloadUrl:string



  constructor(private perashaService: PerashaService, private playerService: PlayerService, private printService: PrintService) {
    this.perashas = [];
    this.parragraphs = [];

    this.last = new ParashaInspire()
    this.last.ID = 999
    this.last.ParashaName = "More..."


    this.perashaService.getOption().subscribe(option => {

      if (option == "more"){
       this.selectedPerasha = this.perashas[this.perashas.length - 1]  //more always in the last position
      }
      else
      {
        this.selectedPerasha = this.perashas[0]
        this.downloadUrl=this.selectedPerasha.Audio
      }
        

      this.filterChanged()
    })

  }

  ngOnInit() {
    this.ReadParasha();
    this.AllParashas();
  }

  Back() {
    this.more = true

  }

  ReadParasha() {

    this.perashaService.readByParashaInspire().subscribe(
      response => {
        this.perashas = response;

        //add the last element
        this.perashas.push(this.last);

        this.selectedPerasha = this.perashas[this.perashas.length - 1];
        this.content = this.selectedPerasha.Content
        this.downloadUrl=this.selectedPerasha.Audio

      }, error => { }, () => { }
    )

  }

  AllParashas() {

    this.perashaService.readAll().subscribe(
      response => {
        this.allParasha = response;
        this.CreateTable();

      }, error => { }, () => { }
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

  readByParasha(id: number) {

    if (this.visited.find(a => a == id))
      return;

    this.visited.push(id);

    let self = this;
    this.perashaService.readByParasha(id).subscribe(
      function (response) {

        if (!Array.isArray(response)) {
          self.CreateErrorMessage(id)
          return
        }


        self.SaveData(response);

        var obj = '{';
        for (var i = 0; i < response.length; i++) {
          if (i == response.length - 1)
            obj += '"' + response[i].id + '":{"name":"' + response[i].title + '","icon":"fa-book"}'
          else
            obj += '"' + response[i].id + '":{"name":"' + response[i].title + '","icon":"fa-book"},'
        }
        obj += '}'

        $.contextMenu({
          selector: '#wpInspireSearch' + id,
          trigger: 'left',
          callback: function (key, options) {
            self.ShowParashaTotal(key);
          },
          items: JSON.parse(obj)
        });

        $('#wpInspireSearch' + id).contextMenu();

      }, function (error) { }, function () { }
    )
  }

  CreateErrorMessage(id: number) {

    $.contextMenu({
      selector: '#wpInspireSearch' + id,
      trigger: 'left',
      items: {
        "quit": { name: "There are no Weekly Inspire lessons for this parasha", icon: "fa-ban" }
      }
    });

    $('#wpInspireSearch' + id).contextMenu();
  }


  SaveData(_data: Array<any>) {
    this.data = this.data.concat(_data)
  }

  ShowParashaTotal(id: any) {
    var p = this.data.filter(function (s) {
      return s.id == id
    })[0]

    this.content = p.content

    this.titleInOptional = p.title

    this.downloadUrl=p.audio

    this.more = false;
    this.optional = true
  }

  titleInOptional: string = ''


  filterChanged() {
    if (this.selectedPerasha.ParashaName == "More...") {
      this.more = true;
    }
    else {
      this.more = false;
      this.optional = false

      this.content = this.selectedPerasha.Content;
      this.downloadUrl=this.selectedPerasha.Audio
    }
  }

  Print() {
    this.printService.Print('printInspireSearch')
  }

  Play() {
    this.playerService.PlayAudio("", this.selectedPerasha.Audio, "", 15, this.selectedPerasha.ID.toString())
  }

  Download()
  {
    document.getElementById('inspireSearchDownload').click()
  }
}


