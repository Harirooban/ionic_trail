import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title:'Home',
      url:'/customer/',
      icon:'home'
    },
    {
      title: 'Delivery',
      url: '/quickaccess/1',
      icon:'cart'
    },
    {
      title:'Orders',
      url:'/quickaccess/2',
      icon:'basket'
    },
    {
      title:'Payment',
      url:'/quickaccess/3',
      icon:'wallet'
    }
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
