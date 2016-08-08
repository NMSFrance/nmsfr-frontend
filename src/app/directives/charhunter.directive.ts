/* beautify ignore:start */
import {Directive, ElementRef, Renderer, Input, HostListener} from '@angular/core';
/* beautify ignore:end */

@Directive({
    selector: '[charhunter]'
})
export class Charhunter {
  @Input('maxLength') maxLength: number;

  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  @HostListener('keyup', ['$event.target']) onKeyup(el: any) {
    this.controlEl(el);
  }

  @HostListener('change', ['$event.target']) onChange(el: any) {
    this.controlEl(el);
  }

  private controlEl(el: any) {
    if(el.value.length > this.maxLength) el.value = el.value.slice(0, this.maxLength);
  }

}
