import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

	{ path: '', redirectTo: 'customer', pathMatch: 'full' },
	{ path: 'login', loadChildren: './login/login.module#LoginPageModule' },
	{ path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
	{ path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'order/', loadChildren: './order/order.module#OrderPageModule' },
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule	{ }
																	