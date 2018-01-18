import { Component, OnInit } from '@angular/core';
import { Dedication, DedicationPost } from '../../model/dedication';
import { ComboItem } from '../../model/combo-item';
import { DedicationService } from '../../service/dedication.service';
declare var $: any;
import { CreditCard } from '../../model/credit-card';
import { PaymentService } from '../../service/payment.service';

@Component({
  selector: 'app-dedication',
  templateUrl: './dedication.component.html',
  styleUrls: ['./dedication.component.css'],
  providers: [DedicationService]
})
export class DedicationComponent implements OnInit {

  dedications: Array<Dedication> = []

  dedicationType: Array<ComboItem> = [
    { id: "1", description: "For Refuah Shelemah for" },
    { id: "2", description: "In Honor Of" },
    { id: "3", description: "In Memory Of" },
    { id: "4", description: "None" },
    { id: "5", description: "For The Hatzlacha of" },
    { id: "6", description: "Other" }
  ]
  dT: ComboItem
  other: string = ''


  dedicationName: string = ''

  dedicationBy: string = ''

  dedicatedPer: Array<ComboItem> = [{ id: "Month", description: "Month" }, { id: "Year", description: "Year" }]
  dP: ComboItem

  value: number = 100
  paymentError: boolean = false

  constructor(private dedicationService: DedicationService,private paymentService:PaymentService) { }

  ngOnInit() {

    this.dT = this.dedicationType[0]
    this.dP = this.dedicatedPer[0]
    this.Read()
  }

  Read() {
    this.dedicationService.read().subscribe(
      respond => this.dedications = respond
    )
  }

  ChangePer() {
    if (this.dP.id == "Month")
      this.value = 100
    else
      this.value = 1000
  }

  requesting: boolean = false

  Save(cc: CreditCard) {

    if (this.requesting)
      return

    this.requesting = true

    if (this.dedicationName == '') {
      this.dedicationService.Notify("Please fill Dedication Name", true);
      return;
    }

    if (this.dedicationBy == '') {
      this.dedicationService.Notify("Please fill Dedication By", true);
      return;
    }

    var ded = new DedicationPost()

    ded.TimeLimit = this.dP.id
    ded.ID = null
    ded.Details = this.other
    ded.DedicationForName = this.dedicationName
    ded.DedicationByName = this.dedicationBy
    ded.DedicationTypeID = parseInt(this.dT.id)
    ded.PaymentInfo = {
      Amount: cc.Amount,
      CardExpDate: cc.CardExpDate.replace(" / ", ""),
      CardHolderName: cc.CardHolderName,
      CardNumber: cc.CardNumber,
      CVV: cc.CVV
    }

    let self = this;
    this.dedicationService.add(ded).subscribe(
      function (response) {
        self.requesting = false
        if (response == "Success") {
          self.paymentService.setItem('reset')  //order reset the nested payment component
          $('#dedications').toggleClass('shown');
          $('#payConfirmed').toggleClass('shown');
        }
        else
        self.paymentError=true

      },
      function (error) {
        self.requesting = false
        self.paymentError = true
      },
      function () {

      }
    )


  }

  Close()
  {
    this.paymentService.setItem('reset') 
  }

}
