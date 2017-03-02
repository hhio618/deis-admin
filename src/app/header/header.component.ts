import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { IUser } from '../shared/user.model';

@Component({
  selector: 'dp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

}
