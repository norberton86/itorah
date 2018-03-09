import { Component, OnInit } from '@angular/core';
import { FireStoreService, Setting, Item } from '../../service/fire-store.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  form: FormGroup;
  requesting: boolean = false

  setting: Setting = { downloadDays: '0', downloadTime: "01:01:00", savedPlaylist: '0', wifiOnly: false }

  browseList: Array<Item> = [{
    id: 1,
    title: "Daily Halacha",
    descripcion: "by Rabbi Eli Mansour"
  },
  {
    id: 2,
    title: "Daf Yomi",
    descripcion: "by Rabbi Eli Mansour"
  },
  {
    id: 3,
    title: "Daily Tehillim (Chapter of the Day)",
    descripcion: 'Recited by Chacham Baruch Ben-Haim Z"TL"'
  },
  {
    id: 4,
    title: "Daily Emunah",
    descripcion: 'by Rabbi David Ashear'
  }]

  subBrowseList: Array<Item> = [
    {
      id: 7, title: "Parasha of the Week by Rabbi Eli Mansour", descripcion: "Updated 12/22/2017"
    },
    {
      id: 8, title: "Parasha of the Week by Rabbi Meyer Yedid", descripcion: "Updated 12/22/2017"
    },
    {
      id: 9, title: "Parasha of the Week by Rabbi Duvi BenSoussan", descripcion: "Updated 12/22/2017"
    },
    {
      id: 10, title: "Parasha of the Week by Rabbi David Sutton", descripcion: "Updated 12/22/2017"
    },
    { id: 11, title: "Parasha of the Week by Rabbi Shlomo Diamond", descripcion: "Updated 12/22/2017" },
    { id: 12, title: "Parasha of the Week by Rabbi Eliezer Zeytouneh", descripcion: "Updated 12/22/2017" },
    { id: 13, title: "Parasha of the Week by Rabbi Joey Haber", descripcion: "Updated 12/22/2017" }
  ]

  constructor(private fireStoreService: FireStoreService, private afs: AngularFirestore, private fb: FormBuilder) {

    this.InitializeForm()

    if (this.fireStoreService.getToken() != "")              //only if login
      this.afs.collection('usuario').doc(this.fireStoreService.getEmail()).ref.onSnapshot(doc => {   //listen for any changes on the server

        if (!doc.metadata.hasPendingWrites) //if we have a change on the server(means is not local changes)
        {
          var setting = new Setting()
          setting.downloadDays = doc.data().downloadDays
          setting.downloadTime = doc.data().downloadTime
          setting.savedPlaylist = doc.data().savedPlaylist
          setting.wifiOnly = doc.data().wifiOnly

          this.setting = setting
          this.LoadForm()
        }
      }, error => { });

  }

  ngOnInit() {

  }

  LoadForm() {
    var timeArr = this.setting.downloadTime.split(':')

    var dateForForm = timeArr[0] + ":" + timeArr[1]
    this.form.patchValue({ wifiOnly: this.setting.wifiOnly, downloadTime: dateForForm, downloadDays: this.setting.downloadDays.split(',') })
  }

  InitializeForm() {

    var data = {
      wifiOnly: 'false',
      downloadTime: "12:00",//new Date().toISOString(),
      downloadDays: [[]],
    }

    this.form = this.fb.group(data);
  }

  Apply() {

    this.setting.wifiOnly = this.form.value.wifiOnly
    this.setting.downloadTime = this.form.value.downloadTime + ":00"
    this.setting.downloadDays = this.form.value.downloadDays.join(',')

    this.fireStoreService.UpdateFireBase(this.setting).then(result => { }).catch(error => { })
  }

  LoadUI() {

  }

  Close() {

  }

  IsFavorite(item: Item): boolean {
    return this.setting.savedPlaylist.split(',').includes(item.id.toString())
  }

  Favorites(): Array<Item> {
    return this.browseList.filter(i => this.IsFavorite(i)).concat(this.subBrowseList.filter(i => this.IsFavorite(i)))
  }

  Remove(item: Item) {
    var index = this.setting.savedPlaylist.split(',').indexOf(item.id.toString())

    var arr = this.setting.savedPlaylist.split(',')
    arr.splice(index, 1)

    this.setting.savedPlaylist = arr.join(',')

    this.fireStoreService.UpdateFireBase(this.setting)
  }

  ChangeStatus(item: Item) {
    
    var arr = this.setting.savedPlaylist.split(',')
    var index = arr.indexOf(item.id.toString())
    
    if (index >= 0) //if it is favorite,then remove from favorites
    { 
      arr.splice(index, 1)
    }
    else {  //added
      arr.push(item.id.toString())
    }

    this.setting.savedPlaylist = arr.join(',')

    this.fireStoreService.UpdateFireBase(this.setting)
  }

}
