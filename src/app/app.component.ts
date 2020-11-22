import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserDataService } from './Services/UserDataService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public UsrDataService: UserDataService
  ) {
    this.initializeApp();
    if (this.UsrDataService.userId === null || this.UsrDataService.userId === undefined){
      if(JSON.parse(localStorage.getItem('userData'))) {
        this.UsrDataService.userId = JSON.parse(localStorage.getItem('userData')).userId;
      }
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
