import { Component, OnInit } from '@angular/core';
import { Account, PhoneProvider } from '../../model/account';
import { AccountService } from '../../service/account.service';
import { CommunitiesService,Communities } from '../../service/communities.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers:[CommunitiesService]

})
export class AccountComponent implements OnInit {


  form: FormGroup;
  formPasword: FormGroup
  phoneProviders: Array<PhoneProvider> = []
  communities:Array<Communities>=[]


  changePasword: boolean = false
  main: boolean = true

  constructor(private fb: FormBuilder, private fbPass: FormBuilder, private accountService: AccountService,private communitiesService:CommunitiesService) {
    this.accountService.getLogin().subscribe(item => {
      if (item == "Signed") {
         this.Load()
      }
      else {

      }
    });
  }

  ngOnInit() {
    this.InitializeMainForm();
    this.InitializePassForm();
  }

  InitializeMainForm() {
    let EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: '',
      addressTwo: '',
      city: '',
      state: 'FL',
      zip: '',
      phone: '',
      phoneProviderID: [1],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      communityID:[1]
    });

    if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "")
      this.Load()
  }

  Load() {
    this.accountService.providers().subscribe(providers => {

      this.phoneProviders = providers

      this.accountService.read().subscribe(response => {
        this.setValue(response)
      })

    })

    this.communitiesService.read().subscribe(respond=>{
       this.communities=respond
       
    },error=>{},()=>{})
  }

  InitializePassForm() {

    this.formPasword = this.fbPass.group({
      oldp: ['', Validators.required],
      newp: ['', Validators.required],
      confirmp: ['', Validators.required],
    });

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
      communityID:account.communityID
    }
    this.form.patchValue(data);

    this.changePasword = account.allowChangePassword
  }

  Save() {
    if (this.main)
      this.SaveAccount()
    else
      this.ChangePassword()
  }

  requesting:boolean=false

  SaveAccount() {

    if(!this.form.valid)
    {
      this.form.get('firstName').markAsTouched()
      this.form.get('lastName').markAsTouched()
      this.form.get('email').markAsTouched()

      return
    }

    var account = new Account()
    account.firstName = this.form.value.firstName
    account.lastName = this.form.value.lastName
    account.address = this.form.value.address
    account.address2 = this.form.value.addressTwo
    account.city = this.form.value.city
    account.state = this.form.value.state
    account.zipCode = this.form.value.zip
    account.phoneNumber = this.form.value.phone
    account.phoneProviderID = this.form.value.phoneProviderID
    account.email = this.form.value.email
    account.allowChangePassword = true
    account.communityID=this.form.value.communityID

    let self = this
    this.requesting=true
    this.accountService.add(account).subscribe(function (respond) {
      self.requesting=false
     // self.accountService.Notify("Account Updated", false)
      self.Close()
    },
      function (error) {
        self.requesting=false
        self.accountService.Notify("Service not available", true)
      },
      function () { })
  }

  ChangePassword() {

    if(!this.formPasword.valid)
    {
      this.formPasword.get('oldp').markAsTouched()
      this.formPasword.get('newp').markAsTouched()
      this.formPasword.get('confirmp').markAsTouched()

      return
    }

    var pass = {
      oldp: this.formPasword.value.oldp,
      newp: this.formPasword.value.newp,
      confirmp: this.formPasword.value.confirmp
    }

    let self = this
    this.requesting=true
    this.accountService.changePassword(pass).subscribe(function (respond) {
      self.requesting=false
      //self.accountService.Notify("Password changed", false)
      self.ClosePassword();
    },
      function (error) {
        self.requesting=false
        if(error._body=='"Old password does not match"')
        {
            self.errorRequest="Old password does not match"
        }
      },
      function () { })
  }

  errorRequest:string=''

  Close() {
    $('#myAccount').toggleClass('shown'); //close this
    $('#accountConfirmed').toggleClass('shown'); //open the confirm popup
    this.errorRequest=''
  }

  goPassword() {
    this.main = false
  }

  ClosePassword() {
    var data = {
      oldp: '',
      newp: '',
      confirmp: ''
    }
    this.formPasword.patchValue(data);
    this.main = true

    this.Close()
  }

  Validate() {
    if (!this.main)
      return this.formPasword.controls.oldp.errors != null || this.formPasword.controls.newp.errors != null || this.formPasword.controls.confirmp.errors != null || this.formPasword.value.newp != this.formPasword.value.confirmp
    else
      return this.form.controls.firstName.errors != null || this.form.controls.lastName.errors != null || this.form.controls.email.errors != null
  }

}
