import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'; 
import { HttpService } from '../http.service';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  payment_datas: any;
  customer_id: any ;
  startDateWithTime: any;
  start_date:any;
  end_date:any;

  constructor(private router: Router ,private httpService : HttpService, private activaterouter : ActivatedRoute, 
    private nav: NavController ) { 
    this.customer_id = activaterouter.snapshot.paramMap.get('customer_id')
    this.end_date = new Date().toJSON().split('T')[0];
    this.startDateWithTime = new Date();
    this.startDateWithTime.setDate(this.startDateWithTime.getDate() - 30);
    this.start_date = this.startDateWithTime.toJSON().split('T')[0];

    this.dataBasedOnDate();
  }

  dataBasedOnDate() {
    let customer_dict={
      "customer_id":this.customer_id,
      "start_date":this.start_date,
      "end_date":this.end_date
    }

    this.httpService.paymentPost(customer_dict).subscribe((payment_datas)=> {
      this.payment_datas = payment_datas;
    }, (error) => {
      console.error(error);
    });
  }

  checkVesselCount(vessel_count: number){
    if (vessel_count == 0 ) return 'green';

    else return 'red';
  }

  balcheckout(amount: number) {
    if (amount >= 0) return 'green';
    else return 'red';
  }

  statusCheckout(payment_status: string){
    if (payment_status == 'Initiated') return 'blue';
    
    else if(payment_status == 'Completed') return 'green';

    else if(payment_status == 'Disapproved') return 'red';
  }
  newPayment() {
    this.router.navigate(['newpayment'])
  }
  ngOnInit() {

  }

 }

