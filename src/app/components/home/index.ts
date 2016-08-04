import {Component, OnInit} from '@angular/core';

import {PublicationService} from '../../services/publication';
import {Publication} from '../../interfaces/publication.interface';

import {Pov} from './directives/pov.directive';
import {InfiniteScroll} from 'angular2-infinite-scroll';

@Component({
  selector: 'home',
  directives: [Pov, InfiniteScroll],
  providers: [PublicationService],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class Home implements OnInit {
  publications: Publication[];
  topPublication: Publication;

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
    this.publiService.getPublications(this.publications.length)
      .subscribe(
        publications => {
          for(var publication of publications) {
            this.publications.push(publication);
          }
        }
      );
  }

}
