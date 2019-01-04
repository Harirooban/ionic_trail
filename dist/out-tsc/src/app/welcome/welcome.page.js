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
var WelcomePage = /** @class */ (function () {
    function WelcomePage(router) {
        this.router = router;
    }
    WelcomePage.prototype.order_page = function () {
        this.router.navigate(['order']);
    };
    WelcomePage.prototype.customer_page = function () {
        this.router.navigate(['customer']);
    };
    WelcomePage.prototype.sale_page = function () {
        this.router.navigate(['sale']);
    };
    WelcomePage.prototype.payment_page = function () {
        this.router.navigate(['payment']);
    };
    WelcomePage.prototype.product_page = function () {
        this.router.navigate(['product']);
    };
    WelcomePage.prototype.tabs_page = function () {
        this.router.navigateByUrl('/tabs/tabs/(tab1:tab1)');
    };
    WelcomePage.prototype.ngOnInit = function () {
    };
    WelcomePage = __decorate([
        Component({
            selector: 'app-welcome',
            templateUrl: './welcome.page.html',
            styleUrls: ['./welcome.page.scss'],
        }),
        __metadata("design:paramtypes", [Router])
    ], WelcomePage);
    return WelcomePage;
}());
export { WelcomePage };
//# sourceMappingURL=welcome.page.js.map