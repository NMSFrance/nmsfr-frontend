/* beautify ignore:start */
import {Directive, ElementRef, Renderer, HostListener} from '@angular/core';
/* beautify ignore:end */

@Directive({
  selector: '[pov]'
})
export class Pov {
  private oobX: number;
  private oobY: number;

  constructor(private el: ElementRef, private renderer: Renderer) {
    this.oobX = -1600 / 2;
    this.oobY = -1080 / 2;
  }

  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
    let element = this.el.nativeElement;

    let mouseX = event.layerX - element.offsetLeft;
    let mouseY = event.layerY - element.offsetTop;

    let positionX = this.oobX + mouseX;
    let positionY = this.oobY + mouseY;

    if(positionX > 0) positionX = 0;

    element.style.backgroundPositionX = positionX + 'px';
    element.style.backgroundPositionY = positionY + 'px';
  }

  @HostListener('mouseleave') onMouseleave() {
    this.el.nativeElement.style.backgroundPosition = 'center';
  }

}
