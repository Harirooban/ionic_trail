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
import { HttpService } from '../../http.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
var NewpaymentPage = /** @class */ (function () {
    function NewpaymentPage(httpService, activaterouter, formBuilder, nav) {
        var _this = this;
        this.httpService = httpService;
        this.activaterouter = activaterouter;
        this.formBuilder = formBuilder;
        this.nav = nav;
        this.customer_id = activaterouter.snapshot.paramMap.get('customer_id');
        this.today = new Date().toJSON().split('T')[0];
        this.paymentForm = this.formBuilder.group({
            date: [this.today, Validators.required],
            amount: [null, Validators.required],
            payment_method: [null, Validators.required],
            customer_id: [this.customer_id],
            reference_id: [null, Validators.required]
        });
        // dropdown data for payment method
        this.httpService.paymentmethod().subscribe(function (paymentmethod) {
            _this.paymentmethod_datas = paymentmethod;
            console.log(_this.paymentmethod_datas);
        }, function (error) {
            console.error(error);
        });
    }
    NewpaymentPage.prototype.addPayment = function () {
        var _this = this;
        if (this.paymentForm.value['amount'] == null) {
            alert('enter amount');
            return false;
        }
        if (this.paymentForm.value['amount'] == 0) {
            alert('amount must be greater than zero');
            return false;
        }
        if (this.paymentForm.value['payment_method'] == null) {
            alert('select the payment method');
            return false;
        }
        if (this.paymentForm.value['payment_method'] != 1) {
            if (this.paymentForm.value['reference_id'] == null) {
                alert('enter the reference_id');
                return false;
            }
        }
        //  dictionary to post data
        console.log(this.paymentForm.value);
        // getting data from form
        // to send data to django server
        this.httpService.newPaymentPost(this.paymentForm.value).subscribe(function () {
            _this.nav.navigateForward('/payment/' + _this.customer_id);
        }, function (error) {
            console.error(error);
        });
    };
    NewpaymentPage.prototype.ngOnInit = function () {
    };
    NewpaymentPage = __decorate([
        Component({
            selector: 'app-newpayment',
            templateUrl: './newpayment.page.html',
            styleUrls: ['./newpayment.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpService, ActivatedRoute, FormBuilder, NavController])
    ], NewpaymentPage);
    return NewpaymentPage;
}());
export { NewpaymentPage };
//# sourceMappingURL=newpayment.page.js.map