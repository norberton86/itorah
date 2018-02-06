import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../service/upload.service';

declare var $:any

@Component({
  selector: 'app-place-holder',
  templateUrl: './place-holder.component.html',
  styleUrls: ['./place-holder.component.css'],
  providers: [UploadService]
})
export class PlaceHolderComponent implements OnInit {

  left: string = "/assets/build/css/images/temp/left.png"
  right: string = "/assets/build/css/images/temp/right.png"
  constructor(private uploadService: UploadService) { }

  ngOnInit() {

    /*this.uploadService.get().subscribe(
      result => {
        this.left=result[0] 
        this.right=result[1]
       }
    )*/
  }

  OpenAdvertise() {
     $('#popup-advertise').toggleClass('shown');
  }

}
