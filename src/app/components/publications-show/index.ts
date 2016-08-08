import {Component, OnInit} from '@angular/core';

import {PublicationService} from '../../services/publication';
import {Publication} from '../../interfaces/publication.interface';
import {PublicationOverlayData, PublicationComponent} from '../publication-overlay';

import {Pov} from './directives/pov.directive';
import {InfiniteScroll} from 'angular2-infinite-scroll';
import {SpinnerComponent} from '../spinner';
import {Modal} from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'publications',
  directives: [Pov, InfiniteScroll, SpinnerComponent],
  providers: [PublicationService],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class PublicationsComponent implements OnInit {
  publications: Publication[];
  topPublication: Publication;
  loading: boolean;

  constructor(public publiService: PublicationService, public modal: Modal) {

  }

  ngOnInit() {
    this.publiService.getPublications()
      .subscribe(
        publications => this.publications = publications
      );
    this.publiService.getTopPublication()
      .subscribe(
        publication => this.topPublication = publication
      );
  }

  onLike(p: Publication) {
    this.publiService.like(p);
  }

  onScroll(): void {
    this.loading = true;
    this.publiService.getPublications(this.publications.length)
      .subscribe(
        publications => {
          for(var publication of publications) {
            this.publications.push(publication);
          }
        },
        err => console.log(err),
        () => this.loading = false
      );
  }

  open(publication: Publication) {
    let modalData: PublicationOverlayData = new PublicationOverlayData(publication);
    this.modal.open(PublicationComponent, modalData);
  }

}
