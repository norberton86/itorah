import { Injectable } from '@angular/core';
declare var $:any


@Injectable()
export class PrintService {

  constructor() { }

  Print(id:string)
  {
    var DocumentContainer = document.getElementById(id);
    var WindowObject = window.open('', "PrintWindow", "width="+$(document).width()+",height="+$(document).height()+",top=0,left=0,toolbars=no,scrollbars=yes,status=no,resizable=yes");
    WindowObject.document.writeln(DocumentContainer.innerHTML);
    WindowObject.document.close();
    WindowObject.focus();
    WindowObject.print();
    WindowObject.close();
  }

}
