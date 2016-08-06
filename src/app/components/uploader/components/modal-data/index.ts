/* beautify ignore:start */
import {Component} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';
/* beautify ignore:end */

export class ModalData extends BSModalContext {
  constructor(public file: string) {
    super();
  }
}

@Component({
  selector: 'modal-data',
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class ModalDataComponent implements ModalComponent<ModalData> {
  context: ModalData;

  constructor(public dialog: DialogRef<ModalData>) {
    this.context = dialog.context;
  }

  onClose(): void {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return false;
  }
}
