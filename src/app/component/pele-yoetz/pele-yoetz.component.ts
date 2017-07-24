import { Component, OnInit, NgZone,Input } from '@angular/core';


import { Pele } from '../../model/Pele';
import { PeleService } from '../../service/pele.service';

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

 @Input()
   accion:string="";
   rendering:boolean=false;


  constructor(private peleService: PeleService, private ngZone: NgZone) {

  }

   ngOnChanges(changes:any) {
     if(changes.accion!=null&&!changes.accion.firstChange)
     {
       this.rendering=true;   
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


    if(!this.rendering)  //the first time don't renderize
        return;

    let self = this;

    setTimeout(function () {

      $('#ballon').html($('#item-content-5').html());
      $('#ballon .search-btn').click(function () {

       self.Search();

      })

      $('#ballon form').submit(function(e){
         e.preventDefault();
         self.query_main= $('#ballon [type="search"]').val()
         self.Search();

      })

      $('#ballon .search-field').val(self.query_main);

    }, 500)
  }


  Search()
  {

  let self=this;

 self.ngZone.run(() => {

          self.query_main = $('#ballon .search-field').val();  //update the query field in my component (remenber double data binding)

          if (localStorage.getItem("peles") != null || localStorage.getItem("peles") != '') {
            self.peles = JSON.parse(localStorage.getItem("peles"));  //recover the originals
          }

          self.Update();
        })


  }

}
