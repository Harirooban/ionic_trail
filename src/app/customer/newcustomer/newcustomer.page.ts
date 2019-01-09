import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-newcustomer',
	templateUrl: './newcustomer.page.html',
	styleUrls: ['./newcustomer.page.scss'],
})
export class NewcustomerPage implements OnInit {
	@ViewChild('common_slide') slides: Slides
	slideOpts = {
		effect: 'flip',
		allowTouchMove: false
	};
	new_customer_pref: any;
	product_names: any;
	selected_product: any = null;
	customerForm: FormGroup;
	product_answer: any = [];
	single_customer_pref = [];
	customer_data_with_pref = {};
	shownGroup = null;
	customer_id : any = 0;
	customer_datas:any;
	product_name_data: any = [];
	product_id:any;
	product_data: any = [];
	product_details: any;
	specs:any = null;
	constructor(private httpService: HttpService, private activaterouter: ActivatedRoute, public formBuilder: FormBuilder) {
		console.log(activaterouter.snapshot.paramMap.get('customer_id'))
		this.customer_id = activaterouter.snapshot.paramMap.get('customer_id')
		this.customerForm = this.formBuilder.group({
			id:['new_customer_value'],
			name: ['', Validators.required],
			code: ['', Validators.required],
			phone_number: ['', Validators.required],
			whatsapp: ['', Validators.required],
			email: ['', Validators.required],
			landmark: ['', Validators.required],
			door_number: ['', Validators.required],
			community: ['', Validators.required],
			street_name: ['', Validators.required],
			postal_code: ['', Validators.required],
		});
	}
	
	singleQuestion() {
		this.product_answer = [];
		if (this.selected_product != null) {
			this.new_customer_pref[this.selected_product].forEach((element) => {
				this.product_answer.push({
					question_id: element.question_id,
					answer_data: '',
					product_id: element.product_id,
					question_name: element.question
				})
			});
		}
	}

	openList(group) {
		if (this.isGroupShown(group)) {
			this.shownGroup = null;
		} else {
			this.shownGroup = group;
		}
	}

	isGroupShown(group) {
		return this.shownGroup == group;
	};

	storeAnswerData(slide_index: number) {
		if (this.customer_id == 0){
			this.single_customer_pref.push({
				'product_name': this.selected_product,
				'customer_product_preference': this.product_answer
			})
			this.slides.slideTo(0)
			console.log(this.single_customer_pref),
				(error) => {
					console.error(error);
				}
			}
		if (this.customer_id != 0){
			this.slides.slideTo(4)
		}
	}

	addCustomer() {
		if (this.customer_id == 0){
			this.customer_data_with_pref['customer_details'] = this.customerForm.value
			this.customer_data_with_pref['product_specs'] = this.single_customer_pref
			console.log(this.customer_data_with_pref)
			this.httpService.newCustomerPost(this.customer_data_with_pref).subscribe((payment_datas) => {
			}, (error) => {
				console.error(error);
			});	
		} 
		else{
			this.httpService.newCustomerPost(this.customerForm.value).subscribe(()=> {
    	
    }, (error) => {
      console.error(error);
    		});
	}
	}
	slideBackword(index:number){
		this.slides.slideTo(index)
	}
	slideForward() {
		if (this.customer_id == '0' ){
			this.slides.slideTo(1)
		}
		if(this.customer_id != 0){
			this.slides.slideTo(2)
		}

	}
	productSpecSlide(product){
		this.slides.slideTo(3)
		this.product_name_data = []; 
		this.specs=product['specs']
		product['specs'].forEach((element) => {
			this.product_name_data.push({
				customer_id:this.customer_id,
				product_id: product['product_id'],
				question_id: element.question_id,
				answer_data: element.answer,
				question_name: element.question
			})
		});
		console.log(this.product_name_data)
		}

	getCustomerDetails(customer_id){
		let customer_dict ={
			'customer_id':customer_id
		}
		this.httpService.customerPost(customer_dict).subscribe((data)=>{
			this.customer_datas=data;
			this.customerForm.controls['id'].setValue(data[0]['id']);
			this.customerForm.controls['name'].setValue(data[0]['name']);
			this.customerForm.controls['code'].setValue(data[0]['code']);
			this.customerForm.controls['phone_number'].setValue(data[0]['phone_number']);
			this.customerForm.controls['community'].setValue(data[0]['community']);
			this.customerForm.controls['email'].setValue(data[0]['email']);
			this.customerForm.controls['landmark'].setValue(data[0]['landmark']);
			this.customerForm.controls['door_number'].setValue(data[0]['door_number']);
			this.customerForm.controls['postal_code'].setValue(data[0]['postal_code']);
			this.customerForm.controls['street_name'].setValue(data[0]['street']);
			this.customerForm.controls['whatsapp'].setValue(data[0]['is_whatsapp']);
			console.log(this.customer_datas);
		});
	}
	UpdateSpec(){
		this.slides.slideTo(2)
      this.httpService.updateSpec(this.product_name_data).subscribe((data)=> {
    }, (error) => {
      console.error(error);
    });
  }
	ngOnInit() {
		if (this.customer_id != 0){
			console.log('came inside if')
			this.getCustomerDetails(this.customer_id);
		}
		this.httpService.newCustomerpref().subscribe((pref_data) => {
			this.new_customer_pref = pref_data;
			this.product_names = Object.keys(this.new_customer_pref)
		}, (error) => {
			console.error(error);
		});
				}
}



