/* beautify ignore:start */
import {Component} from '@angular/core';
import {UserService} from '../../services/user';
import {User} from '../../interfaces/user.interface';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {FormBuilder, Validators, ControlGroup} from '@angular/common';
/* beautify ignore:end */

@Component({
  selector: 'signup',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES],
  styles: [require('./style.scss')],
  template: require('./template.html')
})
export class SignupComponent {
  form: ControlGroup;
  rePassword: string;

  constructor(public userService: UserService, public router: Router, public fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      matchingPasswords: fb.group({
        password: ['', Validators.required],
        rePassword: ['', Validators.required]
      }, {validator: this.isPasswordMatch})
    });
  }

  create(event: any): void {
    if(!this.form.valid) return;
    let user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.userService.newUser(user)
      .subscribe(
        res => {
          this.router.navigate(['Signin']);
        }
      );
    event.preventDefault();
  }

  isPasswordMatch(grp: ControlGroup) {
    let val;
    let valid = true;

    for (name in grp.controls) {
      if (val === undefined) {
        val = grp.controls[name].value
      } else {
        if (val !== grp.controls[name].value) {
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      isMatch: true
    };
  }
}
