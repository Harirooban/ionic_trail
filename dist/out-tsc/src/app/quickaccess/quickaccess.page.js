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
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { SalePage } from '../sale/sale.page';
import { OrderPage } from '../order/order.page';
var QuickaccessPage = /** @class */ (function () {
    function QuickaccessPage(httpService, router, activaterouter, nav, modalController) {
        this.httpService = httpService;
        this.router = router;
        this.activaterouter = activaterouter;
        this.nav = nav;
        this.modalController = modalController;
        this.customer_datas = [];
        this.url_id = activaterouter.snapshot.paramMap.get('id');
        console.log(this.url_id);
    }
    QuickaccessPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (this.url_id == 1) {
            this.httpService.todayDelivery().subscribe(function (cust_data) {
                _this.customer_datas = cust_data;
                console.log(_this.customer_datas);
                _this.heading = 'Today deliver list';
                _this.report = 'No Delivery For Today';
                console.log(_this.report);
            });
        }
        else if (this.url_id == 2) {
            this.httpService.initiatedOrder().subscribe(function (cust_data) {
                _this.customer_datas = cust_data;
                console.log(_this.customer_datas);
                _this.heading = 'Initiated order details';
                _this.report = 'None of order has been initiated';
            });
        }
        else if (this.url_id == 3) {
            this.httpService.overallPaymentCustomer().subscribe(function (cust_data) {
                _this.customer_datas = cust_data;
                console.log(_this.customer_datas);
                _this.heading = 'Customer list for payment';
            });
        }
    };
    QuickaccessPage.prototype.quickAction = function (customer) {
        console.log(customer);
        console.log(customer.id);
        if (this.url_id == 1) {
            this.openModal(customer, SalePage);
        }
        else if (this.url_id == 2) {
            this.openModal(customer, OrderPage);
        }
        else if (this.url_id == 3) {
            this.nav.navigateForward('/payment/' + customer.id);
        }
    };
    QuickaccessPage.prototype.openModal = function (customer, page) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: page,
                            componentProps: {
                                customer_value: customer
                            },
                            cssClass: 'inset-modal'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    QuickaccessPage.prototype.homePage = function () {
        this.router.navigate(['customer']);
    };
    QuickaccessPage.prototype.ngOnInit = function () {
    };
    QuickaccessPage = __decorate([
        Component({
            selector: 'app-quickaccess',
            templateUrl: './quickaccess.page.html',
            styleUrls: ['./quickaccess.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpService, Router, ActivatedRoute, NavController, ModalController])
    ], QuickaccessPage);
    return QuickaccessPage;
}());
export { QuickaccessPage };
//# sourceMappingURL=quickaccess.page.js.map