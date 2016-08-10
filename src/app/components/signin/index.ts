/* beautify ignore:start */
import {Component} from '@angular/core';
import {UserService} from '../../services/user';
import {User} from '../../interfaces/user.interface';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
/* beautify ignore:end */

@Component({
  selector: 'signin',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES],
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class SigninComponent {
  user: User;

  constructor(public userService: UserService, public router: Router) {
    this.user = {
      name: '',
      email: '',
      password: ''
    };
  }

  connect(): void {
    this.userService.authenticate(this.user)
      .subscribe(
        res => {
          // create JWT
          this.router.navigate(['Publications']);
        }
      );
  }
}
