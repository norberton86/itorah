import { Component, OnInit } from '@angular/core';
import { ShibaService } from '../../service/shiba.service';
import { Shiba } from '../../model/shiba';
import { Page } from '../../model/page';

@Component({
  selector: 'app-shiba',
  templateUrl: './shiba.component.html',
  styleUrls: ['./shiba.component.css'],
  providers: [ShibaService]
})
export class ShibaComponent implements OnInit {

  shibas: Array<Shiba> = []
  allShibas: Array<Shiba> = []

  amount: number;

  pages: Array<Page> = [];
  allPages: number;
  iteration: number;

  constructor(private shibaService: ShibaService) { }

  ngOnInit() {
    this.Read();
  }

  Read() {
    let self = this;
    this.shibaService.read().subscribe(
      function (respond) {
        self.allShibas = respond;
        self.allShibas.forEach(element => {

               element.children=[]
               element.sibblings=[]

              var results= element.familyMembers.split("Children:")
              if(results[0]=="")
              element.spouse=""
              else
               element.spouse=element.familyMembers.split("Children:")[0].split("Wife:")[1]

               element.children=element.familyMembers.split("Children:")[1].split('Siblings:')[0].split(",")

               if(element.familyMembers.split('Siblings:').length>1)
               element.sibblings=element.familyMembers.split('Siblings:')[1].split(",")


               


        });
        self.Update();
      },
      function (error) { },
      function () { }
    )

  }

  Update() {

    this.amount = this.allShibas.length;

    this.allPages = this.allShibas.length / 4; //pagination
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
    this.shibas = [];
    for (var i = id * 4 - 4; i < id * 4 && i < this.allShibas.length; i++) {
      this.shibas.push(this.allShibas[i]);  //populate the grid
    }

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

}
