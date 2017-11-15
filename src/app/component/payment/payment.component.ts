import { Component, OnInit, OnChanges, Input,Output,EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnChanges {


  @Output()
  public myEvent = new EventEmitter<boolean>();

  @Input()
  valPar: number

  value: number = 0;

  form: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnChanges(changes: any): void {
    this.value = changes.valPar.currentValue
  }

  ngOnInit() {
    this.form = this._fb.group({
      creditCard: ['', Validators.compose([<any>CreditCardValidator.validateCCNumber, Validators.required])],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]]
    });
  }

  onSubmit() {
      this.myEvent.next(true)
  }

  Validate() {
    return this.form.controls.cvc.errors != null || this.form.controls.creditCard.errors != null || this.form.controls.expirationDate.errors != null
  }


}
