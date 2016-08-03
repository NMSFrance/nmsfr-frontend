/* beautify ignore:start */
import {Directive, ElementRef, Renderer, HostListener} from '@angular/core';
/* beautify ignore:end */

@Directive({
  selector: '[pov]'
})
export class Pov {

  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
    let element = this.el.nativeElement;
    let mouseX = event.pageX - element.offsetLeft;
    let mouseY = event.pageY - element.offsetTop;

    let centerX = element.offsetLeft + element.offsetWidth / 2;

    // TODO calculate image size
    let positionX = ((mouseX - centerX) * 0.4) * -1 - (centerX / 2);
    let positionY = (mouseY + (1080 * 0.2)) * -1;

    element.style.backgroundPositionX = positionX + 'px';
    element.style.backgroundPositionY = positionY + 'px';
  }

  @HostListener('mouseleave') onMouseleave() {
    this.el.nativeElement.style.backgroundPosition = 'center';
  }

}
