import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-file-shower',
  templateUrl: './file-shower.component.html',
  styleUrls: ['./file-shower.component.css']
})
export class FileShowerComponent implements OnInit {

  right: string = ''
  left: string = ''

  constructor(private homeService: HomeService) {

  }

  ngOnInit() {
    this.read()
  }

  read() {
    this.homeService.readNow(8).subscribe(response => {
      if(screen.width<=768)
      {
      this.left ="http://"+ response.content.split(',')[1]
      this.right ="http://"+ response.content.split(',')[0]  
    }
    else{
        this.left ="http://"+ response.content.split(',')[0]
      this.right ="http://"+ response.content.split(',')[1]
    }
      
    
  }, error => { }, () => { })
  }

}
