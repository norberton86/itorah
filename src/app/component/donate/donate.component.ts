import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { CreditCard } from '../../model/credit-card';
import { DonateService } from '../../service/donate.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css'],
  providers: [DonateService]
})
export class DonateComponent implements OnInit {

  formCheck: FormGroup;


  value: number = 0;

  constructor(private _fb: FormBuilder, private donateService: DonateService) { }

  ngOnInit() {
    this.formCheck = this._fb.group({
      five: false,
      ten: false,
      fifteen: false,

      twentyFive: false,
      fifty: false,
      oneHundred: false,

      twoHundred: false,
      threeHundred: false,
      oneThousand: false,

      other: ''

    });


  }

  Save(cc: CreditCard) {


    var data = { Amount: cc.Amount, CardExpDate: cc.CardExpDate, CardHolderName: cc.CardHolderName, CardNumber: cc.CardNumber, CVV: cc.CVV }
    if (cc.Email != '')
      data['Email'] = cc.Email

    if (cc.Email == '') {
      this.donateService.add(data).subscribe(result => {

        if (result == "Success")
          this.donateService.Notify("Donation Completed", false);
        else
          this.donateService.Notify("Transaction Declined", true);
      },
        error => {
          this.donateService.Notify("Error trying to access", true);
        }, () => {

        })
    }
    else {
      this.donateService.addEmail(data).subscribe(result => {

        if (result == "Success")
          this.donateService.Notify("Donation Completed", false);
        else
          this.donateService.Notify("Transaction Declined", true);
      },
        error => {
          this.donateService.Notify("Error trying to access", true);
        }, () => {

        })
    }

  }

  Check(name: string) {

    var data = {
      five: name == "five" ? true : false,
      ten: name == "ten" ? true : false,
      fifteen: name == "fifteen" ? true : false,

      twentyFive: name == "twentyFive" ? true : false,
      fifty: name == "fifty" ? true : false,
      oneHundred: name == "oneHundred" ? true : false,

      twoHundred: name == "twoHundred" ? true : false,
      threeHundred: name == "threeHundred" ? true : false,
      oneThousand: name == "oneThousand" ? true : false,

      other: name == "other" ? this.formCheck.value.other : '',
    }
    this.formCheck.patchValue(data);

    switch (name) {
      case "five": this.value = 5; break;
      case "ten": this.value = 10; break;
      case "fifteen": this.value = 15; break;

      case "twentyFive": this.value = 25; break;
      case "fifty": this.value = 50; break;
      case "oneHundred": this.value = 100; break;

      case "twoHundred": this.value = 200; break;
      case "threeHundred": this.value = 300; break;
      case "oneThousand": this.value = 1000; break;

      case "other": this.value = this.formCheck.value.other; break;
    }
  }

}
