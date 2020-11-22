import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../Services/UserDataService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email = '';
  password = '';

  constructor(private router: Router, private UserDataService: UserDataService) {

  }

  onLogin(){
    console.log(this.email);
    this.UserDataService.authenticateUser(this.email, this.password);
  }

}
