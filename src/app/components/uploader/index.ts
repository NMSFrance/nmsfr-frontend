/* beautify ignore:start */
import {Component} from '@angular/core';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {Modal} from 'angular2-modal/plugins/bootstrap';
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

  test() {
    this.modal.prompt()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .keyboard(27)
      .title('Reseigne ta découverte !')
      .body('./template.html')
      .okBtn('Envoyer le rapport')
      .open();
  }

  fileOverDrop(e: any): void {
    this.hasDropZoneOver = e;
  }
}
