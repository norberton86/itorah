import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { GemaraService } from '../../service/gemara.service';
import { Gemara,DropGemara } from '../../model/gemara';

@Component({
  selector: 'app-file-shower',
  templateUrl: './file-shower.component.html',
  styleUrls: ['./file-shower.component.css'],
  providers: [GemaraService]
})
export class FileShowerComponent implements OnInit {

  right: string = ''
  left: string = ''

  masachets:Array<DropGemara>=[]
  masachet:DropGemara
  pages:Array<DropGemara>=[]
  page:DropGemara

  gemara:Gemara

  constructor(private homeService: HomeService, private gemaraService: GemaraService) {

  }

  ngOnInit() {
    this.read()
    this.Masachet()
  }

  read() {
    this.homeService.readNow(8).subscribe(response => {
      if (screen.width <= 768) {
        this.left = "http://" + response.content.split(',')[1]
        this.right = "http://" + response.content.split(',')[0]
      }
      else {
        this.left = "http://" + response.content.split(',')[0]
        this.right = "http://" + response.content.split(',')[1]
      }


    }, error => { }, () => { })
  }

  Masachet()
  {
    this.gemaraService.Masechet().subscribe(result=>{
       this.masachets=result
       this.masachet=this.masachets[0]
    },error=>{},()=>{})
  }

  Pages()
  {
     this.gemaraService.Page(this.masachet.id).subscribe(result=>{
       this.pages=result
       this.page=this.pages[0]
     },error=>{},()=>{})
  }

  Content(CycleDay:number)
  {
     this.gemaraService.Content(this.page.id).subscribe(result=>{
       this.gemara=result
     },error=>{},()=>{})
  }

}
