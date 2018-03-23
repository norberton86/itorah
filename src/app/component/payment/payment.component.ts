import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { CreditCard } from '../../model/credit-card';
import { DonateService } from '../../service/donate.service';
import { PaymentService } from '../../service/payment.service';
import { SavedPaymentService, SavedCard } from '../../service/saved-payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DonateService]
})
export class PaymentComponent implements OnInit, OnChanges {


  @Input()
  origin: string = ''
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  @Output()
  public myEvent = new EventEmitter<CreditCard>();

  @Output()
  public myEventDonate = new EventEmitter<SavedCard>();

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
  constructor(private _fb: FormBuilder, private donateService: DonateService, private paymentService: PaymentService, private savedPaymentService: SavedPaymentService) {

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
      email: ['', [Validators.pattern(EMAIL_REGEXP)]],
      saveds: [],
      store: [false]
    });

    if (this.isAuthenticated())
      this.Saveds()
  }


  Reset() {
    var data = {
      creditCard: '',
      expirationDate: '',
      cvc: '',
      name: '',
      email: '',
      saveds: 'default',
      store: false
    }
    this.form.reset(data);
    this.value = 0
  }

  onSubmit() {

    if (this.form.value.saveds != 'default') {  //if it is a previous credit card

      var reUse =this.form.value.saveds
      reUse.amount = this.value
      
      if(this.origin=='donate')
      this.myEventDonate.next(reUse)
    }
    else {
      if (!this.form.valid) {
        this.form.get('name').markAsTouched()
        this.form.get('email').markAsTouched()
        this.form.get('cvc').markAsTouched()
        this.form.get('creditCard').markAsTouched()
        this.form.get('expirationDate').markAsTouched()

        return
      }

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
      cc.CardExpDate = this.form.value.expirationDate.replace(" / ", "")
      cc.CardHolderName = this.form.value.name
      cc.CardNumber = this.form.value.creditCard
      cc.CVV = this.form.value.cvc.replace(" / ", "")
      cc.Email = this.form.value.email
      cc.SaveInfo = this.form.value.store

      this.myEvent.next(cc)
    }


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


  Saveds() {

    this.savedPaymentService.read().subscribe(result => {

      this.savedArr = result
      this.form.controls['saveds'].setValue('default')

    })

  }

  savedArr: Array<SavedCard> = []

  CheckSSaveds() {
    var value = this.form.value.saveds
    if (value == 'default') {
      var data = {
        creditCard: '',
        expirationDate: '',
        cvc: '',
        name: '',
        email: '',
        saveds: 'default',
        store: this.form.value.store
      }
      this.form.patchValue(data);
    }
    else {

      var date = value.expDate[0] + value.expDate[1] + " / " + value.expDate[2] + value.expDate[3]
      this.form.controls['expirationDate'].setValue(date)
      this.form.controls['cvc'].setValue(parseInt(value.last4Digits))
    }
  }

}
