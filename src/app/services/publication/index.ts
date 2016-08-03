/* beautify ignore:start */
import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
/* beautify ignore:end */

@Injectable()
export class Publication {
  private publicationUri: string;

  constructor(
    @Inject('API') private api: string,
    private http: Http
  ) {
    this.publicationUri = api.concat('/publications');
  }

  getPublications(): Observable<Publication[]> {
    return this.http.get(this.publicationUri)
            .map(res => res.json());
  }
}
