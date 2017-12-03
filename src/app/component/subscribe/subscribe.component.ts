import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SubscribeService } from '../../service/subscribe.service';
import { Subscribe,SubscribeRequest } from '../../model/subscribe';
declare var $: any;

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
    this.subscribeService.read().subscribe(
      result => {

       var  sub=new Subscribe();   

       sub.checkBoxHalacha=result.emailSubscriptions.find(i=>i==1)!=undefined?true:false
       sub.checkBoxPerasha=result.emailSubscriptions.find(i=>i==2)!=undefined?true:false
       sub.checkBoxEmunah=result.emailSubscriptions.find(i=>i==53)!=undefined?true:false
       sub.checkBoxTehillim=result.emailSubscriptions.find(i=>i==9)!=undefined?true:false
       sub.checkBoxPrayers=result.emailSubscriptions.find(i=>i==54)!=undefined?true:false
       sub.checkBoxEmailTehillim=result.emailSubscriptions.find(i=>i==10)!=undefined?true:false
       sub.checkBoxEmailFuneral=result.emailSubscriptions.find(i=>i==24)!=undefined?true:false

       sub.checkBoxSmsTehillim=result.textSubscriptions.find(i=>i==10)!=undefined?true:false
       sub.checkBoxSmsFuneral=result.textSubscriptions.find(i=>i==24)!=undefined?true:false

        //---------------------------------
        this.form.patchValue(sub)
      }
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

    }
      
    this.form = this.fb.group(data);
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

    }
    this.form.patchValue(data);

    $('#subscribeBox').toggleClass('shown')
    $('#subscribeBox').css('display','none')
  }

  Save()
  {
      var sub=new SubscribeRequest();
      
      if(this.form.value.checkBoxHalacha)
      sub.emailSubscriptions.push(1)

      if(this.form.value.checkBoxPerasha)
      sub.emailSubscriptions.push(2)

      if(this.form.value.checkBoxEmunah)
      sub.emailSubscriptions.push(53)
      
      if(this.form.value.checkBoxTehillim)
      sub.emailSubscriptions.push(9)

      if(this.form.value.checkBoxPrayers)
      sub.emailSubscriptions.push(54)

      if(this.form.value.checkBoxEmailTehillim)
      sub.emailSubscriptions.push(10)

      if(this.form.value.checkBoxEmailFuneral)
      sub.emailSubscriptions.push(24)

      if(this.form.value.checkBoxSmsTehillim)
      sub.textSubscriptions.push(10)

      if(this.form.value.checkBoxSmsFuneral)
      sub.textSubscriptions.push(24)



      this.subscribeService.Save(sub).subscribe(
         result => {
           this.subscribeService.Notify("Subscription succesfull",false);
         }
      )
  }


}
