import { Component, OnInit } from '@angular/core';
import { Dedication } from '../../model/dedication';
import { ComboItem } from '../../model/combo-item';
import { DedicationService } from '../../service/dedication.service';

@Component({
  selector: 'app-dedication',
  templateUrl: './dedication.component.html',
  styleUrls: ['./dedication.component.css'],
  providers: [DedicationService]
})
export class DedicationComponent implements OnInit {

  dedications: Array<Dedication> = []

  dedicationType: Array<ComboItem> = [
    {id:"1",description:"For Refuah Shelemah for"} ,
    {id:"2",description:"In Honor Of"} ,
    {id:"3",description:"In Memory Of"} ,
    {id:"4",description:"None"} ,
    {id:"5",description:"For The Hatzlacha of"} ,
    {id:"6",description:"Other"} 
  ]
  dT:ComboItem

  dedicationName: string

  dedicationBy: string
  
  dedicatedPer: Array<ComboItem> = [{id:"month",description:"Month"},{id:"year",description:"Year"}]
  dP:ComboItem

  constructor(private dedicationService: DedicationService) { }

  ngOnInit() {
    
    this.dT=this.dedicationType[0]
    this.dP=this.dedicatedPer[0]
    
    this.Read()
  }

  Read() {
    this.dedicationService.read().subscribe(
      respond => this.dedications = respond
    )
  }

}
