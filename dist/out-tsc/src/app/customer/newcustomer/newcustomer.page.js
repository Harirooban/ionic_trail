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
import { Slides, ToastController } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
var NewcustomerPage = /** @class */ (function () {
    function NewcustomerPage(httpService, activaterouter, router, geolocation, formBuilder, toastController) {
        this.httpService = httpService;
        this.activaterouter = activaterouter;
        this.router = router;
        this.geolocation = geolocation;
        this.formBuilder = formBuilder;
        this.toastController = toastController;
        this.slideOpts = {
            effect: 'flip',
            allowTouchMove: false
        };
        this.selected_product = null;
        this.product_answer = [];
        this.single_customer_pref = [];
        this.customer_data_with_pref = {};
        this.shownGroup = null;
        this.customer_id = 0;
        this.product_name_data = [];
        this.product_data = [];
        this.specs = null;
        this.customer_id = activaterouter.snapshot.paramMap.get('customer_id');
        console.log(activaterouter.snapshot.paramMap.get('customer_id'));
        // to get the form values in customerForm 
        this.customerForm = this.formBuilder.group({
            id: ['new_customer_value'],
            name: [null],
            code: [''],
            phone_number: [null],
            whatsapp: [null],
            door_number: [null],
            community: [null],
            postal_code: [null],
            latitude: [null],
            longitude: [null],
        });
    }
    // get the geolocatio 
    NewcustomerPage.prototype.getCustomerLocatoion = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.customerForm.controls['latitude'].setValue(resp.coords.latitude);
            _this.customerForm.controls['longitude'].setValue(resp.coords.longitude);
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
        });
    };
    // new customer product questions
    NewcustomerPage.prototype.singleQuestion = function () {
        var _this = this;
        this.product_answer = [];
        if (this.selected_product != null) {
            this.new_customer_pref[this.selected_product].forEach(function (element) {
                var temp_dict = {};
                temp_dict['question_id'] = element.question_id;
                temp_dict['answer_data'] = element.customer_answer;
                temp_dict['product_id'] = element.product_id;
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
    };
    //accodian for  displaying the selected specs
    NewcustomerPage.prototype.openList = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    NewcustomerPage.prototype.isGroupShown = function (group) {
        return this.shownGroup == group;
    };
    ;
    // to store the spec for new customers 
    NewcustomerPage.prototype.storeAnswerData = function (slide_index) {
        if (this.customer_id == 0) {
            this.single_customer_pref.push({
                'product_name': this.selected_product,
                'customer_product_preference': this.product_answer
            });
            this.slides.slideTo(0);
            console.log(this.single_customer_pref),
                function (error) {
                    console.error(error);
                };
        }
        if (this.customer_id != 0) {
            this.slides.slideTo(4);
        }
    };
    // to  add/update customers
    NewcustomerPage.prototype.addCustomer = function () {
        var _this = this;
        // to add new customers
        if (this.customer_id == 0) {
            if (this.customerForm.value['name'] == null) {
                alert('enter name');
                return false;
            }
            if (this.customerForm.value['phone_number'] == null) {
                alert('enter phone number');
                return false;
            }
            if (this.customerForm.value['whatsapp'] == null) {
                alert('enter whether whatasapp exists or not');
                return false;
            }
            if (this.customerForm.value['door_number'] == null) {
                alert('enter door_number');
                return false;
            }
            if (this.customerForm.value['community'] == null) {
                alert('enter community');
                return false;
            }
            if (this.customerForm.value['postal_code'] == null) {
                alert('enter postal code');
                return false;
            }
            this.customer_data_with_pref['customer_details'] = this.customerForm.value;
            this.customer_data_with_pref['product_specs'] = this.single_customer_pref;
            console.log(this.customer_data_with_pref);
            this.httpService.newCustomerPost(this.customer_data_with_pref).subscribe(function () {
                _this.router.navigate(['customer']);
                _this.toastDispalay(_this.customerForm.value['name'] + "is added");
            }, function (error) {
                console.error(error);
            });
        }
        // to update existing customers
        else {
            var customer_update_dict_1 = {
                'customer_details': this.customerForm.value
            };
            this.httpService.newCustomerPost(customer_update_dict_1).subscribe(function () {
                console.log(customer_update_dict_1);
                _this.toastDispalay(_this.customerForm.value['name'] + "is updated");
                _this.router.navigate(['customer']);
            }, function (error) {
                console.error(error);
            });
        }
    };
    // for sliding  index back
    NewcustomerPage.prototype.slideBackword = function (index) {
        this.slides.slideTo(index);
    };
    // for sliding  index forward
    NewcustomerPage.prototype.slideForward = function () {
        if (this.customer_id == '0') {
            this.slides.slideTo(1, 300);
        }
        if (this.customer_id != 0) {
            this.slides.slideTo(2, 300);
        }
    };
    // 
    NewcustomerPage.prototype.productSpecSlide = function (product) {
        var _this = this;
        this.slides.slideTo(3);
        this.product_name_data = [];
        console.log(product);
        this.specs = product['specs'];
        product['specs'].forEach(function (element) {
            var temp_prod_spec_dict = {};
            temp_prod_spec_dict['customer_id'] = _this.customer_id;
            temp_prod_spec_dict['product_id'] = product['product_id'];
            temp_prod_spec_dict['question_id'] = element.question_id;
            temp_prod_spec_dict['question_name'] = element.question;
            temp_prod_spec_dict['answer_data'] = element.answer;
            console.log(element.answer);
            if (element.answer == null || element.answer == "") {
                if (element.question_type == 'boolean-checkbox') {
                    temp_prod_spec_dict['answer_data'] = false;
                }
            }
            _this.product_name_data.push(temp_prod_spec_dict);
        });
        console.log(this.product_name_data);
    };
    NewcustomerPage.prototype.toastDispalay = function (message) {
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
    // 
    NewcustomerPage.prototype.getCustomerDetails = function (customer_id) {
        var _this = this;
        var customer_dict = {
            'customer_id': customer_id
        };
        this.httpService.customerPost(customer_dict).subscribe(function (data) {
            _this.customer_datas = data;
            console.log(_this.customer_datas);
            _this.customerForm.controls['id'].setValue(data[0]['id']);
            _this.customerForm.controls['name'].setValue(data[0]['name']);
            _this.customerForm.controls['code'].setValue(data[0]['code']);
            _this.customerForm.controls['phone_number'].setValue(data[0]['phone_number']);
            _this.customerForm.controls['community'].setValue(data[0]['community']);
            _this.customerForm.controls['door_number'].setValue(data[0]['door_number']);
            _this.customerForm.controls['postal_code'].setValue(data[0]['postal_code']);
            _this.customerForm.controls['whatsapp'].setValue(data[0]['is_whatsapp']);
            _this.customerForm.controls['latitude'].setValue(data[0]['latitude']);
            _this.customerForm.controls['longitude'].setValue(data[0]['longitude']);
        });
    };
    NewcustomerPage.prototype.UpdateSpec = function () {
        this.slides.slideTo(2);
        this.httpService.updateSpec(this.product_name_data).subscribe(function (data) {
        }, function (error) {
            console.error(error);
        });
    };
    NewcustomerPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.customer_id != 0) {
            console.log('came inside if');
            this.getCustomerDetails(this.customer_id);
        }
        this.httpService.newCustomerpref().subscribe(function (pref_data) {
            _this.new_customer_pref = pref_data;
            console.log(_this.new_customer_pref);
            _this.product_names = Object.keys(_this.new_customer_pref);
        }, function (error) {
            console.error(error);
        });
    };
    __decorate([
        ViewChild('common_slide'),
        __metadata("design:type", Slides)
    ], NewcustomerPage.prototype, "slides", void 0);
    NewcustomerPage = __decorate([
        Component({
            selector: 'app-newcustomer',
            templateUrl: './newcustomer.page.html',
            styleUrls: ['./newcustomer.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpService,
            ActivatedRoute,
            Router,
            Geolocation,
            FormBuilder,
            ToastController])
    ], NewcustomerPage);
    return NewcustomerPage;
}());
export { NewcustomerPage };
//# sourceMappingURL=newcustomer.page.js.map