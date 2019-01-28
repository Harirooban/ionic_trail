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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service';
var HttpService = /** @class */ (function () {
    function HttpService(httpClient, globalService) {
        this.httpClient = httpClient;
        this.globalService = globalService;
    }
    HttpService.prototype.getUserAccess = function (data) {
        TOKEN = data.token;
        var headers = new HttpHeaders();
        headers.append('Authorization', TOKEN);
    };
    //  all customer datas
    // customer page
    HttpService.prototype.customers = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/customer/', { 'headers':  });
    };
    //  get customer data based on customer
    HttpService.prototype.customerPost = function (customer_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/customer/', customer_dict);
    };
    // all orders
    HttpService.prototype.orders = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/order/');
    };
    // all quote
    HttpService.prototype.quote = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/quote/');
    };
    // get order data based on customer
    HttpService.prototype.ordersPost = function (customer_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/order/', customer_dict);
    };
    //  get sales data based on customer 
    HttpService.prototype.salesPost = function (customer_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/sale/', customer_dict);
    };
    // all payment data
    HttpService.prototype.payment = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/payment/');
    };
    // payment data based on customer
    HttpService.prototype.paymentPost = function (customer_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/payment/', customer_dict);
    };
    // all products
    HttpService.prototype.product = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/product/');
    };
    // get the list of payment method
    HttpService.prototype.paymentmethod = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/paymentmethod/');
    };
    // posting new payment data based on customer 
    HttpService.prototype.newPaymentPost = function (newpayment_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/new/payment/add/', newpayment_dict);
    };
    // customer pref based
    HttpService.prototype.newCustomerpref = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/new/customer/preference/');
    };
    //  adding new customer
    HttpService.prototype.newCustomerPost = function (customer_data_with_pref) {
        return this.httpClient.post(this.globalService.base_url + 'main/new/customer/add/', customer_data_with_pref);
    };
    //  specs based on product
    HttpService.prototype.SpecBasedProductPost = function (product_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/new/order/preference/', product_dict);
    };
    //  adding new order
    HttpService.prototype.neworder = function (order_with_pref) {
        return this.httpClient.post(this.globalService.base_url + 'main/new/order/', order_with_pref);
    };
    //  converting order to sale
    HttpService.prototype.orderTosalePost = function (order_to_sale_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/order/to/sale/', order_to_sale_dict);
    };
    // sale history based on customer 
    HttpService.prototype.profilePost = function (customer_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/sale/history/', customer_dict);
    };
    // updating spec of existing customer
    HttpService.prototype.updateSpec = function (product_name_data) {
        return this.httpClient.post(this.globalService.base_url + 'main/update/customer/preference/', product_name_data);
    };
    // vessel update
    HttpService.prototype.VesselPost = function (vessel_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/update/vessel/', vessel_dict);
    };
    //  sale action (accept/reject)
    HttpService.prototype.saleAction = function (customer_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/update/sales/info/', customer_dict);
    };
    // update payment to sale group
    HttpService.prototype.paymentAction = function (payment_action_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/update/payment/action/', payment_action_dict);
    };
    // delivery for today
    HttpService.prototype.todayDelivery = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/today/deliver/customer/');
    };
    // list of orders which are not moved to sale
    HttpService.prototype.initiatedOrder = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/initiated/order/customer/');
    };
    //  overall payment history of all customers
    HttpService.prototype.overallPaymentCustomer = function () {
        return this.httpClient.get(this.globalService.base_url + 'main/overall/payment/customer/');
    };
    // update quote
    HttpService.prototype.quotePost = function (quote_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/quote/', quote_dict);
    };
    // post geo location data
    HttpService.prototype.geoPost = function (location_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/update/geolocation/', location_dict);
    };
    // 
    HttpService.prototype.get_order_details = function (update_order_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/get/order/details/', update_order_dict);
    };
    HttpService.prototype.updateOrder = function (update_order_dict) {
        return this.httpClient.post(this.globalService.base_url + 'main/update/order/', update_order_dict);
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