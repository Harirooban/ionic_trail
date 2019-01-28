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
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { ModalController, NavController } from '@ionic/angular';
import { ProdprefPage } from '../prodpref/prodpref.page';
import { OrderPage } from '../order/order.page';
import { SalePage } from '../sale/sale.page';
import { DataServiceService } from '../data-service.service';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(activaterouter, nav, router, httpService, modalController, ref, dataService) {
        this.activaterouter = activaterouter;
        this.nav = nav;
        this.router = router;
        this.httpService = httpService;
        this.modalController = modalController;
        this.ref = ref;
        this.dataService = dataService;
        this.customer_info = [];
        this.sale_datas = null;
        this.date_values = null;
    }
    ProfilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.customer_info = this.dataService.customer_datas;
        var customer_dict = {
            'customer_id': this.customer_info['id']
        };
        console.log(this.customer_info);
        this.httpService.profilePost(customer_dict).subscribe(function (data) {
            _this.sale_datas = data;
            _this.date_values = Object.keys(data);
            console.log(_this.date_values);
            console.log(_this.sale_datas);
            _this.ref.detectChanges();
        }, function (error) {
            console.error(error);
        });
    };
    ProfilePage.prototype.update = function () {
        this.nav.navigateForward('/newcustomer/' + this.customer_info['id']);
    };
    ProfilePage.prototype.checkVesselCount = function (vessel_count) {
        if (vessel_count == 0)
            return 'green';
        else
            return 'red';
    };
    ProfilePage.prototype.balcheckout = function (amount) {
        if (amount >= 0)
            return 'green';
        else
            return 'red';
    };
    ProfilePage.prototype.openModal = function (customer_info) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ProdprefPage,
                            componentProps: {
                                customer_value: customer_info
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
    // order modal
    ProfilePage.prototype.openOrderModal = function (customer_info) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: OrderPage,
                            componentProps: {
                                customer_value: customer_info
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
    // delivery modal
    ProfilePage.prototype.openDeliveryModal = function (customer_info) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: SalePage,
                            componentProps: {
                                customer_value: customer_info
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
    ProfilePage.prototype.paymentPage = function (customer_info) {
        this.nav.navigateForward('/payment/' + this.customer_info.id);
    };
    ProfilePage.prototype.doRefresh = function (event) {
        console.log('Begin async operation');
        this.ionViewWillEnter();
        event.target.complete();
    };
    ProfilePage.prototype.statusColor = function (transaction_status_id) {
        if (transaction_status_id == 1) {
            return 'yellow';
        }
        else if (transaction_status_id == 3) {
            return 'blue';
        }
        else if (transaction_status_id == 4 || transaction_status_id == 2) {
            return 'green';
        }
        else if (transaction_status_id == 5) {
            return 'red';
        }
    };
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute, NavController,
            Router, HttpService, ModalController,
            ChangeDetectorRef, DataServiceService])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map