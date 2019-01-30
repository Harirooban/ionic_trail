import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; 
import { HttpService } from '../http.service';
import { ModalController, NavController } from '@ionic/angular';
import { ProdprefPage } from '../prodpref/prodpref.page';
import { OrderPage } from '../order/order.page';
import { SalePage } from '../sale/sale.page';
import { DataServiceService } from '../data-service.service';
import { HttpHeaders } from '@angular/common/http';
const TOKEN_KEY = 'auth-token';
 
@Component ( {
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})

export class CustomerPage implements OnInit {
   // to display the customer data
   customer_datas : any ;
  swipeOption:false;

  constructor(
    private router: Router,
    private httpService : HttpService ,
    private nav: NavController,
    private modalController: ModalController,
    private dataService:DataServiceService
    )
    {
      this.customerPageDatas();
    }

    customerPageDatas(){
      //  feching data from  customer table to customer_datas 
      this.httpService.customers().subscribe((cust_data)=> {
      this.customer_datas = cust_data;    
      console.log(this.customer_datas)
      })
    }

    // product preferene modal
    async openModal(customer){
      const modal = await this.modalController.create({
        component : ProdprefPage,
        componentProps : 
         {
            customer_value :customer
          },
        cssClass :'inset-modal'
      });
      modal.present();
    }

    // order modal
    async openOrderModal(customer){
    const modal = await this.modalController.create({
      component : OrderPage,
      componentProps : {
        customer_value :customer
      },
      cssClass :'inset-modal'
      
    });

    // refresh on modal close
    modal.onDidDismiss().then((data)=>{
      console.log(data)
      if (data['data']['temp_refresh']){
      this.customerPageDatas();
      }
      });
      modal.present();
     }

    // delivery modal
    async openDeliveryModal(customer){
    const modal = await this.modalController.create({

      component : SalePage,
      componentProps : {
        customer_value :customer
      },
      cssClass :'inset-modal'
    });
    // refresh on modal close
    modal.onDidDismiss().then((data)=>{
      if (data['data']['temp_refresh']){
        this.customerPageDatas();
      }
    });
    modal.present();
    }

   //  maping to payment page with customer Id
    profilePage(customer) {
      this.router.navigate(['/profile']);
      this.dataService.getcustomerdetails(customer);
    }

  // navigate to  adding new customer
  newCustomer() {
    this.nav.navigateForward('/newcustomer/' + 0)
  }

  //changing color for vessel counts 
  checkVesselCount(vessel_count: number){
    if (vessel_count == 0 ) return 'green';

    else return 'red';
  }

  //changing color for balance amount
  balcheckout(amount: number) {
    if (amount >= 0) return 'green';
    else return 'red';
  }
  
  // refreshner
  doRefresh(event) {
    console.log('Begin async operation');
    this.customerPageDatas();
    event.target.complete();    
  }

  ngOnInit() {
  }

}
