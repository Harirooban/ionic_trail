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
import { NavController } from '@ionic/angular';
var PaymentPage = /** @class */ (function () {
    function PaymentPage(router, httpService, activaterouter, nav) {
        this.router = router;
        this.httpService = httpService;
        this.activaterouter = activaterouter;
        this.nav = nav;
        this.customer_id = activaterouter.snapshot.paramMap.get('customer_id');
        this.end_date = new Date().toJSON().split('T')[0];
        this.startDateWithTime = new Date();
        this.startDateWithTime.setDate(this.startDateWithTime.getDate() - 30);
        this.start_date = this.startDateWithTime.toJSON().split('T')[0];
        this.dataBasedOnDate();
    }
    PaymentPage.prototype.dataBasedOnDate = function () {
        var _this = this;
        var customer_dict = {
            "customer_id": this.customer_id,
            "start_date": this.start_date,
            "end_date": this.end_date
        };
        this.httpService.paymentPost(customer_dict).subscribe(function (payment_datas) {
            _this.payment_datas = payment_datas;
        }, function (error) {
            console.error(error);
        });
    };
    PaymentPage.prototype.checkVesselCount = function (vessel_count) {
        if (vessel_count == 0)
            return 'green';
        else
            return 'red';
    };
    PaymentPage.prototype.balcheckout = function (amount) {
        if (amount >= 0)
            return 'green';
        else
            return 'red';
    };
    PaymentPage.prototype.statusCheckout = function (payment_status) {
        if (payment_status == 'Initiated')
            return 'blue';
        else if (payment_status == 'Completed')
            return 'green';
        else if (payment_status == 'Disapproved')
            return 'red';
    };
    PaymentPage.prototype.newPayment = function () {
        this.nav.navigateForward('/newpayment/' + this.customer_id);
    };
    PaymentPage.prototype.ngOnInit = function () {
    };
    PaymentPage = __decorate([
        Component({
            selector: 'app-payment',
            templateUrl: './payment.page.html',
            styleUrls: ['./payment.page.scss'],
        }),
        __metadata("design:paramtypes", [Router, HttpService, ActivatedRoute,
            NavController])
    ], PaymentPage);
    return PaymentPage;
}());
export { PaymentPage };
//# sourceMappingURL=payment.page.js.map