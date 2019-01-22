import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'; 
import { HttpService } from '../http.service';
import { ModalController, NavController,ToastController,AlertController } from '@ionic/angular';

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
  payment_status_name:any;
  constructor(private router: Router ,private httpService : HttpService, private activaterouter : ActivatedRoute,
    private toastController:ToastController, private alertcontroller:AlertController,private nav: NavController ) { 
    this.customer_id = activaterouter.snapshot.paramMap.get('customer_id')
    this.end_date = new Date().toJSON().split('T')[0];
    this.startDateWithTime = new Date();
    this.startDateWithTime.setDate(this.startDateWithTime.getDate() - 30);
    this.start_date = this.startDateWithTime.toJSON().split('T')[0];

  }

  ionViewWillEnter() {
    let customer_dict={
      "customer_id":this.customer_id,
      "start_date":this.start_date,
      "end_date":this.end_date
    }

    this.httpService.paymentPost(customer_dict).subscribe((payment_datas)=> {
      this.payment_datas = payment_datas;
      this.payment_status_name=this.payment_datas[0]['payment_history'].payment_status;
      console.log(this.payment_status_name)
      console.log(this.payment_datas)
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
    this.nav.navigateForward('/newpayment/' + this.customer_id)
  }

 doRefresh(event) {
  console.log('Begin async operation');
  this.ionViewWillEnter();
  event.target.complete();    
  }
  paymentAction(payment_data_payment_id,status_id: number){
    let payment_action_dict={
      "customer_id":this.customer_id,
      "payment_id":payment_data_payment_id,
      "status_id":status_id
    }
    this.httpService.paymentAction(payment_action_dict).subscribe(()=> {
    }, (error) => {
      console.error(error);
    });
     this.toastDispalay(status_id);
  }

 async toastDispalay(status_id) {
   if( status_id == 4){
     const toast = await this.toastController.create({
    message: "payment has been approved",
    duration:3000,
    position:'top'
    });
     toast.present();
    }
    else{
       const toast = await this.toastController.create({
    message: "payment has been Disapproved",
    duration:3000,
    position:'top'
    });
     toast.present();
    }
  }

  confirmDecline(payment_data_payment_id,status_id: number) {
    if (confirm('Are you sure')) {
      this.paymentAction(payment_data_payment_id,status_id);
    }
  }
  ngOnInit() {

  }

 }

