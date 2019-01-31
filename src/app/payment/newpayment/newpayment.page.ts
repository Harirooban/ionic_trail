import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router,ActivatedRoute } from '@angular/router'; 
import { NavController } from '@ionic/angular';
import { FormGroup,FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-newpayment',
  templateUrl: './newpayment.page.html',
  styleUrls: ['./newpayment.page.scss'],
})
export class NewpaymentPage implements OnInit {
  paymentmethod_datas : any
  customer_id : any
  paymentForm: FormGroup;
  today:any;
  constructor(private httpService : HttpService,private activaterouter : ActivatedRoute ,public formBuilder: FormBuilder , private nav: NavController ) {
  	this.customer_id = activaterouter.snapshot.paramMap.get('customer_id')
    this.today = new Date().toJSON().split('T')[0]
    this.paymentForm = this.formBuilder.group({
      date: [this.today, Validators.required],
      amount: [null, Validators.required],
      payment_method: [null, Validators.required],
      customer_id: [this.customer_id],
      reference_id:[null,Validators.required]
    });
  	
  	// dropdown data for payment method
    this.httpService.paymentmethod().subscribe((paymentmethod)=> {
      this.paymentmethod_datas = paymentmethod;
      console.log(this.paymentmethod_datas)
    }, (error) => {
      console.error(error);
    });
    
     }
	addPayment() {
    if (this.paymentForm.value['amount'] == null){
       alert('enter amount');
       return false;
    }
    if (this.paymentForm.value['amount'] == 0) {
    alert( 'amount must be greater than zero');
    return false;
    }
    if (this.paymentForm.value['payment_method'] == null){
      alert('select the payment method');
      return false;
    }
    if (this.paymentForm.value['payment_method'] != 1){
      if (this.paymentForm.value['reference_id'] == null){
        alert('enter the reference_id');
        return false;
      }
    }
    //  dictionary to post data
   	console.log(this.paymentForm.value)
    // getting data from form
    
    // to send data to django server
    this.httpService.newPaymentPost(this.paymentForm.value).subscribe(()=> {
    this.nav.navigateForward('/payment/' + this.customer_id)
    	
    }, (error) => {
      console.error(error);
    		});
     }
  ngOnInit() {
  }

}