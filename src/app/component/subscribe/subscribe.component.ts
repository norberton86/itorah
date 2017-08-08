import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SubscribeService } from '../../service/subscribe.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  form:FormGroup;

  constructor(private fb: FormBuilder,private subscribeService:SubscribeService) {
    this.InitializeForm();
     this.subscribeService.getLogin().subscribe(item => {
      if (item == "Signed")
        this.Read()
      else
        this.Cancel()
    });
  }

  ngOnInit() {
    if(this.subscribeService.getToken()!="")
    this.Read()
  }

   Read() {
    this.subscribeService.read(this.subscribeService.getToken()).subscribe(
      result => this.form.patchValue(result)
    )

  }

  InitializeForm()
  {
    var data ={
      checkBoxHalacha:false,
      checkBoxPerasha:false,
      checkBoxEmunah:false,
      checkBoxTehillim:false,
      checkBoxPrayers:false,
      checkBoxEmailTehillim:false,
      checkBoxSmsTehillim:false,
      checkBoxEmailFuneral:false,
      checkBoxSmsFuneral:false,
      EmailTehillim:['',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      SmsTehillim:'',
      EmailFuneral:'',
      SmsFuneral:''
    }
      
    this.form = this.fb.group(data);
  }

  EmailTehillimChecked()
  {
    return this.form.value.checkBoxEmailTehillim
  }

  SmsTehillimChecked()
  {
    return this.form.value.checkBoxSmsTehillim
  }

  EmailFuneralChecked()
  {
     return this.form.value.checkBoxEmailFuneral
  }

  SmsFuneralChecked()
  {
    return this.form.value.checkBoxSmsFuneral
  }

  Cancel()
  {
    var data ={
      checkBoxHalacha:false,
      checkBoxPerasha:false,
      checkBoxEmunah:false,
      checkBoxTehillim:false,
      checkBoxPrayers:false,
      checkBoxEmailTehillim:false,
      checkBoxSmsTehillim:false,
      checkBoxEmailFuneral:false,
      checkBoxSmsFuneral:false,
      EmailTehillim:'',
      SmsTehillim:'',
      EmailFuneral:'',
      SmsFuneral:''
    }
    this.form.patchValue(data);
  }

  Save()
  {
      this.subscribeService.Save(this.form.value).subscribe(
       result => console.log(result)
      )
  }


}
