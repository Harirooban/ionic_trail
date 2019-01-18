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

  constructor(private httpService : HttpService,private activaterouter : ActivatedRoute ,public formBuilder: FormBuilder , private nav: NavController ) {
  	this.customer_id = activaterouter.snapshot.paramMap.get('customer_id')

    this.paymentForm = this.formBuilder.group({
      date: ['', Validators.required],
      amount: ['', Validators.required],
      payment_method: ['', Validators.required],
      customer_id: [this.customer_id],
      reference_id:['',Validators.required]
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
    //  dictionary to post data
   	console.log(this.paymentForm.value)
    // getting data from form
    
    // to send data to django server
    this.httpService.newPaymentPost(this.paymentForm.value).subscribe(()=> {
    	
    }, (error) => {
      console.error(error);
    		});
    this.nav.navigateForward('/payment/' + this.customer_id)
     }
  ngOnInit() {
  }

}