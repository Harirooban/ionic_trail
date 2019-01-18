import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpService } from '../http.service';
import { ModalController,NavParams,NavController,AlertController,ToastController } from '@ionic/angular';
import { Slides } from '@ionic/angular';



@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
})
export class SalePage implements OnInit {
  @ViewChild('common_slide') slides: Slides
  slideOpts = {
    effect: 'flip',
    allowTouchMove: false
  };
	sale_datas : any;
  customer :any;
  vessel:number;
  opacity_value:any;
  reason_list:any;
  constructor(private router: Router ,private alertcontroller:AlertController,private httpService : HttpService,
              private toastController:ToastController,private modalController: ModalController,private navParams: NavParams,private nav: NavController) { 
  	
    this.getSaleData();
  

  }
  getSaleData(){
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
  }
  // slideForward(slide_index: number) {

  //   this.slides.slideTo(slide_index)
    
  // }
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

  orderAccept(item){
    let customer_dict={
      "customer_id":this.customer.id,
      "sale_id":item.sale_id,
      "reason_id":5

    }

    this.httpService.saleAction(customer_dict).subscribe(()=> {
    }, (error) => {
      console.error(error);
    });
    this.acceptToastDispalay();
  }
   orderDecline(value,item){
    let customer_dict={
      "customer_id":this.customer.id,
      "sale_id":item.sale_id,
      "reason_id":value
    }
    console.log(customer_dict)
    this.httpService.saleAction(customer_dict).subscribe(()=> {
    }, (error) => {
      console.error(error);
    });
    this.declineToastDispalay();
  }
   doRefresh(event) {
    console.log('Begin async operation');
    this.getSaleData();
    event.target.complete();    
  }
  async reasonForRejection(item){
    const alert = await this.alertcontroller.create({
      header :'Reasons',
      inputs:[{
        name:'Did Not Order',
        type:'radio',
        label:'Did Not Order',
        value:1,
        checked:true
      },
      {
        name:'Not At Door',
        type:'radio',
        label:'Not At Door',
        value:2,
      },
      {
        name:'Wrong Order',
        type:'radio',
        label:'Wrong Order',
        value:3,
      },
      {
        name:'Declined',
        type:'radio',
        label:'Declined',
        value:4,
      }
      ],
      buttons:[
      {
        text:'Cancel',
        role:'cancel',
        handler:() => {
          console.log('cancled');
        }
      },{
        text:'Okay',
        handler:(value) => {
          console.log(value,item.sale_id);
          this.orderDecline(value,item)
        }
      }
      ]
    });
    await alert.present();
  }
  async acceptToastDispalay() {
    const toast = await this.toastController.create({
      message: "order has been delivered",
      duration:2000,
      position:'top'
    });
    toast.present();
  }
  async declineToastDispalay() {
    const toast = await this.toastController.create({
      message: "order has been declined",
      duration:2000,
      position:'top'
    });
    toast.present();
  }
  ngOnInit() {

  }
  
}

