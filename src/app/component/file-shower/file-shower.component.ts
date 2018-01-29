import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { GemaraService } from '../../service/gemara.service';
import { Gemara, DropGemara, AudioGemara } from '../../model/gemara';

@Component({
  selector: 'app-file-shower',
  templateUrl: './file-shower.component.html',
  styleUrls: ['./file-shower.component.css']
})
export class FileShowerComponent implements OnInit {

  right: string = ''
  left: string = ''

  masachets: Array<DropGemara> = []
  masachet: DropGemara
  pages: Array<DropGemara> = []
  page: DropGemara

  gemara: Gemara
  audios: Array<AudioGemara> = []

  constructor(private homeService: HomeService, private gemaraService: GemaraService) {
    this.gemaraService.getEmpty().subscribe(result=>{
            
            this.masachet=this.masachets[0]
            this.page=this.pages[0]
            this.audios=[]

            this.left=''
            this.right=''
    })
  }

  ngOnInit() {

    this.read()
  }

  ShowGif(content: string) {
    if (screen.width <= 768) {
      this.left = "http://" + content.split(',')[1]
      this.right = "http://" + content.split(',')[0]
    }
    else {
      this.left = "http://" + content.split(',')[0]
      this.right = "http://" + content.split(',')[1]
    }

  }

  read(CycleDay: number = -1) {
    this.gemaraService.Content(CycleDay).subscribe(response => {

      this.gemara = response
      this.ShowGif(response.content)
      this.audios = response.audio
      this.Masachet(response.masechetID, response.page)

    }, error => { }, () => { })
  }

  Masachet(masechetID: number, pageName: string) {
    this.gemaraService.Masechet().subscribe(result => {

      this.masachets = result
      this.masachet = this.masachets.find(i => i.id == masechetID)

      this.Pages(pageName)

    }, error => { }, () => { })
  }

  Pages(pageName: string = '') {

    this.pages = []

    this.gemaraService.Page(this.masachet.id).subscribe(result => {

      this.pages = result

      if (pageName == '')          //if it not the first time
      {
        this.page = this.pages[0]
        this.Content()
      }
      else
        this.page = this.pages.find(i => i.name == pageName)

    }, error => { }, () => { })
  }

  Content() {
    this.audios = []

    if (this.page.id != 0)
      this.gemaraService.Content(this.page.id).subscribe(result => {

        this.gemara = result
        this.ShowGif(this.gemara.content)
        this.audios = this.gemara.audio

      }, error => { }, () => { })
  }

  Previous() {
    if (this.page.id > 1) {
      this.read(this.page.id - 1)
    }
  }

  Next() {
    if (this.page.id < 2711) {
      this.read(this.page.id + 1)
    }
  }

  Close()
  {
    this.read()
  }

}
