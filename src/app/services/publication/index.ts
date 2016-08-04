/* beautify ignore:start */
import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Publication} from '../../interfaces/publication.interface'
/* beautify ignore:end */

@Injectable()
export class PublicationService {
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

  getTopPublication(): Observable<Publication> {
    return this.http.get(this.publicationUri.concat('/5'))
            .map(res => res.json());
  }

  like(pId: number): Observable<Publication> {
    let likeEndpoint = '/likes';
    return this.http.get(this.publicationUri.concat(likeEndpoint))
            .map(res => res.json());
  }
}
