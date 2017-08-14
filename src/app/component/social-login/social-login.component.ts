import { Component, OnInit,OnDestroy,NgZone } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { QueueService } from '../../service/queue.service';
import { PodcastService } from '../../service/podcast.service';
import { SubscribeService } from '../../service/subscribe.service';
import { SocialLoginServic } from '../../service/social-login.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';



import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

declare var $:any; 

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css'],
  providers:[SocialLoginServic]
})
export class SocialLoginComponent implements OnInit,OnDestroy  {
  
  title:string="Sign In"
  signOut:boolean=false;
  signIn:boolean=true;

  messageVisible:boolean=false;

  name:string="";
  
  sub: any;

  form:FormGroup;

  constructor(private fb: FormBuilder,public _auth: AuthService,private ngZone:NgZone,private queueService:QueueService,private podcastService:PodcastService,private subscribeService:SubscribeService,private socialLoginServic:SocialLoginServic){
    this.InitializeForm();
   }
  
  SignIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data:any) => {

       this.Save(data)
        
      }
    )
  }



Save(data:any)
{
        localStorage.setItem('userItorah',JSON.stringify({name:data.name,email:data.email,token:data.token,provider:data.provider}))
        this.queueService.setLogin("Signed");
        this.podcastService.setLogin("Signed");
        this.subscribeService.setLogin("Signed");
        this.RefreshView();
}

 Submit()
 {
   let self=this;
   
   this.socialLoginServic.Sign(this.form.value.email,this.form.value.password).subscribe(
        function(respond){
                self.Save({name:"itorah itorah",email:self.form.value.email,token:respond.access_token,provider:"itorah"})
                self.messageVisible=false;
           },
           function(error){
             self.messageVisible=true;
           },
           function(){}
      )
 } 

  Reset()
  {
   var data ={
      email:'',
      password:'',
    }
    this.form.patchValue(data);
  }

 InitializeForm() 
 {
    var data ={
      email:['',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:'',
    }

     this.form = this.fb.group(data);
  }

  Logout(){

   if(localStorage.getItem('userItorah')!=null&&localStorage.getItem('userItorah')!="")
   {
     this.Remove()
   }
   else
    this._auth.logout().subscribe(
      (data)=>{
           if(data)
           {
            this.Remove()
           }
      }
    )
  }


 Remove()
 {
    localStorage.removeItem('userItorah');
             this.queueService.setLogin("LogOut");
             this.podcastService.setLogin("LogOut");
             this.subscribeService.setLogin("LogOut");
             this.RefreshView();
 }

  RefreshView()
  {
       this.ngZone.run(()=>{
                              this.VerifyUser();
                             })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  ngOnInit(){
   this.VerifyUser();
  }

  VerifyUser()
  {
   if(localStorage.getItem('userItorah')!=null&&localStorage.getItem('userItorah')!="")
   {
     this.title="Sign Out"
     this.signIn=false;
     this.signOut=true;
     this.name= JSON.parse(localStorage.getItem('userItorah')).name;
     var name=this.name.split(" ")[0][0]+this.name.split(" ")[1][0] //firstname first letter and lastname
     $('#login-title').html(name)
     $('#login-title').addClass('nor-circle')
   }
   else
   {
     this.title="Sign In"
     this.signIn=true;
     this.signOut=false;
     $('#login-title').html("Sign In")
     $('#login-title').removeClass('nor-circle')
   }
  }

  Close()
  {
    $('.nav-access > li > .dropdown-signin').hide().removeClass('shown')
  }

 
}
