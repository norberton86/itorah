import { Component, OnInit,NgZone, Renderer2,ElementRef } from '@angular/core';
declare var $:any; 
@Component({
  selector: 'app-tehillim-show',
  templateUrl: './tehillim-show.component.html',
  styleUrls: ['./tehillim-show.component.css']
})
export class TehillimShowComponent implements OnInit {

  constructor(private renderer:Renderer2,private elementRef: ElementRef,private ngZone:NgZone) { }

  ngOnInit() {
    this.Initialize();
  }

  Initialize()
  {
    let self=this;

    $('#field-1').change(function(){   //all

          $(this).val()
          self.RefreshView();
          
    });

    $('#field-2').change(function(){   //currently showing

          $(this).val()
          self.RefreshView();
          
    });

    $('#field-3').change(function(){   //country

          $(this).val()
          self.RefreshView();
          
    });

  }

  RefreshView()
  {
       setTimeout(function(){ 

          $('#ballon').html($('#item-content-3').html());

      },500) 
  }

}
