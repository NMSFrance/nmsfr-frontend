import {Component, OnInit} from '@angular/core';

import {PublicationService} from '../../services/publication';
import {Publication} from '../../interfaces/publication.interface';

import {Pov} from './directives/pov.directive';
import {InfiniteScroll} from 'angular2-infinite-scroll';
import {SpinnerComponent} from '../spinner';

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

  constructor(public publiService: PublicationService) {

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

  likeAction(p: Publication) {
    if(p.has_like) {
      this.publiService.unlike(p)
        .subscribe(
          res => {
            --p.like;
            p.has_like = false;
          }
        );
    } else {
      this.publiService.like(p)
        .subscribe(
          res => {
            ++p.like;
            p.has_like = true;
          }
        );
    }
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
    console.log(publication);
  }

}
