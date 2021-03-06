var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
    { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'order', loadChildren: './order/order.module#OrderPageModule' },
    { path: 'customer', loadChildren: './customer/customer.module#CustomerPageModule' },
    { path: 'sale', loadChildren: './sale/sale.module#SalePageModule' },
    { path: 'payment/:customer_id', loadChildren: './payment/payment.module#PaymentPageModule' },
    { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
    { path: 'prodpref', loadChildren: './prodpref/prodpref.module#ProdprefPageModule' },
    { path: 'newpayment/:customer_id', loadChildren: './payment/newpayment/newpayment.module#NewpaymentPageModule' },
    { path: 'newcustomer/:customer_id', loadChildren: './customer/newcustomer/newcustomer.module#NewcustomerPageModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    { path: 'quickaccess/:id', loadChildren: './quickaccess/quickaccess.module#QuickaccessPageModule' },
    { path: 'updatequote', loadChildren: './updatequote/updatequote.module#UpdatequotePageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map