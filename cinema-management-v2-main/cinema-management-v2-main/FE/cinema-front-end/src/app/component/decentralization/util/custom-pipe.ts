import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'CustompPipe'
})
export class CustomPipe implements PipeTransform{
  transform(value: string, limit = 30, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
