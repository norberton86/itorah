import { Component, OnInit, NgZone } from '@angular/core';


import { Pele } from '../../model/Pele';
import { PeleService } from '../../service/pele.service';
import { PlayerService } from '../../service/player.service';

declare var $: any;

@Component({
  selector: 'app-pele-yoetz',
  templateUrl: './pele-yoetz.component.html',
  styleUrls: ['./pele-yoetz.component.css'],
  providers: [PeleService]
})
export class PeleYoetzComponent implements OnInit {

  peles: Array<Pele> = [];
  query_main: string = '';
  amount: number = 0;
  
  currentId:string=""



  constructor(private peleService: PeleService, private ngZone: NgZone, private playerService: PlayerService) {

  }

 
  

  ngOnInit() {
    this.ReadPele();
  }

  ReadPele() {
    let self = this;
    self.peleService.read().subscribe(
      function (response) {
        self.peles = response;
        localStorage.setItem("peles", JSON.stringify(response));
        self.Update();

      }, function (error) { }, function () { }
    )

  }

  Update() {

    if (this.query_main != "") {
      var query = this.query_main;
      this.peles = this.peles.filter(function (s) {
        return s.title.toLowerCase().includes(query.toLowerCase());
      });

    }
    this.RefreshView()

  }


  Play(title:string,url:string)
  {
        this.playerService.PlayAudio(title, url,"")
  }  


  keyDownPeleFunction(event)
  {
     this.Search()
  }

  RefreshView() {

    this.amount = this.peles.length;


    let self = this;

    setTimeout(function () {


      $.contextMenu({
        selector: '.ballon .link-more',
        trigger: 'left',
        callback: function (key, options) {

          var p =self.peles.filter(function (s) {
                 return s.id== parseInt( self.currentId);
               })[0];

        $('.ballon #download').attr('href',p.audioUrl);  //http://itorah.3nom.com/music.mp3

          
          switch(key)
          {
             case 'hebrewPdf':  window.open(p.hebrewPDF); break;
             case 'englishPdf': window.open(p.englishPDF); break;
             case 'mp3':document.getElementById('download').click(); break;
          }
        },
        items: {
          "hebrewPdf": { name: "Hebrew PDF", icon: "fa-file-pdf-o" },
          "englishPdf": { name: "English PDF", icon: "fa-file-pdf-o" },
          "mp3": { name: "Download", icon: "fa-file-audio-o" }
        }
      });


    }, 500)
  }


  Search() {

    let self = this;

      if (localStorage.getItem("peles") != null || localStorage.getItem("peles") != '') {
        self.peles = JSON.parse(localStorage.getItem("peles"));  //recover the originals
      }

      self.Update();

  }

  More(value)
  {
     this.currentId=value 
  }

}
