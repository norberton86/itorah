import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { QueueService } from '../../service/queue.service';
import { PodcastService } from '../../service/podcast.service';
import { SubscribeService } from '../../service/subscribe.service';
import { SocialLoginServic } from '../../service/social-login.service';
import { AlertService } from '../../service/alert.service';
import { TehillimService } from '../../service/tehillim.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MyCreditsService } from '../../service/my-credits.service';
import { AccountService } from '../../service/account.service';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare var $: any;
declare var FS: any;


@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css'],
  providers: [SocialLoginServic]
})
export class SocialLoginComponent implements OnInit, OnDestroy {

  title: string = "Sign In"
  signOut: boolean = false;
  signIn: boolean = true;
  forgot: boolean = false;
  createAccount: boolean = false;

  messageVisible: boolean = false;

  name: string = "";

  sub: any;

  form: FormGroup;

  constructor(private fb: FormBuilder, public _auth: AuthService, private ngZone: NgZone, private queueService: QueueService, private podcastService: PodcastService, private subscribeService: SubscribeService, private socialLoginServic: SocialLoginServic, private tehillimService: TehillimService, private accountService: AccountService, private myCreditsService: MyCreditsService, private alertService: AlertService) {
    this.InitializeForm();
  }


  Forgot() {
    this.signIn = false;
    this.forgot = true;
    this.title = "Forgot Password?"
  }


  GoBack() {
    this.forgot = false;
    this.signIn = true;
    this.title = "Sign In"
  }

  ResetPassword() {
    let self = this;
    this.socialLoginServic.Forgot(this.form.value.email).subscribe(
      function (respond) {
        if (respond == "Email sent")
          self.socialLoginServic.Notify("Check your email", false)
        else
          self.socialLoginServic.Notify("Recover password service is not available ", false)
      },
      function (error) {
        self.socialLoginServic.Notify("Service not available", true)
      },
      function () { }
    )
    this.GoBack();
  }


  CreateAccount() {
    this.signIn = false;
    this.createAccount = true;
    this.title = "Create an account"
  }

  GoBackfromAccount() {
    this.signIn = true;
    this.createAccount = false;
    this.title = "Sign In"
  }


  requesting: boolean = false

  Register() {

    if (this.requesting)
      return

    this.requesting = true

    this.socialLoginServic.Create({
      Email: this.form.value.email,
      FirstName: this.form.value.first,
      LastName: this.form.value.last,
      Password: this.form.value.password
    }).subscribe(
      data => {
        this.requesting = false
        if (data) {
          this.Reset()
          this.GoBackfromAccount();
          this.socialLoginServic.Notify("Account Created", false)
        }
      }, error => {
        this.requesting = false
      }, () => { })
  }

  Privacy() {
    $("#privacy").toggleClass('shown');
  }

  Agree() {
    return this.form.value.agree
  }


  //---------------------------------------------------------------------------------------

  SignIn(provider) {

    let self = this;

    this.sub = this._auth.login(provider).subscribe(
      (data: any) => {


        var grant_type = data.provider == "google" ? "googleAuth" : "facebookAuth"
        var token = "";

        if (data.provider == "google")
          token = data.idToken
        else
          token = data.token

        self.socialLoginServic.SignThirdParty(grant_type, token).subscribe(function (respond) {
          self.Save({ name: data.name, email: data.email, token: respond.access_token, provider: data.provider })
          self.messageVisible = false;
        },
          function (error) {
            self.messageVisible = true;

            setTimeout(function () {
              self.messageVisible = false;
            }, 3000)
          },
          function () { })

      }
    )
  }


  FullStory(data: any) {
    var fullstoryUser = {
      id: data.email,
      username: data.name
    }
    FS.identify(fullstoryUser.id, {
      displayName: fullstoryUser.username
    });
  }

  Save(data: any) {

    localStorage.setItem('userItorah', JSON.stringify({ name: data.name, email: data.email, token: data.token, provider: data.provider }))
    this.queueService.setLogin("Signed");
    this.podcastService.setLogin("Signed");
    this.subscribeService.setLogin("Signed");
    this.tehillimService.setLogin("Signed");
    this.accountService.setLogin("Signed");
    this.myCreditsService.setLogin("Signed");
    this.alertService.setLogin("Signed");
    this.RefreshView();

   try {
      this.FullStory(data)
    }
    catch (e) {
      console.log("Error trying the full story: "+e.message)
    }
  }


  Profile(token: string) {
    this.accountService.Profile(token).subscribe(result => {

      this.requesting = false
      this.messageVisible = false;
      this.Save({ name: result[0].FirstName + " " + result[0].LastName, email: this.form.value.email, token: token, provider: "itorah" })

    }, error => {
      this.requesting = false
      this.messageVisible = true;
    }, () => { })
  }

  Submit() {

    if (this.requesting)
      return

    this.requesting = true

    this.socialLoginServic.Sign(this.form.value.email, this.form.value.password).subscribe(
      respond => {
        this.Profile(respond.access_token)
      },
      error => {
        this.requesting = false
        this.messageVisible = true;

        setTimeout(function () {
          this.messageVisible = false;
        }, 3000)
      },
      function () { }
    )
  }

  Reset() {
    var data = {
      email: '',
      password: '',
      first: '',
      last: '',
      confirm: '',
      agree: ''
    }
    this.form.patchValue(data);
  }

  InitializeForm() {
    let EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

    var data = {
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      password: ['', Validators.required],
      first: ['', Validators.required],
      last: ['', Validators.required],
      confirm: ['', Validators.required],
      agree: false
    }

    this.form = this.fb.group(data);
  }

  Logout() {

    this.Remove()
    /*this._auth.logout().subscribe(
      (data)=>{
           if(data)
           {
            this.Remove()
           }
      }
    )*/
  }


  Remove() {
    localStorage.removeItem('userItorah');
    this.queueService.setLogin("LogOut");
    this.podcastService.setLogin("LogOut");
    this.subscribeService.setLogin("LogOut");
    this.tehillimService.setLogin("LogOut");
    this.myCreditsService.setLogin("LogOut");
    this.RefreshView();
  }

  RefreshView() {
    this.ngZone.run(() => {
      this.VerifyUser();
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.VerifyUser();
  }

  VerifyUser() {
    if (localStorage.getItem('userItorah') != null && localStorage.getItem('userItorah') != "") {
      this.title = "Sign Out"
      this.signIn = false;
      this.signOut = true;
      this.name = JSON.parse(localStorage.getItem('userItorah')).name;
      var name = this.name.split(" ")[0][0] + this.name.split(" ")[1][0] //firstname first letter and lastname
      $('#login-title').html(name).addClass('nor-circle')
    }
    else {
      this.title = "Sign In"
      this.signIn = true;
      this.signOut = false;
      $('#login-title').html("Sign In").removeClass('nor-circle')
    }
  }

  Close() {
    $('.nav-access > li > .dropdown-signin').hide().removeClass('shown')
  }


}
