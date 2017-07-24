import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peleTitle'
})
export class PeleTitlePipe implements PipeTransform {

  transform(value: string): string {
    
     var arr=value.split(" ")
      value="";
      for(var i=1;i<arr.length;i++)
      {
         value+=" "+arr[i]
      }

      return value;
  }

}
