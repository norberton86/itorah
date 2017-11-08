import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  formCheck: FormGroup;
  form: FormGroup;

  value: number = 0;

  constructor(private _fb: FormBuilder) { }

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

    this.form = this._fb.group({
      creditCard: ['', Validators.compose([<any>CreditCardValidator.validateCCNumber, Validators.required])],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]]
    });
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


  onSubmitCheck() {

  }

   Validate()
  {
    return this.form.controls.cvc.errors!=null || this.form.controls.creditCard.errors!=null||this.form.controls.expirationDate.errors!=null
  }


}
