import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { IUser, User } from '../../shared/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'dp-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Output() onRegister = new EventEmitter();

  submitted: boolean = false;
  user: IUser = new User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.valid) {
      this.userService.create(this.user.username, this.user.email, this.user.password)
        .subscribe(() => {
          this.onRegister.emit(this.user);
        });
    }
  }
}
