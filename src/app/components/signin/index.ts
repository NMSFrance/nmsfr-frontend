/* beautify ignore:start */
import {Component} from '@angular/core';
import {UserService} from '../../services/user';
import {User} from '../../interfaces/user.interface';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {FormBuilder, Validators, ControlGroup} from '@angular/common';
/* beautify ignore:end */

@Component({
  selector: 'signin',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES],
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class SigninComponent {
  form: ControlGroup;

  constructor(public userService: UserService, public router: Router, public fb: FormBuilder) {
    this.form = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signin(event: any): void {
    let user: User = {
      name: this.form.value.login,
      email: this.form.value.login,
      password: this.form.value.password
    };
    this.userService.authenticate(user)
      .subscribe(
        res => {
          // create JWT
          this.router.navigate(['Publications']);
        }
      );
    event.preventDefault();
  }
}
