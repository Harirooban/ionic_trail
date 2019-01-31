var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var CustomerFilterPipe = /** @class */ (function () {
    function CustomerFilterPipe() {
    }
    CustomerFilterPipe.prototype.transform = function (customerArray, searchTerm) {
        if (customerArray != undefined && searchTerm != undefined) {
            return customerArray.filter(function (element) {
                return element.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || element.community.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || element.door_number.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            });
        }
    };
    CustomerFilterPipe = __decorate([
        Pipe({
            name: 'customerFilter'
        })
    ], CustomerFilterPipe);
    return CustomerFilterPipe;
}());
export { CustomerFilterPipe };
//# sourceMappingURL=customer-filter.pipe.js.map