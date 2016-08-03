/* beautify ignore:start */
import {Directive, ElementRef, Renderer, HostListener, Input} from '@angular/core';
/* beautify ignore:end */

@Directive({
  selector: '[pov]'
})
export class Pov {

  @Input('povWidth') width: number;
  @Input('povHeight') height: number;

  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
    let element = this.el.nativeElement;
    let mouseX = event.pageX - element.offsetLeft;
    let mouseY = event.pageY - element.offsetTop;

    let centerX = element.offsetWidth / 2;
    let centerY = element.offsetHeight / 2;

    console.log(this.width, this.height);

    let positionX = ((mouseX - centerX) * 0.01) * -1;
    let positionY = ((mouseY - centerY) * 0.01) * -1;

    element.style.backgroundPositionX = positionX + 'px';
    element.style.backgroundPositionY = positionY + 'px';

    // console.log(centerX, centerY, mouseX, mouseY, positionX, positionY);
  }

  @HostListener('mouseleave') onMouseleave() {
    this.el.nativeElement.style.backgroundPosition = 'center';
  }

}
