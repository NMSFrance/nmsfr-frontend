import {Component, OnInit} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import {Publication} from '../../services/publication';

@Component({
  selector: 'home',
  directives: [...FORM_DIRECTIVES],
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
