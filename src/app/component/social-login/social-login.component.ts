import { Component, OnInit,OnDestroy,NgZone } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { QueueService } from '../../service/queue.service';

declare var $:any; 

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit,OnDestroy  {
  
  title:string="Sign In"
  signOut:boolean=false;
  signIn:boolean=true;

  name:string="";
  
  sub: any;

  constructor(public _auth: AuthService,private ngZone:NgZone,private queueService:QueueService){ }
  
  SignIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data:any) => {

        localStorage.setItem('userItorah',JSON.stringify({name:data.name,email:data.email,token:data.token,provider:data.provider}))
        this.queueService.setLogin("Signed");
        this.RefreshView();
        
      }
    )
  }


  Logout(){
    this._auth.logout().subscribe(
      (data)=>{
           if(data)
           {
             localStorage.removeItem('userItorah');
             this.queueService.setLogin("LogOut");
             this.RefreshView();
           }
      }
    )
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
   }
   else
   {
     this.title="Sign In"
     this.signIn=true;
     this.signOut=false;
     $('#login-title').html("Sign In")
   }
  }

  Close()
  {
    $('.nav-access > li > .dropdown-signin').hide().removeClass('shown')
  }

 
}
