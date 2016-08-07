/* beautify ignore:start */
import {Component} from '@angular/core';
import {PublicationService} from '../../services/publication';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {FileUploader} from 'ng2-file-upload';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';
/* beautify ignore:end */

export class ModalPublicationData extends BSModalContext {
  constructor(public uploader: FileUploader, public resetUploader: any) {
    super();
  }
}

@Component({
  selector: 'modal-data',
  providers: [PublicationService],
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class ModalPublicationFormComponent implements ModalComponent<ModalPublicationData> {
  context: ModalPublicationData;
  file: any;
  uploadedFile: string;
  publication: any;
  preview: any;

  constructor(public dialog: DialogRef<ModalPublicationData>,
    public publiService: PublicationService) {
    this.context = dialog.context;
    this.publication = {
      type: 'IMAGE',
      title: 'lol'
    };
    this.file = this.context.uploader.queue[0];
    this.buildPreview();
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

  onClose(): void {
    console.log(this.context.resetUploader());
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
    reader.readAsDataURL(this.file._file);
  }
}
