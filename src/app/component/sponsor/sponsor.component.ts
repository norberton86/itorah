import { Component, OnInit } from '@angular/core';
import { Sponsors } from '../../model/sponsors';
import { SponsorService } from '../../service/sponsor.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css'],
  providers: [SponsorService]
})
export class SponsorComponent implements OnInit {

   sponsors:Array<Sponsors>;
  
  constructor(private sponsorService:SponsorService) {


       this.sponsors=[];
      //mock
      var p1=new Sponsors();
      p1.description="Company description or tag line 1";
      p1.name="Sponsor Name 1";
      p1.url="www.Url1.com";

      var p2=new Sponsors();
      p2.description="Company description or tag line 2";
      p2.name="Sponsor Name 2";
      p2.url="www.Url2.com";

      this.sponsors.push(p1);
      this.sponsors.push(p2);

   }

  ngOnInit() {
    //this.Read();
  }

  Read() {
       this.sponsorService.read().subscribe( 
           result=>this.sponsors = result
       )

   }
}
