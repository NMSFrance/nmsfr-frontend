/* beautify ignore:start */
import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../interfaces/user.interface';
/* beautify ignore:end */

@Injectable()
export class UserService {
  private userUri: string;
  private loginUri: string;

  constructor(
    @Inject('API') private api: string,
    private http: Http
  ) {
    this.userUri = api.concat('/users');
    this.loginUri = api.concat('/login');
  }

  newUser(u: User): Observable<User> {
    let body = JSON.stringify(u);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.userUri, body, options)
            .map(res => res.json());
  }

  authenticate(u: User): Observable<User> {
    let body = JSON.stringify(u);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUri, body, options)
            .map(res => res.json());
  }

}
