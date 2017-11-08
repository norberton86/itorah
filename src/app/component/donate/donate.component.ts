import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  formCheck: FormGroup;
  form: FormGroup;

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

      other:''

    });
  }

  Check(name:string) {

    var data = {
      five: name=="five"?true: false,
      ten: name=="ten"?true: false,
      fifteen: name=="fifteen"?true: false,

      twentyFive: name=="twentyFive"?true: false,
      fifty: name=="fifty"?true: false,
      oneHundred: name=="oneHundred"?true: false,

      twoHundred: name=="twoHundred"?true: false,
      threeHundred: name=="threeHundred"?true: false,
      oneThousand: name=="oneThousand"?true: false,

      other: name=="other"?this.formCheck.value.other: '',
    }
    this.formCheck.patchValue(data);
  }


  onSubmitCheck() {

  }

}
