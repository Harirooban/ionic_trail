import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
	{ path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
	{ path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'order/:customer_id', loadChildren: './order/order.module#OrderPageModule' },
  { path: 'customer', loadChildren: './customer/customer.module#CustomerPageModule' },
  { path: 'sale', loadChildren: './sale/sale.module#SalePageModule' },
  { path: 'payment/:customer_id', loadChildren: './payment/payment.module#PaymentPageModule' },
  { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
  { path: 'prodpref', loadChildren: './prodpref/prodpref.module#ProdprefPageModule' },
  { path: 'newpayment', loadChildren: './payment/newpayment/newpayment.module#NewpaymentPageModule' },
	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule	{ }
																		