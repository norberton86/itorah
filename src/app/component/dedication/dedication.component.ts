import { Component, OnInit } from '@angular/core';
import { Dedication } from '../../model/dedication';
import { DedicationService } from '../../service/dedication.service';

@Component({
  selector: 'app-dedication',
  templateUrl: './dedication.component.html',
  styleUrls: ['./dedication.component.css'],
  providers: [DedicationService]
})
export class DedicationComponent implements OnInit {

  dedications: Array<Dedication> = []

  constructor(private dedicationService: DedicationService) { }

  ngOnInit() {
    this.Read()
  }

  Read() {
    this.dedicationService.read().subscribe(
      respond => this.dedications = respond
    )
  }

}
