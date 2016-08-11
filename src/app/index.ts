/// src/app/index.ts
import {Component, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {FORM_PROVIDERS} from '@angular/common';
import {DropboxComponent} from './components/dropbox';
import {PublicationComponent} from './components/publication-overlay';
import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap';

import '../style/app.scss';

import routes from './routes';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app', // <app></app>
    providers: [...FORM_PROVIDERS],
    directives: [...ROUTER_DIRECTIVES, DropboxComponent, PublicationComponent],
    viewProviders: [...BS_MODAL_PROVIDERS],
    pipes: [],
    styles: [require('./style.scss')],
    template: require('./template.html'),
    encapsulation: ViewEncapsulation.None
})

@RouteConfig(routes)

export class App {
  constructor(
    public modal: Modal,
    public viewContainer: ViewContainerRef,
    public router: Router
  ) {
    modal.defaultViewContainer = viewContainer;
  }

  // TODO pas propre de ouf (voir angular/router)
  isInApp(): boolean {
    if(!this.router.currentInstruction) return false;
    let current: string = this.router.currentInstruction.component.routeName;
    return (current !== 'Signin')
      && (current !== 'Signup');
  }
}
