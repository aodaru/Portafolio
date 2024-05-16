import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitTags',
})
export class SplitTagsPipe implements PipeTransform {
  transform(value: string, separator: string): any {
    let arrayTags = value[0].split(separator);
    return arrayTags;
  }
}
