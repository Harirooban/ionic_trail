import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service'
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
	TOKEN:any;
	headers: HttpHeaders;
	constructor(private httpClient: HttpClient, private globalService: GlobalServiceService,private storage:Storage,private events:Events ) { 
		this.getUserAccess();
		this.events.subscribe(('login_event'),(login_data)=>{
			this.headers.append('Authorization', 'Token ' + login_data)
		})
  }

  getUserAccess(){

	  this.headers = new HttpHeaders();
	  this.storage.get('auth-token').then((token) => {
			if (token != null) {
				this.headers.append('Authorization', 'Token ' + token)	  	
			}
	  })
  }
  	//  all customer datas
  	// customer page
	customers() {
		return this.httpClient.get(this.globalService.base_url + 'main/customer/', { headers: this.headers });
	}
	//  get customer data based on customer
	customerPost(customer_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/customer/', customer_dict, { headers: this.headers });
	}

	// all orders
	orders() {
		return this.httpClient.get(this.globalService.base_url + 'main/order/', { headers: this.headers })
	}

	 // all quote
	quote() {
		return this.httpClient.get(this.globalService.base_url + 'main/quote/', { headers: this.headers })
	}

	 // get order data based on customer
	ordersPost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/order/', customer_dict, { headers: this.headers })
	}

	//  get sales data based on customer 
	salesPost(customer_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/sale/', customer_dict, { headers: this.headers })
	}

	// all payment data
	payment() {
		return this.httpClient.get(this.globalService.base_url + 'main/payment/', { headers: this.headers })
	}

	// payment data based on customer
	paymentPost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/payment/', customer_dict, { headers: this.headers })
	}

	// all products
	product() {
		return this.httpClient.get(this.globalService.base_url + 'main/product/', { headers: this.headers })
	}

	// get the list of payment method
	paymentmethod() {
		return this.httpClient.get(this.globalService.base_url + 'main/paymentmethod/', { headers: this.headers })
	}

	// posting new payment data based on customer 
	newPaymentPost(newpayment_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/new/payment/add/', newpayment_dict, { headers: this.headers })
	}

	// customer pref based
	newCustomerpref(){
		return this.httpClient.get(this.globalService.base_url + 'main/new/customer/preference/', { headers: this.headers })
	}

	 //  adding new customer
	newCustomerPost(customer_data_with_pref) {
		return this.httpClient.post(this.globalService.base_url + 'main/new/customer/add/', customer_data_with_pref, { headers: this.headers })
	}

	//  specs based on product
	SpecBasedProductPost(product_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/new/order/preference/', product_dict, { headers: this.headers })
	}

	//  adding new order
	neworder(order_with_pref){
		return this.httpClient.post(this.globalService.base_url + 'main/new/order/', order_with_pref, { headers: this.headers })
	}

	//  converting order to sale
	orderTosalePost(order_to_sale_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/order/to/sale/', order_to_sale_dict, { headers: this.headers })
	}

	// sale history based on customer 
	profilePost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/sale/history/', customer_dict, { headers: this.headers })
	}

	// updating spec of existing customer
	updateSpec(product_name_data){
		return this.httpClient.post(this.globalService.base_url + 'main/update/customer/preference/', product_name_data, { headers: this.headers })
	}

	// vessel update
	VesselPost(vessel_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/update/vessel/', vessel_dict, { headers: this.headers })
		}

	//  sale action (accept/reject)
	saleAction(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/update/sales/info/', customer_dict, { headers: this.headers })
	}

	// update payment to sale group
	paymentAction(payment_action_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/update/payment/action/', payment_action_dict, { headers: this.headers })
	}

	// delivery for today
	todayDelivery() {
		return this.httpClient.get(this.globalService.base_url + 'main/today/deliver/customer/', { headers: this.headers })
	}

	// list of orders which are not moved to sale
	initiatedOrder() {
		return this.httpClient.get(this.globalService.base_url + 'main/initiated/order/customer/', { headers: this.headers })
	}

	//  overall payment history of all customers
	overallPaymentCustomer() {
		return this.httpClient.get(this.globalService.base_url + 'main/overall/payment/customer/', { headers: this.headers })
	}

	// update quote
	quotePost(quote_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/quote/', quote_dict, { headers: this.headers })
	}

 	// post geo location data
 	geoPost(location_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/update/geolocation/', location_dict, { headers: this.headers })
 	}
 	// 
	get_order_details(update_order_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/get/order/details/', update_order_dict, { headers: this.headers })
	}
	updateOrder(update_order_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/update/order/', update_order_dict, { headers: this.headers })
	}
}

