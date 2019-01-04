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
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
var ProdprefPage = /** @class */ (function () {
    function ProdprefPage(navParams, modalController) {
        this.navParams = navParams;
        this.modalController = modalController;
        this.shownGroup = null;
    }
    ProdprefPage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    ProdprefPage.prototype.openList = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    ProdprefPage.prototype.isGroupShown = function (group) {
        return this.shownGroup == group;
    };
    ;
    ProdprefPage.prototype.ngOnInit = function () {
        this.product_preference = this.navParams.get('customer_value');
        console.log(this.product_preference);
    };
    ProdprefPage = __decorate([
        Component({
            selector: 'app-prodpref',
            templateUrl: './prodpref.page.html',
            styleUrls: ['./prodpref.page.scss'],
        }),
        __metadata("design:paramtypes", [NavParams, ModalController])
    ], ProdprefPage);
    return ProdprefPage;
}());
export { ProdprefPage };
//# sourceMappingURL=prodpref.page.js.map