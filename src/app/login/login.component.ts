import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(dataForm: any) {
    this.authenService.login(dataForm.username, dataForm.password);

    if (this.authenService.isAuthenticated) {
      this.authenService.saveAuthenticatedUserInLocalStorage();
      this.router.navigateByUrl('');
    }
  }

}
