import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpService } from '../http.service';
import { ModalController, NavController } from '@ionic/angular';
import { ProdprefPage } from '../prodpref/prodpref.page';
 
@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

	 customer_datas : any ;
//  feching data from  customer table to csutomer_datas 
  constructor(private router: Router ,private httpService : HttpService ,private nav: NavController, private modalController: ModalController) {
    this.httpService.testfun().subscribe((cust_data)=> {
      this.customer_datas = cust_data;    
      console.log(this.customer_datas)
    })}
async openModal(customer){
  const modal = await this.modalController.create({

    component : ProdprefPage,
    componentProps : {
      customer_value :customer
    },
    cssClass :'inset-modal'
  });
  modal.present();
  }
  //  maping to order page with customer Id
  orderPage(customer){
    this.nav.navigateForward('/order/' + customer.id)
  }
  //  maping to payment page with customer Id
  paymentPage(customer){
    this.nav.navigateForward('/payment/' + customer.id )
  }
  ngOnInit() {
  }

}
