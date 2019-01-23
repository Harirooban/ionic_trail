import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient, private globalService: GlobalServiceService ) { }

  	//  all customer datas
  	// customer page
	customers() {
		return this.httpClient.get(this.globalService.base_url + 'main/customer/');
	}

	//  get customer data based on customer
	customerPost(customer_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/customer/', customer_dict);
	}

	// all orders
	orders() {
		return this.httpClient.get(this.globalService.base_url + 'main/order/')
	}

	 // all quote
	quote() {
		return this.httpClient.get(this.globalService.base_url + 'main/quote/')
	}

	 // get order data based on customer
	ordersPost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/order/', customer_dict)
	}

	//  get sales data based on customer 
	salesPost(customer_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/sale/', customer_dict)
	}

	// all payment data
	payment() {
		return this.httpClient.get(this.globalService.base_url + 'main/payment/')
	}

	// payment data based on customer
	paymentPost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/payment/', customer_dict)
	}

	// all products
	product() {
		return this.httpClient.get(this.globalService.base_url + 'main/product/')
	}

	// get the list of payment method
	paymentmethod() {
		return this.httpClient.get(this.globalService.base_url + 'main/paymentmethod/')
	}

	// posting new payment data based on customer 
	newPaymentPost(newpayment_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/new/payment/add/', newpayment_dict)
	}

	// customer pref based
	newCustomerpref(){
		return this.httpClient.get(this.globalService.base_url + 'main/new/customer/preference/')
	}

	 //  adding new customer
	newCustomerPost(customer_data_with_pref) {
		return this.httpClient.post(this.globalService.base_url + 'main/new/customer/add/', customer_data_with_pref)
	}

	//  specs based on product
	SpecBasedProductPost(product_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/new/order/preference/', product_dict)
	}

	//  adding new order
	neworder(order_with_pref){
		return this.httpClient.post(this.globalService.base_url + 'main/new/order/', order_with_pref)
	}

	//  converting order to sale
	orderTosalePost(order_to_sale_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/order/to/sale/', order_to_sale_dict)
	}

	// sale history based on customer 
	profilePost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/sale/history/', customer_dict)
	}

	// updating spec of existing customer
	updateSpec(product_name_data){
		return this.httpClient.post(this.globalService.base_url + 'main/update/customer/preference/', product_name_data)
	}

	// vessel update
	VesselPost(vessel_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/update/vessel/', vessel_dict)
		}

	//  sale action (accept/reject)
	saleAction(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/update/sales/info/', customer_dict)
	}

	// update payment to sale group
	paymentAction(payment_action_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/update/payment/action/', payment_action_dict)
	}

	// delivery for today
	todayDelivery() {
		return this.httpClient.get(this.globalService.base_url + 'main/today/deliver/customer/')
	}

	// list of orders which are not moved to sale
	initiatedOrder() {
		return this.httpClient.get(this.globalService.base_url + 'main/initiated/order/customer/')
	}

	//  overall payment history of all customers
	overallPaymentCustomer() {
		return this.httpClient.get(this.globalService.base_url + 'main/overall/payment/customer/')
	}

	// update quote
	quotePost(quote_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/quote/', quote_dict)
	}

 	// post geo location data
 	geoPost(location_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/update/geolocation/', location_dict)
 	}
}

