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


@Pipe({
  name: 'reduceStringLink'
})
export class ReduceStringLinkPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length>39)
       value=value.substring(0,39)+"...";

      return value;
  }

}

@Pipe({
  name: 'reduceStringThumbail'
})
export class ReduceStringThumbailPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length>24)
       value=value.substring(0,24)+"...";

      return value;
  }

}