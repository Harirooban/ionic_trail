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
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { AuthenticationService } from '../authentication.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(formBuilder, navCtrl, httpService, authendicationService) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.httpService = httpService;
        this.authendicationService = authendicationService;
        this.login_form = this.formBuilder.group({
            user_name: ['', Validators.compose([Validators.required])],
            password: [null, Validators.required],
        });
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.onLoginClicled = function () {
        this.authendicationService.login(this.login_form.value);
        // this.navCtrl.navigateRoot('/app/tabs/(home:home)');
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder, NavController, HttpService,
            AuthenticationService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map