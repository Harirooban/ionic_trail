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
var SalePage = /** @class */ (function () {
    function SalePage(router, httpService) {
        var _this = this;
        this.router = router;
        this.httpService = httpService;
        this.httpService.sales().subscribe(function (sale_data) {
            _this.sale_datas = sale_data;
            console.log(_this.sale_datas);
        });
    }
    SalePage.prototype.ngOnInit = function () {
    };
    SalePage = __decorate([
        Component({
            selector: 'app-sale',
            templateUrl: './sale.page.html',
            styleUrls: ['./sale.page.scss'],
        }),
        __metadata("design:paramtypes", [Router, HttpService])
    ], SalePage);
    return SalePage;
}());
export { SalePage };
//# sourceMappingURL=sale.page.js.map