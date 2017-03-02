import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'dpDateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string | number, ...args: any[]): any {
    if (!value) return '';
    return format(value, args[0]);
  }

}
