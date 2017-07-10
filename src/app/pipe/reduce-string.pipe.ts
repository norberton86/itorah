import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceString'
})
export class ReduceStringPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length>38)
       value=value.substring(0,35)+"...";

      return value;
  }

}
