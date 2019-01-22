import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-updatequote',
  templateUrl: './updatequote.page.html',
  styleUrls: ['./updatequote.page.scss'],
})
export class UpdatequotePage implements OnInit {
	quote_datas:any;
	updated_amount:any;
  constructor(private httpService : HttpService ) { 
	this.httpService.quote().subscribe((quote_data)=> {
	this.quote_datas = quote_data;    
	console.log(this.quote_datas)
	})
  }
  updateQuote(product){
  	 let quote_dict={
      "product_id":product.product_id,
      "price":this.updated_amount,
    }

    this.httpService.quotePost(quote_dict).subscribe(()=> {
    }, (error) => {
      console.error(error);
    });
  }
  ngOnInit() {
  }

}
