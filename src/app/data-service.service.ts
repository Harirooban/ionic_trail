import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
	customer_datas:any;
  constructor() { }
  getcustomerdetails(customer_detail: any) {
  	this.customer_datas=customer_detail;
  }
}
