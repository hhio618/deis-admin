import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  username = sessionStorage.getItem('username');
  token = sessionStorage.getItem('token');

  constructor() { }

  create(username, token) {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('token', token);
  }

  destroy() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  }

  isActive() {
    return sessionStorage.getItem('token');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }
}
