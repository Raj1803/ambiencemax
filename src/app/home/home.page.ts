import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { UserDataService } from '../Services/UserDataService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email = '';
  password = '';

  constructor(private router: Router, 
    private UserDataService: UserDataService,
    private nav: NavController,
    private menu: MenuController ) {

      // this.menu.enable(false);

  }

  onLogin(){
    console.log(this.email);
    // this.UserDataService.authenticateUser(this.email, this.password);
    this.UserDataService.authenticateUser1(this.email, this.password);

    this.email = "";
    this.password = "";
    
    

  }

  onPageDidEnter(){
    this.menu.enable(false);
  }

  onPageDidLeave(){
    this.menu.enable(true);
  }

}
