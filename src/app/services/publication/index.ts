/* beautify ignore:start */
import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Publication} from '../../interfaces/publication.interface'
/* beautify ignore:end */

@Injectable()
export class PublicationService {
  private publicationUri: string;
  private likeUri: string;

  constructor(
    @Inject('API') private api: string,
    private http: Http
  ) {
    this.publicationUri = api.concat('/publications');
    this.likeUri = api.concat('/likes');
  }

  getPublications(): Observable<Publication[]> {
    return this.http.get(this.publicationUri)
            .map(res => res.json());
  }

  getTopPublication(): Observable<Publication> {
    return this.http.get(this.publicationUri.concat('/5'))
            .map(res => res.json());
  }

  like(p: Publication): Observable<Publication> {
    let body = JSON.stringify({ publication_id: p.id, user_id: 42 });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.likeUri, body, options)
            .map(res => res.json());
  }

  unlike(p: Publication): Observable<Publication> {
    // TODO let likeEndpoint = '/' + p.id + '/42';
    let likeEndpoint = '/' + p.id;

    return this.http.delete(this.likeUri.concat(likeEndpoint))
            .map(res => res.json());
  }
}
