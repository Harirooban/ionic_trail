import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-updatequote',
  templateUrl: './updatequote.page.html',
  styleUrls: ['./updatequote.page.scss'],
})
export class UpdatequotePage implements OnInit {
	quote_datas:any;
	updated_amount:any=[];
  constructor(
    private httpService : HttpService,
    private toastController:ToastController,
   ) { 
    // get quote datas 
	this.httpService.quote().subscribe((quote_data)=> {
	this.quote_datas = quote_data;    
	console.log(this.quote_datas);
  this.quote_datas.forEach((element, index) => {
  this.updated_amount[index] = element.price
  })
	})
  }
// update quote data
  updateQuote(product_id, updated_amount){
  	 let quote_dict={
      "product_id":product_id,
      "price":updated_amount,
    }

    this.httpService.quotePost(quote_dict).subscribe(()=> {
    this.updateQuoteToast();
    },
      (error) => {
      console.error(error);
    });
  }
// toast for updation
  async updateQuoteToast() {
    const toast = await this.toastController.create({
      message: "quote updated",
      duration:3000,
      position:'top'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
