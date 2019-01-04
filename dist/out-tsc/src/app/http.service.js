var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service';
var HttpService = /** @class */ (function () {
    function HttpService(httpClient, globalService) {
        this.httpClient = httpClient;
        this.globalService = globalService;
    }
    HttpService.prototype.testfun = function () {
        // return this.httpClient.get(this.globalService.base_url + 'main/customer/' );
        return this.httpClient.get(this.globalService.base_url + 'main/customer/');
    };
    HttpService.prototype.orders = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/order/');
    };
    HttpService.prototype.ordersPost = function (customer_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/order/', customer_dict);
    };
    HttpService.prototype.sales = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/sale/');
    };
    HttpService.prototype.payment = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/payment/');
    };
    HttpService.prototype.paymentPost = function (customer_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/payment/', customer_dict);
    };
    HttpService.prototype.product = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/product/');
    };
    HttpService.prototype.paymentmethod = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/paymentmethod/');
    };
    HttpService.prototype.newPaymentPost = function (newpayment_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/newpayment/', newpayment_dict);
    };
    HttpService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, GlobalServiceService])
    ], HttpService);
    return HttpService;
}());
export { HttpService };
//# sourceMappingURL=http.service.js.map