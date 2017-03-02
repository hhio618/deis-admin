import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { IUser, User } from '../../shared/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'dp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() onLogin = new EventEmitter();

  submitted: boolean = false;
  errors: string[] = [];
  user: IUser = new User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.errors = [];
    this.submitted = true;
    if (form.valid) {
      this.userService.login(this.user.username, this.user.password)
        .catch((error: any) => Observable.throw(error.json()))
        .subscribe(
          () => this.onLogin.emit(this.user),
          err => this.errors = err.non_field_errors,
        );
    }
  }
}
