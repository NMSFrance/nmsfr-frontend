/* beautify ignore:start */
import {Pipe, PipeTransform} from '@angular/core';
/* beautify ignore:end */

@Pipe({
  name: 'counter'
})
export class CounterPipe implements PipeTransform {
  transform(value: number, length: number): any {
    return (value > length) ? length : value;
  }
}
