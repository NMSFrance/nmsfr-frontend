/* beautify ignore:start */
import {Component} from '@angular/core';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {ModalDataComponent, ModalData} from './components/modal-data';
/* beautify ignore:end */

@Component({
    selector: 'uploader',
    directives: [FILE_UPLOAD_DIRECTIVES],
    styles: [require('./style.scss')],
    template: require('./template.html')
})
export class UploaderComponent {
  uploaderTool: FileUploader = new FileUploader({url: 'https://evening-anchorage-3159.herokuapp.com/api/'});
  hasDropZoneOver: boolean = false;

  constructor(public modal: Modal) { }

  openModal() {
    this.modal
      .open(ModalDataComponent, new ModalData('toto.jpg'));
  }

  fileOverDrop(e: any): void {
    this.hasDropZoneOver = e;
  }
}
