import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'; 
import { Slides } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ModalController,NavParams,AlertController,ToastController } from '@ionic/angular';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})

export class OrderPage implements OnInit {
  @ViewChild('common_slide') slides: Slides
  slideOpts = {
    effect: 'flip',
    allowTouchMove: false
  };
	order_datas :any ;
  customer : any ;
  products :any;
  product_data: any;
  product_details: any = null;
  product_answer: any = [];
  product_id: any = null;
  order_with_pref = {};
  quantity:any = null;
  delivery_date:any = null;
  order_to_sale_datas: any;
  today:any;
  actual_quantity:any =null;
  order_id:any;
  final_delivery_date:any = null;
  product_name: any;
  temp_refresh: boolean=false;
  update_order_temp: any;
  update_orderSpec_list: any;
  update_order_product_name: any;
  update_order_delivary_date: any;
  update_order_id: any;
  constructor(@Inject(DOCUMENT) private document:Document, private router: Router ,private httpService : HttpService,private activaterouter : ActivatedRoute ,private alertcontroller:AlertController,
              private modalController: ModalController,private navParams: NavParams,private toastController:ToastController) {
    this.orderPageDatas();
  
  }

  orderPageDatas(){
  this.today = new Date().toJSON().split('T')[0]
  this.final_delivery_date = new Date().toJSON().split('T')[0]

  this.customer = this.navParams.get('customer_value');
  // // an dict to post to django server
  
  let customer_dict=
  {
    "customer_id":this.customer.id,
 
  }
  console.log(customer_dict)
  // posting the dict to django server to filter based on I
  this.httpService.ordersPost(customer_dict).subscribe((order_data)=> {
      this.order_datas = order_data;
     console.log(this.order_datas)
    })
  }

  acceptOrder(order_product_order_id,order_product_product_code){
    this.actual_quantity = null;
    this.product_name = order_product_product_code
    this.order_id=order_product_order_id
    window.scrollTo(0,0)
    this.slides.slideTo(2)
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop =0;
    window.scrollTo(0,0)
  }

  cancelOrder(order_product_order_id){
    console.log("worked the decline")
    if (confirm('Are you sure')) {
    this.order_id = order_product_order_id,
      this.orderToSale(3);
    }
    
  }

  selectProduct(product) {
    this.quantity = null;
    this.product_details = product.name
    this.product_id = product.id
      let product_dict=
      {
        "product_id":this.product_id,
        "customer_id":this.customer.id
      }
    this.slides.slideTo(1)
    this.httpService.SpecBasedProductPost(product_dict).subscribe((order_data)=> {
    this.product_data = order_data;
    console.log(this.product_data);
    this.product_answer = [];
      if (this.product_details != null) {
        this.product_data[this.product_details].forEach((element) => {
          let temp_dict = {}
          temp_dict['question_id'] = element.question_id
          temp_dict['answer_data'] = element.customer_answer
          temp_dict['question_name'] = element.question
          if (!element.hasOwnProperty('customer_answer')) {
            if (element.question_type == 'boolean-checkbox') {
              temp_dict['answer_data'] = false
            } else {
              temp_dict['answer_data'] = ''
            }
          }
          this.product_answer.push(temp_dict)
        });
      }
      console.log(this.product_answer)
    })
  }

  slideForward(slide_index: number) {

    this.slides.slideTo(slide_index)
    if (slide_index == 0){
      this.actual_quantity=null;
    }
    
  }
  updateOrderForm(order_product, slide_index: number) {
    console.log(order_product.order_id)
    this.slides.slideTo(slide_index)
    this.update_order_id=order_product.order_id
    let update_order_dict = {
      "order_id": order_product.order_id,
    }
    this.httpService.get_order_details(update_order_dict).subscribe((data) => {
      this.update_order_temp = data
      console.log(this.update_order_temp)
      this.update_order_product_name = this.update_order_temp[0]['product_code']
      this.update_order_delivary_date = this.update_order_temp[0]['delivary_date']
      console.log(this.update_order_delivary_date)
      this.update_orderSpec_list =[]
      this.update_order_temp[0]['specs'].forEach((element) =>{
        let temp_dict = {}
        temp_dict['question_id'] = element.question_id
        temp_dict['update_answer_data'] = element.customer_answer
        temp_dict['question_name'] = element.question
        temp_dict['question_type'] = element.question_type
        temp_dict['order_specs_id'] = element.order_spec_id
        this.update_orderSpec_list.push(temp_dict)
      })
      console.log(this.update_orderSpec_list)
    })
  }

  updateOrder(){
    let update_order_dict={
      'order_id':this.update_order_id,
      'specs': this.update_orderSpec_list
    }
    this.httpService.updateOrder(update_order_dict).subscribe((data) => {
      this.toastDispalay('order has been updated');
      this.orderPageDatas();
      this.slides.slideTo(0)
    }, (error) => {
      console.error(error);
    }); 

  }

  storeAnswerData(){
    this.temp_refresh = true
    if (this.quantity == null) {
      alert('enter quantity');
      return false;
    } 
    if (this.delivery_date == null) {
      alert('enter delivery_date');
      return false;
    }

    this.order_with_pref['customer_id']=this.customer.id
    this.order_with_pref['product_name']=this.product_details
    this.order_with_pref['product_id']=this.product_id
    this.order_with_pref['delivery_date']=this.delivery_date
    this.order_with_pref['quantity']=this.quantity
    this.order_with_pref['specs']=this.product_answer
    this.httpService.neworder(this.order_with_pref).subscribe((payment_datas) => {
    }, (error) => {
      console.error(error);
    }); 
    this.orderPageDatas();
    this.slides.slideTo(0)
    console.log(this.order_with_pref)
    this.orderPageDatas();
  }

  orderToSale(status_id: number){
    if (status_id == 4){
      if (this.final_delivery_date == null) {
        alert('enter delivery_date');
        return false;
      }
      if (this.actual_quantity == null) {
        alert('enter actual quantity');
        return false;
      }
    }
    this.temp_refresh=true
    let order_to_sale_dict = {
      "customer_id":this.customer.id,
      "status_id":status_id,
      "order_id":this.order_id,
      "quantity":this.actual_quantity,
      "delivery_date":this.final_delivery_date
    }
    this.slides.slideTo(0)
    console.log(order_to_sale_dict)
    this.httpService.orderTosalePost(order_to_sale_dict).subscribe((data)=> {
     if (status_id == 4){
      this.toastDispalay('order has been accepted');
     }
     else{
       this.toastDispalay('order has been declined'); 
     }
     this.orderPageDatas();
      }, (error) => {
      console.error(error);
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.orderPageDatas();
    event.target.complete();  
  }
  
  closeModal() {
    this.modalController.dismiss({ "temp_refresh":this.temp_refresh});
  }
   async toastDispalay(message) {
     const toast = await this.toastController.create({
      message: message,
      duration:3000,
      position:'middle'
      });
       toast.present();
    }

  ngOnInit() {
    window.scrollTo(0,0)
    this.httpService.product().subscribe((pref_data) => {
      this.products = pref_data;
      console.log(this.products)
      }, (error) => {
      console.error(error);
    });
        }
    }
