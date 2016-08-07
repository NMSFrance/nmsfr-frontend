/* beautify ignore:start */
import {Component} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {FileUploader} from 'ng2-file-upload';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';
/* beautify ignore:end */

export class ModalPublicationData extends BSModalContext {
  constructor(public uploader: FileUploader) {
    super();
  }
}

@Component({
  selector: 'modal-data',
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class ModalPublicationFormComponent implements ModalComponent<ModalPublicationData> {
  context: ModalPublicationData;
  file: any;
  preview: any;

  constructor(public dialog: DialogRef<ModalPublicationData>) {
    this.context = dialog.context;
    this.file = this.context.uploader.queue[0];
    this.startUpload();
  }

  private startUpload(): void {
    this.file.upload();
    this.buildPreview();
  }

  private buildPreview(): void {
    let reader: FileReader = new FileReader();
    let that: any = this;
    reader.onload = function(e) {
      that.preview = e.target;
    }
    reader.readAsDataURL(this.file._file);
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
