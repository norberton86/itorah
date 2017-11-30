import { Component, OnInit } from '@angular/core';
import { Alert } from '../../model/alert';
import { ComboItem } from '../../model/combo-item';
import { AlertService } from '../../service/alert.service';
import { SpeakerService } from '../../service/speaker.service';
import { BrowseService } from '../../service/browse.service';
import { Observable } from 'rxjs/Observable';
import { Speaker } from '../../model/speaker';
import { Category } from '../../model/shiurim';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  providers: [SpeakerService, BrowseService]
})
export class AlertComponent implements OnInit {

  alertsOriginal: Array<Alert> = []
  alerts: Array<AlerText> = []

  frecuencys: Array<ComboItem> = [{ id: "1", description: "Daily" }, { id: "2", description: "Weekly" }, { id: "3", description: "Bi-Weekly" }, { id: "4", description: "Montly" }]
  frecuency: ComboItem = this.frecuencys[0]

  options: Array<ComboItem> = [{ id: "0", description: "Category" }, { id: "1", description: "Speaker" }]
  option: ComboItem = this.options[0]

  speakers: Array<ComboItem> = []
  speaker: ComboItem

  categories: Array<ComboItem> = []
  category: ComboItem

  comboData: Array<ComboItem> = []

  manage: boolean = false

  constructor(private alertService: AlertService, private speakerService: SpeakerService, private browseService: BrowseService) {
    this.alertService.getLogin().subscribe(item => {
      if (item == "Signed") {
         this.Load()
      }
      else {

      }
    });
   }

  ngOnInit() {

    this.Get()
  }


  Get() {
    Observable.forkJoin(this.browseService.getCategorys(), this.speakerService.read()).subscribe(response => {

      this.getCategories(response[0])
      this.getSpeakers(response[1])

      if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "")
        this.Load()
    })
  }

  Load() {
    this.alerts=[]
    this.alertsOriginal=[]

    this.alertService.read().subscribe(alerts => {

      this.alertsOriginal = alerts

      for (var i = 0; i < alerts.length; i++) {

        var frec = this.frecuencys.find(p => p.id == alerts[i].frequency.toString()).description
        var data;
        if (alerts[i].type == 0) {
          data = this.categories.find(p => p.id == alerts[i].alertData.toString()).description
        }
        else {
          data = this.speakers.find(p => p.id == alerts[i].alertData.toString()).description
        }

        this.alerts.push({ id: alerts[i].id.toString(), frecuency: frec, dataText: data, type: alerts[i].type })
      }

    })
  }

  getSpeakers(response: Array<Speaker>) {
    this.comboData = []
    let self = this

    var item;
    response.forEach(function (speaker) {
      item = { id: speaker.id.toString(), description: speaker.firstName + " " + speaker.lastName }
      self.speakers.push(item)
    })
    this.speaker = this.speakers[0]
  }

  getCategories(response: Array<Category>) {
    this.comboData = []
    let self = this

    var item;
    response.forEach(function (c) {
      item = { id: c.id.toString(), description: c.name }
      self.categories.push(item)
    })
    this.category = this.categories[0]

  }

  Delete(a: AlerText) {

    this.alertService.delete(parseInt(a.id)).subscribe(response => {
      this.alerts.splice(this.alerts.findIndex(i => i.id == a.id), 1)
      //this.alertService.Notify("Deleted", false)
    })
  }

  editing: boolean = false
  edited: AlerText
  Edit(a: AlerText) {
    this.manage = true
    this.editing = true
    this.edited = a

    var ale = this.alertsOriginal.find(i => i.id == parseInt(a.id))
    this.frecuency = this.frecuencys.find(i => i.id == ale.frequency.toString())
    this.option = this.options.find(i => i.id == ale.type.toString())

    if (ale.type == 0)
      this.category = this.categories.find(i => i.id == ale.alertData.toString())
    else
      this.speaker = this.speakers.find(i => i.id == ale.alertData.toString())
  }

  New() {
    this.manage = true
  }

  Save() {
    if (this.editing) {
      this.Delete(this.edited)
      this.add()
    }
    else
      this.add()

  }

  Back() {
    this.manage = false
    this.editing = false
  }

  add() {
    var ale = new Alert()
    ale.id = null
    ale.frequency = parseInt(this.frecuency.id)
    ale.type = parseInt(this.option.id)
    if (this.option.id == "0")
      ale.alertData = parseInt(this.category.id)
    else
      ale.alertData = parseInt(this.speaker.id)

    let self = this

    this.alertService.add(ale).subscribe(function (respond) {

      self.alertService.Notify("Alert Created", false)
      self.Back()
      self.Load()
    },
      function (error) { self.alertService.Notify("Error trying to add", true); self.Back() },
      function () { })
  }
}

export class AlerText {
  id: string
  frecuency: string
  dataText: string
  type: number
}
