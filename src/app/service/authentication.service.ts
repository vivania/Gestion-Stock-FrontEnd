import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public users = [{
    username: 'admin',
    password: '1234',
    roles: ['ADMIN', 'USER']
  },
  {
    username: 'user',
    password: '1234',
    roles: ['USER']
  },
  {
    username: 'user2',
    password: '1234',
    roles: ['USER']
  }
];

public isAuthenticated: boolean;
public userAuthenticated;
public token;

public login(username: string, password: string) {
  let user;
  this.users.forEach(u => {
    if (u.username === username && u.password === password) {
      user = u;
      this.token = {username: u.username, roles: u.roles};
    }
  });

  if(user) {
    this.isAuthenticated = true;
    this.userAuthenticated = user;
  } else {
    this.isAuthenticated = false;
    this.userAuthenticated = undefined;
  }
}

public isAdmin() {
  if (this.userAuthenticated) {
    if (this.userAuthenticated.roles.indexOf('ADMIN') > -1) {
      return true;
    }
    return false;
  }
}

public saveAuthenticatedUserInLocalStorage() {
  if (this.userAuthenticated) {
    localStorage.setItem('authTokent', btoa(JSON.stringify(this.token)));
  }
}

public loadAuthenticatedUserFromLocalStorage() {
  const token = localStorage.getItem('authTokent');
  if (token) {
    const user = JSON.parse(atob(token));
    this.userAuthenticated = {username: user.username, roles: user.roles};
    console.log(this.userAuthenticated);

    this.isAuthenticated = true;
  }
}

public removeLocalStorageWhenLogout() {
 localStorage.removeItem('authTokent');
 this.isAuthenticated = false;
 this.userAuthenticated = undefined;
 this.token = undefined;
}
  constructor() { }
}
