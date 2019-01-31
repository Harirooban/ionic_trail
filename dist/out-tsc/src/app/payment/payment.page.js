var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { NavController, ToastController, AlertController } from '@ionic/angular';
var PaymentPage = /** @class */ (function () {
    function PaymentPage(router, httpService, activaterouter, toastController, alertcontroller, nav) {
        this.router = router;
        this.httpService = httpService;
        this.activaterouter = activaterouter;
        this.toastController = toastController;
        this.alertcontroller = alertcontroller;
        this.nav = nav;
        this.customer_id = activaterouter.snapshot.paramMap.get('customer_id');
        this.end_date = new Date().toJSON().split('T')[0];
        this.startDateWithTime = new Date();
        this.startDateWithTime.setDate(this.startDateWithTime.getDate() - 30);
        this.start_date = this.startDateWithTime.toJSON().split('T')[0];
    }
    PaymentPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var customer_dict = {
            "customer_id": this.customer_id,
            "start_date": this.start_date,
            "end_date": this.end_date
        };
        this.httpService.paymentPost(customer_dict).subscribe(function (payment_datas) {
            _this.payment_datas = payment_datas;
            _this.payment_status_name = _this.payment_datas[0]['payment_history'].payment_status;
            console.log(_this.payment_status_name);
            console.log(_this.payment_datas);
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
        else if (payment_status == 'Approved')
            return 'green';
        else if (payment_status == 'Disapproved')
            return 'red';
    };
    PaymentPage.prototype.homePage = function () {
        this.router.navigate(['customer']);
    };
    PaymentPage.prototype.newPayment = function () {
        this.nav.navigateForward('/newpayment/' + this.customer_id);
    };
    PaymentPage.prototype.doRefresh = function (event) {
        console.log('Begin async operation');
        this.ionViewWillEnter();
        event.target.complete();
    };
    PaymentPage.prototype.paymentAction = function (payment_data_payment_id, status_id) {
        var payment_action_dict = {
            "customer_id": this.customer_id,
            "payment_id": payment_data_payment_id,
            "status_id": status_id
        };
        this.httpService.paymentAction(payment_action_dict).subscribe(function () {
        }, function (error) {
            console.error(error);
        });
        this.toastDispalay(status_id);
    };
    PaymentPage.prototype.toastDispalay = function (status_id) {
        return __awaiter(this, void 0, void 0, function () {
            var toast, toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(status_id == 4)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.toastController.create({
                                message: "payment has been approved",
                                duration: 3000,
                                position: 'top'
                            })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.toastController.create({
                            message: "payment has been Disapproved",
                            duration: 3000,
                            position: 'top'
                        })];
                    case 3:
                        toast = _a.sent();
                        toast.present();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PaymentPage.prototype.confirmDecline = function (payment_data_payment_id, status_id) {
        if (confirm('Are you sure')) {
            this.paymentAction(payment_data_payment_id, status_id);
        }
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
            ToastController, AlertController, NavController])
    ], PaymentPage);
    return PaymentPage;
}());
export { PaymentPage };
//# sourceMappingURL=payment.page.js.map