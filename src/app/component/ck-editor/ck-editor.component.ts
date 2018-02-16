import { Component, OnInit } from '@angular/core';
import { EditorItem } from '../../model/editor-item';
import { CkEditorService } from '../../service/ck-editor.service';

@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrls: ['./ck-editor.component.css']
})
export class CkEditorComponent implements OnInit {

  items:Array<EditorItem>=[]

  constructor(private ckEditorService:CkEditorService) { }

  ngOnInit() {
    this.Read()
  }

  Read()
  {
    this.ckEditorService.read().subscribe(result=>{
      this.items=result.filter(i=>i.isActive)

      this.items.forEach(item=>{
          item.HtmlContent= item.HtmlContent.replace('./customcontent/','https://halacha.learntorah.com/mLog/customcontent/')
      })

    },error=>{},()=>{})
  }

}
