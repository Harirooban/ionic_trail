import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'; 
import { HttpService } from '../http.service';
import { ModalController, NavController } from '@ionic/angular';
import { ProdprefPage } from '../prodpref/prodpref.page';
import { OrderPage } from '../order/order.page';
import { SalePage } from '../sale/sale.page'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  customer_id: any ;
  customer_info:any =[];
  sale_datas: any = null;
  date_values: any = null;

  constructor(private activaterouter : ActivatedRoute, private nav: NavController,
   private router: Router,private httpService : HttpService, private modalController: ModalController, private ref: ChangeDetectorRef) { 
    
  }

  ionViewWillEnter() {
    this.activaterouter.queryParams.subscribe((data) => {
      this.customer_info = data;
      console.log(this.customer_info)
    },(error) =>{
      console.log(error);
    });

    let customer_dict = {
      'customer_id':this.customer_info['id']
    }
    this.httpService.profilePost(customer_dict).subscribe((data)=> {
      this.sale_datas = data;
      this.date_values = Object.keys(data)
      console.log(this.date_values);
      console.log(this.sale_datas);
      this.ref.detectChanges();
    }, (error) => {
      console.error(error);
    });
  } 
  update(){
     this.nav.navigateForward('/newcustomer/' + this.customer_info['id'])
  }
  checkVesselCount(vessel_count: number){
    if (vessel_count == 0 ) return 'green';

    else return 'red';
  }

  balcheckout(amount: number) {
    if (amount >= 0) return 'green';
    else return 'red';
  }
  async openModal(customer_info){
  const modal = await this.modalController.create({

    component : ProdprefPage,
    componentProps : {
      customer_value :customer_info
    },
    cssClass :'inset-modal'
  });

  modal.present();
  }

  // order modal
  async openOrderModal(customer_info){
  const modal = await this.modalController.create({

    component : OrderPage,
    componentProps : {
      customer_value :customer_info
    },
    cssClass :'inset-modal'
  });
  modal.present();
  }

    // delivery modal
  async openDeliveryModal(customer_info){
  const modal = await this.modalController.create({

    component : SalePage,
    componentProps : {
      customer_value :customer_info
    },
    cssClass :'inset-modal'
  });
  modal.present();
  }
  ngOnInit() {
  }

}
