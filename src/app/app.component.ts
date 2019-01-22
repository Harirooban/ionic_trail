import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  quote_datas:any;
  today:any;
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
    },
    {
      title:'Quote',
      url:'/updatequote/',
      icon:'pricetag'
    }
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpService : HttpService 
  ) {

    this.today = new Date().toJSON().split('T')[0]
    this.httpService.quote().subscribe((quote_data)=> {

      this.quote_datas = quote_data;    
      console.log(this.quote_datas)
    })
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
