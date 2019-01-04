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
import { FormBuilder, Validators } from '@angular/forms';
var NewcustomerPage = /** @class */ (function () {
    function NewcustomerPage(httpService, activaterouter, formBuilder) {
        this.httpService = httpService;
        this.activaterouter = activaterouter;
        this.formBuilder = formBuilder;
        this.customerForm = this.formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            phone_number: ['', Validators.required],
            whatsapp: ['', Validators.required],
            email: ['', Validators.required],
            landmark: ['', Validators.required],
            door_number: ['', Validators.required],
            community: ['', Validators.required],
            street_name: ['', Validators.required],
            postal_code: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
        });
    }
    NewcustomerPage.prototype.ngOnInit = function () {
    };
    NewcustomerPage = __decorate([
        Component({
            selector: 'app-newcustomer',
            templateUrl: './newcustomer.page.html',
            styleUrls: ['./newcustomer.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpService, ActivatedRoute, FormBuilder])
    ], NewcustomerPage);
    return NewcustomerPage;
}());
export { NewcustomerPage };
//# sourceMappingURL=newcustomer.page.js.map