import {Injectable, Inject} from '@angular/core';

@Injectable()
export class Api {
  constructor(@Inject('API') private api: string) { }

  getPublications() {
    console.log(this.api);
  }
}
