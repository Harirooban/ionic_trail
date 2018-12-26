import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'; 
import { HttpService } from '../http.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})


export class OrderPage implements OnInit {

	order_datas :any ;
  customer_id : any ;


constructor(private router: Router ,private httpService : HttpService,private activaterouter : ActivatedRoute ) {
  // this line is to fetch the customer id from the url
  this.customer_id = activaterouter.snapshot.paramMap.get('customer_id')
  // an dict to post to django server
  let customer_dict=
  {
    "customer_id":this.customer_id,
 
  }
  // posting the dict to django server to filter based on I
  this.httpService.ordersPost(customer_dict).subscribe((order_data)=> {
      this.order_datas = order_data;
   	console.log(this.order_datas)
    })

}

  ngOnInit() {
  }

}
