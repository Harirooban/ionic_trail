import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpService } from '../http.service';
import { ModalController,NavParams,NavController } from '@ionic/angular';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
})
export class SalePage implements OnInit {
	sale_datas : any;
  customer :any;
  vessel:number;
  constructor(private router: Router ,private httpService : HttpService,private modalController: ModalController,private navParams: NavParams,private nav: NavController) { 
  	this.customer = this.navParams.get('customer_value');
  // // an dict to post to django server
    let customer_dict=
    {
      "customer_id":this.customer.id
    }
     
    console.log(this.customer)
    this.vessel = this.customer.vessel_count;
    this.httpService.salesPost(customer_dict).subscribe((sale_data)=> {
      this.sale_datas = sale_data;
   	console.log(this.sale_datas)
    })
// vessel post
  

  }
  vesselUpdate(count:number){
   
    if (count == 1){
      this.vessel=this.vessel + 1;
      let vessel_dict=
      {
      "customer_id":this.customer.id,
      "vessel_count":this.vessel
      }
      this.httpService.VesselPost(vessel_dict).subscribe((data)=> {
      })

    }
    else{
      if(this.vessel > 0){
      this.vessel=this.vessel -1;
      let vessel_dict=
      {
      "customer_id":this.customer.id,
      "vessel_count":this.vessel
      }
      this.httpService.VesselPost(vessel_dict).subscribe((data)=> {
      });
    }
  }
}
  closeModal() {
    this.modalController.dismiss();
  }

  paymentPage(){
    this.modalController.dismiss();
    this.nav.navigateForward('/newpayment/' + this.customer.id)
  }

  checkVesselCount(vessel_count: number){
    if (vessel_count == 0 ) return 'green';

    else return 'red';
  }

  balcheckout(amount: number) {
    if (amount >= 0) return 'green';
    else return 'red';
  }
  

  ngOnInit() {
  }
  
}

