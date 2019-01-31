import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router,ActivatedRoute } from '@angular/router'; 
import { ModalController, NavController } from '@ionic/angular';
import { SalePage } from '../sale/sale.page';
import { OrderPage } from '../order/order.page';


@Component({
  selector: 'app-quickaccess',
  templateUrl: './quickaccess.page.html',
  styleUrls: ['./quickaccess.page.scss'],
})

export class QuickaccessPage implements OnInit {

	customer_datas:any = [];
	heading:any;
	url_id:any;
	report:any;
  constructor( private httpService : HttpService,private router: Router, private activaterouter : ActivatedRoute , private nav: NavController,private modalController: ModalController) { 
  	this.url_id = activaterouter.snapshot.paramMap.get('id')
  	console.log(this.url_id)
		
}
ionViewWillEnter() {
	if (this.url_id == 1) {
	this.httpService.todayDelivery().subscribe((cust_data)=> {
	this.customer_datas = cust_data;    
	console.log(this.customer_datas)
	this.heading='Today deliver list'
	this.report='No Delivery For Today'
	console.log(this.report)
});
}
else if(this.url_id == 2) {
	this.httpService.initiatedOrder().subscribe((cust_data)=> {
	this.customer_datas = cust_data;    
	console.log(this.customer_datas)
	this.heading='Initiated order details'
	this.report='None of order has been initiated'
});
}
else if(this.url_id == 3) {
	this.httpService.overallPaymentCustomer().subscribe((cust_data)=> {
	this.customer_datas = cust_data;    
	console.log(this.customer_datas)
	this.heading='Customer list for payment'
});
}
}
	
quickAction(customer) {
	console.log(customer)
	console.log(customer.id)
	if (this.url_id == 1) {
		this.openModal(customer,SalePage);
	}
	else if(this.url_id == 2) {
		this.openModal(customer,OrderPage);
	}
	else if (this.url_id == 3){
		this.nav.navigateForward('/payment/' + customer.id)
	}
}

async openModal(customer,page) {
const modal = await this.modalController.create({
  component : page,
  componentProps : {
    customer_value :customer
  },
  cssClass :'inset-modal'
});
modal.present();
}

homePage() {
	this.router.navigate(['customer']);
}
ngOnInit() {
}

}