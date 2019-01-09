import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient, private globalService: GlobalServiceService ) { }

	customers() {
	// return this.httpClient.get(this.globalService.base_url + 'main/customer/' );
		return this.httpClient.get(this.globalService.base_url + 'main/customer/');
	}
	customerPost(customer_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/customer/', customer_dict);
	}
	products() {
	// return this.httpClient.get(this.globalService.base_url + 'main/customer/' );
		return this.httpClient.get(this.globalService.base_url + 'main/product/');
	}

	orders() {
		return this.httpClient.get(this.globalService.base_url + 'main/order/')
	}  

	ordersPost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/order/', customer_dict)
	}

	salesPost(customer_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/sale/', customer_dict)
	} 
	payment() {
		return this.httpClient.get(this.globalService.base_url + 'main/payment/')
	} 

	paymentPost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/payment/', customer_dict)
	}
	product() {
		return this.httpClient.get(this.globalService.base_url + 'main/product/')
	} 
	paymentmethod() {
		return this.httpClient.get(this.globalService.base_url + 'main/paymentmethod/')
	} 
	newPaymentPost(newpayment_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/new/payment/add/', newpayment_dict)
	}
	newCustomerpref(){
		return this.httpClient.get(this.globalService.base_url + 'main/new/customer/preference/')
	} 
	newCustomerPost(customer_data_with_pref) {
		return this.httpClient.post(this.globalService.base_url + 'main/new/customer/add/', customer_data_with_pref)
	}
	SpecBasedProductPost(product_dict) {
		return this.httpClient.post(this.globalService.base_url + 'main/new/order/preference/', product_dict)
	}
	neworder(order_with_pref){
		return this.httpClient.post(this.globalService.base_url + 'main/new/order/', order_with_pref)
	}
	orderTosalePost(order_to_sale_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/order/to/sale/', order_to_sale_dict)
	}
	profilePost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/sale/history/', customer_dict)
	}
	updateSpec(product_name_data){
		return this.httpClient.post(this.globalService.base_url + 'main/update/customer/preference/', product_name_data)
	}
	VesselPost(vessel_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/update/vessel/', vessel_dict)
		}
}

