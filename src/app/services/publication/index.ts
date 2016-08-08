/* beautify ignore:start */
import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Publication} from '../../interfaces/publication.interface';
/* beautify ignore:end */

@Injectable()
export class PublicationService {
  private publicationUri: string;
  private likeUri: string;
  private limit: number;

  constructor(
    @Inject('API') private api: string,
    private http: Http
  ) {
    this.publicationUri = api.concat('/publications');
    this.likeUri = api.concat('/likes');
    this.limit = 9;
  }

  getPublications(start = 0): Observable<Publication[]> {
    let params: URLSearchParams = new URLSearchParams();

    params.set('_start', String(start));
    params.set('_end', String(this.limit + start));

    return this.http.get(this.publicationUri, {search: params})
            .map(res => res.json());
  }

  getTopPublication(): Observable<Publication> {
    return this.http.get(this.publicationUri.concat('/1'))
            .map(res => res.json());
  }

  like(p: Publication): Observable<Publication> {
    if(p.has_like) { // like
      let body = JSON.stringify({ publication_id: p.id, user_id: 42 });
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.likeUri, body, options)
              .map(res => res.json());
    } else { // dislike
      let likeEndpoint = '/' + p.id;

      return this.http.delete(this.likeUri.concat(likeEndpoint))
              .map(res => res.json());
    }
  }

  newPublication(p: Publication): Observable<Publication> {
    let body = JSON.stringify(p);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.publicationUri, body, options)
            .map(res => res.json());
  }
}
