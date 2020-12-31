import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserDataService } from './Services/UserDataService';
import { Button } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public user_id;
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public UsrDataService: UserDataService,
    public alertconrol: AlertController
  ) {
    this.initializeApp();
    if (this.UsrDataService.userId === null || this.UsrDataService.userId === undefined){
      if(JSON.parse(localStorage.getItem('userData'))) {
        this.UsrDataService.userId = JSON.parse(localStorage.getItem('userData')).userId;
      }
    }

    this.user_id = localStorage.getItem('userId');

   // this.user_id = this.UsrDataService.userId;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public makealert(){

    this.presentAlert(this.user_id);

  }

  async presentAlert(user_id: any){
    const alert = await this.alertconrol.create({

      message: '<div class="center"> <img class="card-alert" src="../assets/user_icon.png"/></div> <div class="center">{{ user_id }}</div>',
      buttons: ['Ok']

    });

    await alert.present();

  }

  

}
