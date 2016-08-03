import {Component, OnInit} from '@angular/core';

import {Publication} from '../../services/publication';

import {Pov} from './directives/pov.directive';

@Component({
  selector: 'home',
  directives: [Pov],
  providers: [Publication],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class Home implements OnInit {
  publications: Publication[];
  topPublication: Publication;

  constructor(public publiService: Publication) {
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

}
