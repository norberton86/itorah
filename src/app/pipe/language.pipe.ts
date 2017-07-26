import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

 transform(value: string): string {
      value=value[0]+value[1]
      return value;
  }

}
