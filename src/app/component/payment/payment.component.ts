import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { CreditCard } from '../../model/credit-card';
import { DonateService } from '../../service/donate.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers:[DonateService]
})
export class PaymentComponent implements OnInit, OnChanges {


  @Output()
  public myEvent = new EventEmitter<CreditCard>();

  @Input()
  valPar: number

  @Input()
  isDonate: boolean = false

  value: number = 0;

  form: FormGroup;
  constructor(private _fb: FormBuilder,private donateService:DonateService) { }

  ngOnChanges(changes: any): void {
    this.value = changes.valPar.currentValue
  }

  ngOnInit() {
    let EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    this.form = this._fb.group({
      creditCard: ['4242424242424242', Validators.compose([<any>CreditCardValidator.validateCCNumber, Validators.required])],
      expirationDate: ['08 / 20', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['036', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]],
      name: ['norberto', [Validators.required]],
      email: ['', [Validators.pattern(EMAIL_REGEXP)]]
    });
  }

  onSubmit() {

    if(this.value<=0)
    {
      this.donateService.Notify("Amount needs to be bigger than $0.00",true);
      return;
    }
    
    if(!this.isAuthenticated() && this.form.value.email=="")
    {
      this.donateService.Notify("Email can't be empty",true);
      return;
    }

    var cc = new CreditCard();
    cc.Amount = this.value
    cc.CardExpDate = this.form.value.expirationDate
    cc.CardHolderName = this.form.value.name
    cc.CardNumber = this.form.value.creditCard
    cc.CVV = this.form.value.cvc.replace(" / ", "")
    cc.Email = this.form.value.email

    this.myEvent.next(cc)
  }

  Validate() {
    return this.form.controls.cvc.errors != null || this.form.controls.creditCard.errors != null || this.form.controls.expirationDate.errors != null
  }

  isAuthenticated(): boolean {
    let self = this;
    if (localStorage.getItem('userItorah') == null || localStorage.getItem('userItorah') == "")//needs credentials to access
      return false
    else
      return true;
  }


}
