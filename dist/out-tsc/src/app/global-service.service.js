var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var GlobalServiceService = /** @class */ (function () {
    function GlobalServiceService() {
        this.server_url = 'http://192.168.0.7:8000/';
    }
    Object.defineProperty(GlobalServiceService.prototype, "base_url", {
        get: function () {
            return this.server_url;
        },
        enumerable: true,
        configurable: true
    });
    GlobalServiceService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], GlobalServiceService);
    return GlobalServiceService;
}());
export { GlobalServiceService };
//# sourceMappingURL=global-service.service.js.map