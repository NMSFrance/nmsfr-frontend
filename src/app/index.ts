/// src/app/index.ts
import {Component, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {FORM_PROVIDERS} from '@angular/common';
import {UploaderComponent} from './components/uploader';
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
    directives: [...ROUTER_DIRECTIVES, UploaderComponent],
    viewProviders: [...BS_MODAL_PROVIDERS],
    pipes: [],
    styles: [require('./style.scss')],
    template: require('./template.html'),
    encapsulation: ViewEncapsulation.None
})

@RouteConfig(routes)

export class App {
  constructor(public modal: Modal, viewContainer: ViewContainerRef) {
    modal.defaultViewContainer = viewContainer;
  }
}
