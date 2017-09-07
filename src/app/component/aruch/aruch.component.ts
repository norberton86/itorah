import { Component, OnInit } from '@angular/core';
import { AruchService } from '../../service/aruch.service';
import { Siman } from '../../model/siman';

@Component({
  selector: 'app-aruch',
  templateUrl: './aruch.component.html',
  styleUrls: ['./aruch.component.css'],
  providers:[AruchService]
})
export class AruchComponent implements OnInit {

  query_main:string=''
  simans:Array<Siman>=[]
  selected:boolean=false;
  siman:Siman

  constructor(private aruchService:AruchService) { }

   ngOnInit() {
    this.Read();
  }

  Read()
  {
      let self=this;
      this.aruchService.read().subscribe(
           function(respond){
              self.simans=respond;
           },
           function(error){},
           function(){}
       )
   
  }

  Back()
  {
    this.selected=false;
  }

  Select(id:number)
  {
    this.selected=true;
    this.siman=this.simans.filter(i=>i.id==id)[0]

  }

  ReadPdf()
  {
      window.open(this.siman.pdf)
  }

}
