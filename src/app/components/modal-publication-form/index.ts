/* beautify ignore:start */
import {Component} from '@angular/core';
import {PublicationService} from '../../services/publication';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';
import {Charhunter} from '../../directives/charhunter.directive';
import {CounterPipe} from '../../pipes/counter';
/* beautify ignore:end */

export class ModalPublicationData extends BSModalContext {
  constructor(public uploader: FileUploader, public resetUploader: any) {
    super();
  }
}

@Component({
  selector: 'modal-data',
  providers: [PublicationService],
  directives: [FILE_UPLOAD_DIRECTIVES, Charhunter],
  pipes: [CounterPipe],
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class ModalPublicationFormComponent implements ModalComponent<ModalPublicationData> {
  context: ModalPublicationData;
  file: any;
  uploadedFile: string;
  publication: any;
  preview: any;
  isSelected: boolean;
  txtAreaMaxLength: number;
  txtTitleMaxLength: number;

  constructor(public dialog: DialogRef<ModalPublicationData>,
                public publiService: PublicationService) {
    this.context = dialog.context;
    this.publication = {
      type: 'IMAGE'
    };
    this.isSelected = false;
    this.preview = undefined;
    this.txtAreaMaxLength = 250;
    this.txtTitleMaxLength = 70;

    if(this.context.uploader.queue[0]) {
      this.file = this.context.uploader.queue[0]._file;
      this.buildPreview();
    }
  }

  newPublication(): void {
    // TODO
    this.publication.file = 'https://pixabay.com/static/uploads/photo/2013/01/29/01/02/google-76522_960_720.png';
    this.publication.author = 'Maurice';
    this.publiService.newPublication(this.publication)
      .subscribe(
        res => {
          this.onClose();
        }
      );
  }

  isValid(): boolean {
    if(!this.file) return false;
    if(typeof this.publication.title === 'undefined') return false;

    return (this.publication.title.length > 3)
      && (this.context.uploader.queue[0].isSuccess);
  }

  onSelectFile(el: any): void {
    if(el.files[0]) {
      this.isSelected = true;
      this.file = el.files[0];
      this.buildPreview();
    }
  }

  onClose(): void {
    this.context.resetUploader();
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return false;
  }

  private buildPreview(): void {
    let reader: FileReader = new FileReader();
    let that: any = this;
    reader.onload = function(e) {
      that.preview = e.target;
    };
    reader.readAsDataURL(this.file);
  }
}
