/* beautify ignore:start */
import {Component} from '@angular/core';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {ModalPublicationFormComponent, ModalPublicationData} from '../modal-publication-form';
/* beautify ignore:end */

@Component({
    selector: 'dropbox',
    directives: [FILE_UPLOAD_DIRECTIVES],
    styles: [require('./style.scss')],
    template: require('./template.html')
})
export class DropboxComponent {
  hasDropZoneOver: boolean = false;
  uploader: FileUploader;

  constructor(public modal: Modal) {
    this.initUploader();
    this.hasDropZoneOver = false;
  }

  openModal() {
    let modalData: ModalPublicationData = new ModalPublicationData(this.uploader, this.initUploader.bind(this));
    this.modal.open(ModalPublicationFormComponent, modalData);
  }

  onDrop(e: any): void {
    this.openModal();
  }

  fileOverDrop(e: any): void {
    this.hasDropZoneOver = e;
  }

  initUploader(): void {
    this.uploader = new FileUploader({
      autoUpload: true,
      url: 'https://evening-anchorage-3159.herokuapp.com/api/'
    });
  }
}
