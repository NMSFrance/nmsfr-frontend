/* beautify ignore:start */
import {Component} from '@angular/core';
import {UserService} from '../../services/user';
import {User} from '../../interfaces/user.interface';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
/* beautify ignore:end */

@Component({
  selector: 'signup',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES],
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class SignupComponent {
  user: User;
  rePassword: string;

  constructor(public userService: UserService, public router: Router) {
    this.user = {
      name: '',
      password: '',
      email: ''
    };
  }

  isFormValid(): boolean {
    return (this.user.name)
      && (this.user.password)
      && (this.user.email)
      && (this.rePassword)
      && (this.rePassword === this.user.password);
  }

  submit(): void {
    if(this.isFormValid()) {
      this.userService.newUser(this.user)
        .subscribe(
          res => {
            this.router.navigate(['Signin']);
          }
        );
    }
  }
}
