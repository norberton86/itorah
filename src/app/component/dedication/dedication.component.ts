import { Component, OnInit } from '@angular/core';
import { Dedication, DedicationPost } from '../../model/dedication';
import { ComboItem } from '../../model/combo-item';
import { DedicationService } from '../../service/dedication.service';
declare var $: any;
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


  dedicationName: string

  dedicationBy: string

  dedicatedPer: Array<ComboItem> = [{ id: "Month", description: "Month" }, { id: "Year", description: "Year" }]
  dP: ComboItem

  value: number = 100


  constructor(private dedicationService: DedicationService) { }

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
    if (this.dP.id == "month")
      this.value = 100
    else
      this.value = 1000
  }

  Save(status: boolean) {
    if (status)
    {
      var ded = new DedicationPost()

      ded.timeLimit = this.dP.id
      ded.id = 0
      ded.paid = true
      ded.details = this.other
      ded.dedicationForName = this.dedicationName
      ded.dedicationByName = this.dedicationBy
      ded.dedicationTypeID = parseInt(this.dT.id)

      let self = this;
      this.dedicationService.add(ded).subscribe(
        function (response) {
          self.dedicationService.Notify("Dedication successful", false)
          $('#dedications').toggleClass('shown');
        },
        function (error) {
          self.dedicationService.Notify("Error trying to dedicate", true)
        },
        function () {

        }
      )

    }
    else
    {
      this.dedicationService.Notify("Error trying to pay", true)
    }
  }

}
