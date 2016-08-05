/* beautify ignore:start */
import {Component, Input} from '@angular/core';
/* beautify ignore:end */

@Component({
  selector: 'spinner',
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class SpinnerComponent {
  private isRunning: boolean;

  constructor() {
    this.isRunning = false;
  }

  @Input()
  set running(value: boolean) {
    this.isRunning = value;
  }
}
