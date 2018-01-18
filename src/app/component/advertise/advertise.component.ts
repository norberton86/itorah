import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../service/upload.service';
import { CreditCard } from '../../model/credit-card';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from '../../service/payment.service';

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
  File: any
  form: FormGroup;
  paymentError: boolean = false

  constructor(private uploadService: UploadService, private fb: FormBuilder,private paymentService:PaymentService) {
    this.InitializeMainForm();
  }


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

  InitializeMainForm() {
    let EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    this.form = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Address: '',
      addressTwo: '',
      PhoneNumber: '',
      Email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      City: '',
      State: '',
      ZipCode: '',
    });
  }

  Invalid(): boolean {
    return this.form.controls.FirstName.errors != null || this.form.controls.LastName.errors != null || this.form.controls.Email.errors != null
  }

  requesting: boolean = false
  upload(cc: CreditCard) {

    if (this.requesting)
      return

    this.requesting = true

    if (this.errorSize != '' || this.File == undefined || this.File == null) {
      this.uploadService.Notify("Upload a valid image", true);
      return;
    }

    if (this.Invalid())
      return;


    const formData = new FormData();

    formData.append('TotalImpressionCount', this.impression.amount.toString());
    formData.append('LastName', this.form.value.LastName);
    formData.append('FirstName', this.form.value.FirstName);
    formData.append('Address', this.form.value.Address + " " + this.form.value.addressTwo);
    formData.append('PhoneNumber', this.form.value.PhoneNumber);
    formData.append('Email', this.form.value.Email);
    formData.append('City', this.form.value.City);
    formData.append('State', this.form.value.State);
    formData.append('ZipCode', this.form.value.ZipCode);
    formData.append('File', this.File, this.File.name);

    formData.append('Amount', cc.Amount.toString());
    formData.append('CardExpDate', cc.CardExpDate.replace(" / ", ""));
    formData.append('CardHolderName', cc.CardHolderName);
    formData.append('CardNumber', cc.CardNumber);
    formData.append('CVV', cc.CVV);



    let self = this;
    this.uploadService.upload(formData).subscribe(
      function (respond) {
        self.requesting = false

        if (respond == "Success") {
          self.Reset()
          self.paymentService.setItem('reset')  //order reset the nested payment component
          $('#popup-advertise').toggleClass('shown');
          $('#payConfirmed').toggleClass('shown');
        }
        else
          self.paymentError = true

      },
      function (error) {
        self.requesting = false
        self.paymentError = true
      },
      function () { }
    )

  }

  Reset() {
    var data = {
      FirstName: '',
      LastName: '',
      Address: '',
      addressTwo: '',
      PhoneNumber: '',
      Email: '',
      City: '',
      State: '',
      ZipCode: ''
    }
    this.form.reset(data);
    this.errorSize = ''
    this.File = null
  }

  Close()
  {
    this.paymentService.setItem('reset')
  }
}

class Impression {
  price: number
  amount: number
}
