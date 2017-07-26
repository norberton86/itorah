import { Component, OnInit, NgZone, Input } from '@angular/core';


import { Pele } from '../../model/Pele';
import { PeleService } from '../../service/pele.service';
import { PlayerService } from '../../service/player.service';

declare var $: any;

@Component({
  selector: 'app-pele-yoetz',
  templateUrl: './pele-yoetz.component.html',
  styleUrls: ['./pele-yoetz.component.css'],
  providers: [PeleService, PlayerService]
})
export class PeleYoetzComponent implements OnInit {

  peles: Array<Pele> = [];
  query_main: string = '';
  amount: number = 0;
  
  currentId:string=""

  @Input()
  accion: string = "";
  rendering: boolean = false;


  constructor(private peleService: PeleService, private ngZone: NgZone, private playerService: PlayerService) {

  }

  ngOnChanges(changes: any) {
    if (changes.accion != null && !changes.accion.firstChange) {
      this.rendering = true;
      this.RefreshView();
    }

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


  RefreshView() {

    this.amount = this.peles.length;
    if (!this.rendering)  //the first time don't renderize
      return;

    let self = this;

    setTimeout(function () {

      $('#ballon').html($('#item-content-5').html());
      $('#ballon .search-btn').click(function () {

        self.Search();

      })

      $('#ballon form').submit(function (e) {
        e.preventDefault();
        self.query_main = $('#ballon [type="search"]').val()
        self.Search();

      })

      $('#ballon .play-secondary').click(function () {

        var title = $(this).attr('title');
        var url = $(this).attr('data-url');
        self.playerService.PlayAudio(title, url)

      })

      $.contextMenu({
        selector: '#ballon .link-more',
        trigger: 'left',
        callback: function (key, options) {

          var p =self.peles.filter(function (s) {
                 return s.id== parseInt( self.currentId);
               })[0];

        $('#ballon #download').attr('href',p.audioUrl);  //http://itorah.3nom.com/music.mp3

          
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

      $('#ballon .link-more').click(function(){  //click over more...

          self.currentId=$(this).attr('data-value') 
      })

      $('#ballon .search-field').val(self.query_main);

    }, 500)
  }


  Search() {

    let self = this;

    self.ngZone.run(() => {

      self.query_main = $('#ballon .search-field').val();  //update the query field in my component (remenber double data binding)

      if (localStorage.getItem("peles") != null || localStorage.getItem("peles") != '') {
        self.peles = JSON.parse(localStorage.getItem("peles"));  //recover the originals
      }

      self.Update();
    })


  }

}
