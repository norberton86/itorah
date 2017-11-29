import { Component, OnInit } from '@angular/core';
import { Account, PhoneProvider } from '../../model/account';
import { AccountService } from '../../service/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {


  form: FormGroup;
  phoneProviders: Array<PhoneProvider> = []

  changePasword:boolean=false

  constructor(private fb: FormBuilder, private accountService: AccountService) { }

  ngOnInit() {

    let EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      address: '',
      addressTwo: '',
      city: '',
      state: 'FL',
      zip: '',
      phone: '',
      phoneProviderID: [1],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
    });


    this.accountService.providers().subscribe(providers => {
      
      this.phoneProviders = providers

      this.accountService.read().subscribe(response => {
        this.setValue(response)
      })

    })


  }

  setValue(account: Account) {
    var data = {
      firstName: account.firstName,
      lastName: account.lastName,
      address: account.address,
      addressTwo: account.address2,
      city: account.city,
      state: account.state,
      zip: account.zipCode,
      phone: account.phoneNumber,
      phoneProviderID: account.phoneProviderID,
      email: account.email,
    }
    this.form.patchValue(data);

    this.changePasword=account.allowChangePassword
  }

  Save()
  {
    var account =new Account()
    account.firstName=this.form.value.firstName
    account.lastName=this.form.value.lastName
    account.address=this.form.value.address
    account.address2=this.form.value.addressTwo
    account.city=this.form.value.city
    account.state=this.form.value.state
    account.zipCode=this.form.value.zip
    account.phoneNumber=this.form.value.phone
    account.phoneProviderID=this.form.value.phoneProviderID
    account.email=this.form.value.email
    account.allowChangePassword=true

    let self=this

    this.accountService.add(account).subscribe(function (respond) {
        self.accountService.Notify("Account Updated", false)
        self.Close()
      },
      function (error) {
        self.accountService.Notify("Service not available", true)
      },
      function () { })
  }

 Close() {
    $('#myAccount').toggleClass('shown');
  }

}
