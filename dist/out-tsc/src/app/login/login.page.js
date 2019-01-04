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
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(formBuilder, router, httpService) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.router = router;
        this.httpService = httpService;
        this.error_messages = {
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'minLength', message: 'minimum 6 characters is must' },
                { type: 'maxLength', message: 'maximum 50 characters is allowed' },
                { type: 'pattern', message: 'please enter the valid Email ID' }
            ],
        };
        this.loginForm = this.formBuilder.group({
            password: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(50),
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });
        this.httpService.testfun().subscribe(function (data) {
            _this.customer_datas = data;
            console.log(data);
        });
    }
    LoginPage.prototype.second = function () {
        this.router.navigate(['welcome']);
    };
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.login = function () {
        console.log('email : ', this.loginForm.value.email);
        console.log('password :', this.loginForm.value.password);
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [FormBuilder, Router, HttpService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map