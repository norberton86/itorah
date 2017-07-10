import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceString'
})
export class ReduceStringPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length>29)
       value=value.substring(0,29)+"...";

      return value;
  }

}
