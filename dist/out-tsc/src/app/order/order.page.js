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
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
var OrderPage = /** @class */ (function () {
    function OrderPage(router, httpService, activaterouter) {
        var _this = this;
        this.router = router;
        this.httpService = httpService;
        this.activaterouter = activaterouter;
        // this line is to fetch the customer id from the url
        this.customer_id = activaterouter.snapshot.paramMap.get('customer_id');
        // an dict to post to django server
        var customer_dict = {
            "customer_id": this.customer_id,
        };
        // posting the dict to django server to filter based on I
        this.httpService.ordersPost(customer_dict).subscribe(function (order_data) {
            _this.order_datas = order_data;
            console.log(_this.order_datas);
        });
    }
    OrderPage.prototype.ngOnInit = function () {
    };
    OrderPage = __decorate([
        Component({
            selector: 'app-order',
            templateUrl: './order.page.html',
            styleUrls: ['./order.page.scss'],
        }),
        __metadata("design:paramtypes", [Router, HttpService, ActivatedRoute])
    ], OrderPage);
    return OrderPage;
}());
export { OrderPage };
//# sourceMappingURL=order.page.js.map