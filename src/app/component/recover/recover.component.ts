import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialLoginServic } from '../../service/social-login.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css'],
  providers: [SocialLoginServic]
})
export class RecoverComponent implements OnInit, OnChanges {


  @Input()
  accion: string = "";

  email: string = '';
  form: FormGroup;

  token: string

  constructor(private fb: FormBuilder, private socialLoginServic: SocialLoginServic) {
    this.InitializeForm();
  }

  ngOnChanges(changes: any) {

    this.email = changes.accion.currentValue
    if (this.email != '') {
      this.email = this.email.split('#email:')[1]
      this.token = this.email.split("/")[1]
      this.email = this.email.split('/')[0]
    }

  }


  InitializeForm() {
    var data = {
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    }

    this.form = this.fb.group(data);
  }

  ngOnInit() {
  }

  Change() {
    let self = this;
    this.socialLoginServic.Recover(this.token, this.form.value.confirm).subscribe(
      function (respond) {
        self.socialLoginServic.Notify("Try login again", false)
      },
      function (error) {
        self.socialLoginServic.Notify("Service not available", true)
      },
      function () { }
    )
  }

  Equals(): boolean {
    if (this.form.value.password == '' || this.form.value.confirm == '')
      return false;

    return this.form.value.password == this.form.value.confirm;
  }

  NotEquals() {
    return this.form.value.password != this.form.value.confirm && this.form.value.confirm != '';
  }

}
