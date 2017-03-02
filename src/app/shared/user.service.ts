import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUser, User } from './user.model';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: Http, private sessionService: SessionService) {
    this.currentUser.next({
      username: this.sessionService.username
    });
  }

  create(username: string, email: string, password: string) {
    return this.http
      .post(`http://deis.${environment.deis.cluster}/${environment.deis.apiVersion}/auth/register/`, {
        username: username,
        email: email,
        password: password
      })
      .map((res: Response) => res.json());
  }

  login(username: string, password: string) {
    let login$ = this.http
      .post(`http://deis.${environment.deis.cluster}/${environment.deis.apiVersion}/auth/login/`, {
        username: username,
        password: password
      })
      .map((res: Response) => res.json());

    // Handle successful login
    login$.subscribe((data: any) => {
      this.currentUser.next({
        username: username
      });
      this.sessionService.create(username, data.token);
    });

    return login$;
  }

  logout() {
    this.sessionService.destroy();
    this.currentUser.next(null);
  }

  isLoggedIn() {
    return this.sessionService.isActive();
  }
}
