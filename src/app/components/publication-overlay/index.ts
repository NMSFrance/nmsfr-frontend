/* beautify ignore:start */
import {Component} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';
import {Publication} from '../../interfaces/publication.interface';
import {PublicationService} from '../../services/publication';
/* beautify ignore:end */

export class PublicationOverlayData extends BSModalContext {
  constructor(public publication: Publication) {
    super();
    this.dialogClass = 'overlay';
  }
}

@Component({
  selector: 'publication-overlay',
  providers: [PublicationService],
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class PublicationComponent implements ModalComponent<PublicationOverlayData> {
  context: PublicationOverlayData;
  publication: Publication;

  constructor(public dialog: DialogRef<PublicationOverlayData>, public publiService: PublicationService) {
    this.context = dialog.context;
    this.publication = this.context.publication;
  }

  onClose(): void {
    this.dialog.close();
  }

  onLike(p: Publication): void {
    this.publiService.like(p);
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return false;
  }
}
