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
import { HttpService } from '../http.service';
var ProductPage = /** @class */ (function () {
    function ProductPage(router, httpService) {
        var _this = this;
        this.router = router;
        this.httpService = httpService;
        this.httpService.product().subscribe(function (product_data) {
            _this.product_datas = product_data;
            console.log(_this.product_datas);
        });
    }
    ProductPage.prototype.ngOnInit = function () {
    };
    ProductPage = __decorate([
        Component({
            selector: 'app-product',
            templateUrl: './product.page.html',
            styleUrls: ['./product.page.scss'],
        }),
        __metadata("design:paramtypes", [Router, HttpService])
    ], ProductPage);
    return ProductPage;
}());
export { ProductPage };
//# sourceMappingURL=product.page.js.map