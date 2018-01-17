import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { CreditCard } from '../../model/credit-card';
import { DonateService } from '../../service/donate.service';
import { PaymentService } from '../../service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DonateService]
})
export class PaymentComponent implements OnInit, OnChanges {

  @Output()
  public myEvent = new EventEmitter<CreditCard>();

  @Input()
  valPar: number

  @Input()
  isDonate: boolean = false

  @Input()
  requesting: boolean = false

  value: number = 0;

  @Input()
  paymentError: boolean

  form: FormGroup;
  constructor(private _fb: FormBuilder, private donateService: DonateService,private paymentService:PaymentService) { 
    
    this.paymentService.getItem().subscribe(item => {
      if (item == "reset")
         this.Reset();
     
    });
  }

  ngOnChanges(changes: any): void {
    if (changes.valPar != undefined && changes.valPar != null)
      this.value = changes.valPar.currentValue
  }

  ngOnInit() {
    let EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    this.form = this._fb.group({
      creditCard: ['', Validators.compose([<any>CreditCardValidator.validateCCNumber, Validators.required])],
      expirationDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvc: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]],
      name: ['', [Validators.required]],
      email: ['', [Validators.pattern(EMAIL_REGEXP)]]
    });
  }


  Reset() {
    var data = {
      creditCard: '',
      expirationDate: '',
      cvc: '',
      name: '',
      email: ''
    }
    this.form.reset(data);
     this.value=0
  }

  onSubmit() {

    if (this.value <= 0) {
      this.donateService.Notify("Amount needs to be bigger than $0.00", true);
      return;
    }

    if (!this.isAuthenticated() && this.form.value.email == "") {
      this.donateService.Notify("Email can't be empty", true);
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
