import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpService } from '../http.service';
import { ModalController,NavParams } from '@ionic/angular';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
})
export class SalePage implements OnInit {
	sale_datas : any;
  customer :any;
  constructor(private router: Router ,private httpService : HttpService,private modalController: ModalController,private navParams: NavParams) { 
  	this.customer = this.navParams.get('customer_value');
  // // an dict to post to django server
    let customer_dict=
    {
      "customer_id":this.customer.id
    }
    this.httpService.salesPost(customer_dict).subscribe((sale_data)=> {
      this.sale_datas = sale_data;
   	console.log(this.sale_datas)
    })
  }
  closeModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {
  }
  
}

