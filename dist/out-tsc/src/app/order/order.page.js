var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { Component, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Slides } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { DOCUMENT } from '@angular/platform-browser';
var OrderPage = /** @class */ (function () {
    function OrderPage(document, router, httpService, activaterouter, alertcontroller, modalController, navParams, toastController) {
        this.document = document;
        this.router = router;
        this.httpService = httpService;
        this.activaterouter = activaterouter;
        this.alertcontroller = alertcontroller;
        this.modalController = modalController;
        this.navParams = navParams;
        this.toastController = toastController;
        this.slideOpts = {
            effect: 'flip',
            allowTouchMove: false
        };
        this.product_details = null;
        this.product_answer = [];
        this.product_id = null;
        this.order_with_pref = {};
        this.quantity = null;
        this.delivery_date = null;
        this.actual_quantity = null;
        this.final_delivery_date = null;
        this.temp_refresh = false;
        this.orderPageDatas();
    }
    OrderPage.prototype.orderPageDatas = function () {
        var _this = this;
        this.today = new Date().toJSON().split('T')[0];
        this.final_delivery_date = new Date().toJSON().split('T')[0];
        this.customer = this.navParams.get('customer_value');
        // // an dict to post to django server
        var customer_dict = {
            "customer_id": this.customer.id,
        };
        console.log(customer_dict);
        // posting the dict to django server to filter based on I
        this.httpService.ordersPost(customer_dict).subscribe(function (order_data) {
            _this.order_datas = order_data;
            console.log(_this.order_datas);
        });
    };
    OrderPage.prototype.acceptOrder = function (order_product_order_id, order_product_product_code) {
        this.actual_quantity = null;
        this.product_name = order_product_product_code;
        this.order_id = order_product_order_id;
        window.scrollTo(0, 0);
        this.slides.slideTo(2);
        this.document.body.scrollTop = 0;
        this.document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0);
    };
    OrderPage.prototype.cancelOrder = function (order_product_order_id) {
        console.log("worked the decline");
        if (confirm('Are you sure')) {
            this.order_id = order_product_order_id,
                this.orderToSale(3);
        }
    };
    OrderPage.prototype.selectProduct = function (product) {
        var _this = this;
        this.quantity = null;
        this.product_details = product.name;
        this.product_id = product.id;
        var product_dict = {
            "product_id": this.product_id,
            "customer_id": this.customer.id
        };
        this.slides.slideTo(1);
        this.httpService.SpecBasedProductPost(product_dict).subscribe(function (order_data) {
            _this.product_data = order_data;
            console.log(_this.product_data);
            _this.product_answer = [];
            if (_this.product_details != null) {
                _this.product_data[_this.product_details].forEach(function (element) {
                    var temp_dict = {};
                    temp_dict['question_id'] = element.question_id;
                    temp_dict['answer_data'] = element.customer_answer;
                    temp_dict['question_name'] = element.question;
                    if (!element.hasOwnProperty('customer_answer')) {
                        if (element.question_type == 'boolean-checkbox') {
                            temp_dict['answer_data'] = false;
                        }
                        else {
                            temp_dict['answer_data'] = '';
                        }
                    }
                    _this.product_answer.push(temp_dict);
                });
            }
            console.log(_this.product_answer);
        });
    };
    OrderPage.prototype.slideForward = function (slide_index) {
        this.slides.slideTo(slide_index);
        if (slide_index == 0) {
            this.actual_quantity = null;
        }
    };
    OrderPage.prototype.updateOrderForm = function (order_product, slide_index) {
        var _this = this;
        console.log(order_product.order_id);
        this.slides.slideTo(slide_index);
        this.update_order_id = order_product.order_id;
        var update_order_dict = {
            "order_id": order_product.order_id,
        };
        this.httpService.get_order_details(update_order_dict).subscribe(function (data) {
            _this.update_order_temp = data;
            console.log(_this.update_order_temp);
            _this.update_order_product_name = _this.update_order_temp[0]['product_code'];
            _this.update_order_delivary_date = _this.update_order_temp[0]['delivary_date'];
            console.log(_this.update_order_delivary_date);
            _this.update_orderSpec_list = [];
            _this.update_order_temp[0]['specs'].forEach(function (element) {
                var temp_dict = {};
                temp_dict['question_id'] = element.question_id;
                temp_dict['update_answer_data'] = element.customer_answer;
                temp_dict['question_name'] = element.question;
                temp_dict['question_type'] = element.question_type;
                temp_dict['order_specs_id'] = element.order_spec_id;
                _this.update_orderSpec_list.push(temp_dict);
            });
            console.log(_this.update_orderSpec_list);
        });
    };
    OrderPage.prototype.updateOrder = function () {
        var _this = this;
        var update_order_dict = {
            'order_id': this.update_order_id,
            'specs': this.update_orderSpec_list
        };
        this.httpService.updateOrder(update_order_dict).subscribe(function (data) {
            _this.toastDispalay('order has been updated');
            _this.orderPageDatas();
            _this.slides.slideTo(0);
        }, function (error) {
            console.error(error);
        });
    };
    OrderPage.prototype.storeAnswerData = function () {
        this.temp_refresh = true;
        if (this.quantity == null) {
            alert('enter quantity');
            return false;
        }
        if (this.delivery_date == null) {
            alert('enter delivery_date');
            return false;
        }
        this.order_with_pref['customer_id'] = this.customer.id;
        this.order_with_pref['product_name'] = this.product_details;
        this.order_with_pref['product_id'] = this.product_id;
        this.order_with_pref['delivery_date'] = this.delivery_date;
        this.order_with_pref['quantity'] = this.quantity;
        this.order_with_pref['specs'] = this.product_answer;
        this.httpService.neworder(this.order_with_pref).subscribe(function (payment_datas) {
        }, function (error) {
            console.error(error);
        });
        this.orderPageDatas();
        this.slides.slideTo(0);
        console.log(this.order_with_pref);
        this.orderPageDatas();
    };
    OrderPage.prototype.orderToSale = function (status_id) {
        var _this = this;
        if (this.final_delivery_date == null) {
            alert('enter delivery_date');
            return false;
        }
        if (this.actual_quantity == null) {
            alert('enter actual quantity');
            return false;
        }
        this.temp_refresh = true;
        var order_to_sale_dict = {
            "customer_id": this.customer.id,
            "status_id": status_id,
            "order_id": this.order_id,
            "quantity": this.actual_quantity,
            "delivery_date": this.final_delivery_date
        };
        this.slides.slideTo(0);
        console.log(order_to_sale_dict);
        this.httpService.orderTosalePost(order_to_sale_dict).subscribe(function (data) {
            if (status_id == 4) {
                _this.toastDispalay('order has been accepted');
            }
            else {
                _this.toastDispalay('order has been declined');
            }
            _this.orderPageDatas();
        }, function (error) {
            console.error(error);
        });
    };
    OrderPage.prototype.doRefresh = function (event) {
        console.log('Begin async operation');
        this.orderPageDatas();
        event.target.complete();
    };
    OrderPage.prototype.closeModal = function () {
        this.modalController.dismiss({ "temp_refresh": this.temp_refresh });
    };
    OrderPage.prototype.toastDispalay = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
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
    OrderPage.prototype.ngOnInit = function () {
        var _this = this;
        window.scrollTo(0, 0);
        this.httpService.product().subscribe(function (pref_data) {
            _this.products = pref_data;
            console.log(_this.products);
        }, function (error) {
            console.error(error);
        });
    };
    __decorate([
        ViewChild('common_slide'),
        __metadata("design:type", Slides)
    ], OrderPage.prototype, "slides", void 0);
    OrderPage = __decorate([
        Component({
            selector: 'app-order',
            templateUrl: './order.page.html',
            styleUrls: ['./order.page.scss'],
        }),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Document, Router, HttpService, ActivatedRoute, AlertController,
            ModalController, NavParams, ToastController])
    ], OrderPage);
    return OrderPage;
}());
export { OrderPage };
//# sourceMappingURL=order.page.js.map