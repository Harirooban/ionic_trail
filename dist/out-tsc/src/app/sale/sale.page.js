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
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { ModalController, NavParams, NavController, AlertController, ToastController } from '@ionic/angular';
import { Slides } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
var SalePage = /** @class */ (function () {
    function SalePage(router, alertcontroller, httpService, geolocation, toastController, modalController, navParams, nav) {
        this.router = router;
        this.alertcontroller = alertcontroller;
        this.httpService = httpService;
        this.geolocation = geolocation;
        this.toastController = toastController;
        this.modalController = modalController;
        this.navParams = navParams;
        this.nav = nav;
        this.slideOpts = {
            effect: 'flip',
            allowTouchMove: false
        };
        this.temp_refresh = false;
        this.getSaleData();
    }
    SalePage.prototype.getCustomerLocatoion = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.geo_latitude = resp.coords.latitude;
            _this.geo_longitude = resp.coords.longitude;
        });
        var location_dict = {
            "latitude": this.geo_latitude,
            "longitude": this.geo_longitude,
            "customer_id": this.customer.id
        };
        console.log(location_dict);
        this.httpService.geoPost(location_dict).subscribe(function () {
        });
    };
    SalePage.prototype.getSaleData = function () {
        var _this = this;
        this.customer = this.navParams.get('customer_value');
        console.log(this.customer);
        // // an dict to post to django server
        var customer_dict = {
            "customer_id": this.customer.id
        };
        console.log(customer_dict);
        this.vessel = this.customer.vessel_count;
        this.httpService.salesPost(customer_dict).subscribe(function (sale_data) {
            _this.sale_datas = sale_data;
            console.log(_this.sale_datas);
        });
    };
    SalePage.prototype.vesselUpdate = function (count) {
        this.temp_refresh = true;
        if (count == 1) {
            this.vessel = this.vessel + 1;
            var vessel_dict = {
                "customer_id": this.customer.id,
                "vessel_count": this.vessel
            };
            this.httpService.VesselPost(vessel_dict).subscribe(function (data) {
            });
        }
        else {
            if (this.vessel > 0) {
                this.vessel = this.vessel - 1;
                var vessel_dict = {
                    "customer_id": this.customer.id,
                    "vessel_count": this.vessel
                };
                this.httpService.VesselPost(vessel_dict).subscribe(function (data) {
                });
            }
        }
    };
    SalePage.prototype.closeModal = function () {
        this.modalController.dismiss({ "temp_refresh": this.temp_refresh });
    };
    SalePage.prototype.paymentPage = function () {
        this.modalController.dismiss();
        this.nav.navigateForward('/newpayment/' + this.customer.id);
    };
    SalePage.prototype.checkVesselCount = function (vessel_count) {
        if (vessel_count == 0)
            return 'green';
        else
            return 'red';
    };
    SalePage.prototype.balcheckout = function (amount) {
        if (amount >= 0)
            return 'green';
        else
            return 'red';
    };
    SalePage.prototype.orderAccept = function (item) {
        this.temp_refresh = true;
        var customer_dict = {
            "customer_id": this.customer.id,
            "sale_id": item.sale_id,
            "reason_id": 5
        };
        this.httpService.saleAction(customer_dict).subscribe(function () {
        }, function (error) {
            console.error(error);
        });
        this.acceptToastDispalay();
    };
    SalePage.prototype.orderDecline = function (value, item) {
        this.temp_refresh = true;
        var customer_dict = {
            "customer_id": this.customer.id,
            "sale_id": item.sale_id,
            "reason_id": value
        };
        console.log(customer_dict);
        this.httpService.saleAction(customer_dict).subscribe(function () {
        }, function (error) {
            console.error(error);
        });
        this.declineToastDispalay();
    };
    SalePage.prototype.doRefresh = function (event) {
        console.log('Begin async operation');
        this.getSaleData();
        event.target.complete();
    };
    SalePage.prototype.reasonForRejection = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertcontroller.create({
                            header: 'Reasons',
                            inputs: [{
                                    name: 'Did Not Order',
                                    type: 'radio',
                                    label: 'Did Not Order',
                                    value: 1,
                                    checked: true
                                },
                                {
                                    name: 'Not At Door',
                                    type: 'radio',
                                    label: 'Not At Door',
                                    value: 2,
                                },
                                {
                                    name: 'Wrong Order',
                                    type: 'radio',
                                    label: 'Wrong Order',
                                    value: 3,
                                },
                                {
                                    name: 'Declined',
                                    type: 'radio',
                                    label: 'Declined',
                                    value: 4,
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('cancled');
                                    }
                                }, {
                                    text: 'Okay',
                                    handler: function (value) {
                                        console.log(value, item.sale_id);
                                        _this.orderDecline(value, item);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalePage.prototype.acceptToastDispalay = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "order has been delivered",
                            duration: 3000,
                            position: 'top'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalePage.prototype.declineToastDispalay = function () {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "order has been declined",
                            duration: 3000,
                            position: 'top'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SalePage.prototype.ngOnInit = function () {
    };
    __decorate([
        ViewChild('common_slide'),
        __metadata("design:type", Slides)
    ], SalePage.prototype, "slides", void 0);
    SalePage = __decorate([
        Component({
            selector: 'app-sale',
            templateUrl: './sale.page.html',
            styleUrls: ['./sale.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            AlertController,
            HttpService,
            Geolocation,
            ToastController,
            ModalController,
            NavParams,
            NavController])
    ], SalePage);
    return SalePage;
}());
export { SalePage };
//# sourceMappingURL=sale.page.js.map