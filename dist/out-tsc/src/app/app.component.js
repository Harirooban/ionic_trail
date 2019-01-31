var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from './http.service';
import { AuthenticationService } from './authentication.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, httpService, authenticationservice, router) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.httpService = httpService;
        this.authenticationservice = authenticationservice;
        this.router = router;
        this.appPages = [
            {
                title: 'Home',
                url: '/customer/',
                icon: 'home'
            },
            {
                title: 'Delivery',
                url: '/quickaccess/1',
                icon: 'cart'
            },
            {
                title: 'Orders',
                url: '/quickaccess/2',
                icon: 'basket'
            },
            {
                title: 'Payment',
                url: '/quickaccess/3',
                icon: 'wallet'
            },
            {
                title: 'Quote',
                url: '/updatequote/',
                icon: 'pricetag'
            }
        ];
        this.today = new Date().toJSON().split('T')[0];
        this.httpService.quote().subscribe(function (quote_data) {
            _this.quote_datas = quote_data;
            console.log(_this.quote_datas);
        });
        this.initializeApp();
    }
    AppComponent.prototype.logout = function () {
        this.authenticationservice.logout();
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.authenticationservice.authendicationState.subscribe(function (state) {
                if (state) {
                    _this.router.navigate(['customer']);
                }
                else {
                    _this.router.navigate(['login']);
                }
            });
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        __metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            HttpService,
            AuthenticationService,
            Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map