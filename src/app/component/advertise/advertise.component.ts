import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../service/upload.service';

declare var $: any;

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css'],
  providers: [UploadService]
})
export class AdvertiseComponent implements OnInit {

  impressions: Array<Impression> = [{ price: 50, amount: 100 }, { price: 80, amount: 200 }]
  impression: Impression


  LastName: string
  FirstName: string
  Address: string
  addressTwo: string
  PhoneNumber: string
  Email: string
  City: string
  State: string
  ZipCode: string
  File: any

  constructor(private uploadService: UploadService) { }


  ngOnInit() {
    this.impression = this.impressions[0]
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {



      let self = this;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.errorSize = ''

        setTimeout(function () {
          var img = new Image();
          img.src = event.target.result;
          if (img.width != 704 || img.height != 104) {
            self.errorSize = "Error: Image needs to be 704x104"
            self.url = ''
          }

        }, 100)

      }
      reader.readAsDataURL(event.target.files[0]);

      this.File = event.target.files[0]
    }
  }

  url: string
  errorSize: string = ''

  upload(status: boolean) {
    if (status) {
      const formData = new FormData();

      formData.append('TotalImpressionCount', this.impression.amount.toString());
      formData.append('LastName', this.LastName);
      formData.append('FirstName', this.FirstName);
      formData.append('Address', this.Address + " " + this.addressTwo);
      formData.append('PhoneNumber', this.PhoneNumber);
      formData.append('Email', this.Email);
      formData.append('City', this.City);
      formData.append('State', this.State);
      formData.append('ZipCode', this.ZipCode);
      formData.append('File', this.File, this.File.name);

      let self = this;
      this.uploadService.upload(formData).subscribe(
        function (respond) {
          self.uploadService.Notify("Advertise Created", false)
          self.Reset();
          $('#popup-advertise').toggleClass('shown');
        },
        function (error) {
          self.uploadService.Notify("Error trying to upload the image", true)
        },
        function () { }
      )
    }
  }

  Reset() {
    this.LastName = ""
    this.FirstName = ""
    this.Address = ""
    this.addressTwo = ""
    this.addressTwo = ""
    this.PhoneNumber = ""
    this.Email = ""
    this.City = ""
    this.State = ""
    this.ZipCode = ""
    this.File = ""
    this.impression = this.impressions[0]
    this.errorSize = '';
  }
}

class Impression {
  price: number
  amount: number
}
