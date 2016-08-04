import {Component, OnInit} from '@angular/core';

import {PublicationService} from '../../services/publication';
import {Publication} from '../../interfaces/publication.interface'

import {Pov} from './directives/pov.directive';

@Component({
  selector: 'home',
  directives: [Pov],
  providers: [PublicationService],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class Home implements OnInit {
  publications: Publication[];
  topPublication: Publication;

  constructor(public publiService: PublicationService) {
    // Do stuff
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

  like(p: Publication) {
    ++p.like;
    /*this.publiService.like(pId)
      .subscribe(
        res => {
          publication.id += 1;
          publication.has_like = true;
        }
      );*/
  }

}
