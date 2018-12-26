import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient, private globalService: GlobalServiceService ) { }

  testfun() {
    // return this.httpClient.get(this.globalService.base_url + 'main/customer/' );
    return this.httpClient.get(this.globalService.base_url + 'main/customer/');
  }

	orders() {
		return this.httpClient.get(this.globalService.base_url + 'main/order/')
	}  

	ordersPost(customer_dict){
		return this.httpClient.post(this.globalService.base_url + 'main/order/', customer_dict)
	}

	sales() {
		return this.httpClient.get(this.globalService.base_url + 'main/sale/')
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
}

