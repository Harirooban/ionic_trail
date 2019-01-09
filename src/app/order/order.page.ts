import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'; 
import { Slides } from '@ionic/angular';
import { HttpService } from '../http.service';
import { ModalController,NavParams } from '@ionic/angular';

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
  quantity:any;
  delivery_date:any;
  order_to_sale_datas: any;
  today:any;
  constructor(private router: Router ,private httpService : HttpService,private activaterouter : ActivatedRoute ,
              private modalController: ModalController,private navParams: NavParams) {
  this.today = new Date()
  this.customer = this.navParams.get('customer_value');
  // // an dict to post to django server
  let customer_dict=
  {
    "customer_id":this.customer.id,
 
  }
  // posting the dict to django server to filter based on I
  this.httpService.ordersPost(customer_dict).subscribe((order_data)=> {
      this.order_datas = order_data;
     console.log(this.order_datas)
    })

  }

  closeModal() {
    this.modalController.dismiss();
  }
  selectProduct(product) {
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
          this.product_answer.push({
            question_id: element.question_id,
            answer_data: element.customer_answer,
            question_name: element.question
          })
        });
      }
      console.log(this.product_answer)
    })
  }

  slideForward(slide_index: number) {

    this.slides.slideTo(slide_index)
    
  }

  storeAnswerData(){
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
    this.slides.slideTo(0)
    console.log(this.order_with_pref)
  }

  orderToSale(status_id: number, order_product_order_id){
    let order_to_sale_dict = {
      "customer_id":this.customer.id,
      "status_id":status_id,
      "order_id":order_product_order_id
    }
    console.log(order_to_sale_dict)
    this.httpService.orderTosalePost(order_to_sale_dict).subscribe((data)=> {
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.httpService.product().subscribe((pref_data) => {
      this.products = pref_data;
      console.log(this.products)
      }, (error) => {
      console.error(error);
    });
        }
    }
