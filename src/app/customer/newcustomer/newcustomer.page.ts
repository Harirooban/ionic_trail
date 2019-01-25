import { Component, OnInit, ViewChild } from '@angular/core';
import { Slides } from '@ionic/angular';
import { HttpService } from '../../http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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

	new_customer_pref: any;//
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
	geo_latitude:any =null;
	geo_longitude:any=null;

	constructor(private httpService: HttpService, private activaterouter: ActivatedRoute, private geolocation:Geolocation,public formBuilder: FormBuilder) {
		this.customer_id = activaterouter.snapshot.paramMap.get('customer_id')
		console.log(activaterouter.snapshot.paramMap.get('customer_id'))
		// to get the form values in customerForm 
		this.customerForm = this.formBuilder.group({
			id:['new_customer_value'],
			name: [null],
			code: [''],
			phone_number: [null],
			whatsapp: [null],
			door_number: [null],
			community: [null],
			postal_code: [null],
			latitude:[null],
			longitude:[null],
		});
	}
	// get the geolocatio 
	getCustomerLocatoion(){
		this.geolocation.getCurrentPosition().then((resp)=>{
		this.customerForm.controls['latitude'].setValue(resp.coords.latitude);
		this.customerForm.controls['longitude'].setValue(resp.coords.longitude);
	})}
	// new customer product questions
	singleQuestion() {
		this.product_answer = [];
		if (this.selected_product != null) {
			this.new_customer_pref[this.selected_product].forEach((element) => {
				let temp_dict = {}
			  temp_dict['question_id'] = element.question_id
		  temp_dict['answer_data'] = element.customer_answer
		  temp_dict['product_id'] = element.product_id
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
	}

	//accodian for  displaying the selected specs
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

 // to store the spec for new customers 
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

	// to  add/update customers
	addCustomer() {
		// to add new customers
		if (this.customer_id == 0){
			if (this.customerForm.value['name'] == null) {
				alert('enter name');
				return false;
			}
			if (this.customerForm.value['phone_number'] == null) {
				alert('enter phone number');
				return false;
			}
			if (this.customerForm.value['whatsapp'] == null) {
				alert('enter whether whatasapp exists or not');
				return false;
			}
			if (this.customerForm.value['door_number'] == null) {
				alert('enter door_number');
				return false;
			}
			if (this.customerForm.value['community'] == null) {
				alert('enter community');
				return false;
			}
			if (this.customerForm.value['postal_code'] == null) {
				alert('enter postal code');
				return false;
			}
			if (this.customerForm.value['latitute'] == null) {
				alert('Select Location for customer');
				return false;
			}
			this.customer_data_with_pref['customer_details'] = this.customerForm.value
			this.customer_data_with_pref['product_specs'] = this.single_customer_pref
			console.log(this.customer_data_with_pref)
			this.httpService.newCustomerPost(this.customer_data_with_pref).subscribe((payment_datas) => {
			}, (error) => {
				console.error(error);
			});	
		} 
		// to update existing customers
		else{
			let customer_update_dict={
				'customer_details':this.customerForm.value
			}
			this.httpService.newCustomerPost(customer_update_dict).subscribe(()=> {
			console.log(customer_update_dict)
	}, (error) => {
	  console.error(error);
			});
	}
	}

	// for sliding  index back
	slideBackword(index:number){
		this.slides.slideTo(index)
	}
	
	// for sliding  index forward
	slideForward() {
		if (this.customer_id == '0' ){
			this.slides.slideTo(1,300)
		}
		if(this.customer_id != 0){
			this.slides.slideTo(2,300)
		}
	}

	// 
	productSpecSlide(product){
		this.slides.slideTo(3)
		this.product_name_data = [];
		console.log(product)
		this.specs=product['specs']
		product['specs'].forEach((element) => {
			let temp_prod_spec_dict ={}
			temp_prod_spec_dict['customer_id']=this.customer_id
			temp_prod_spec_dict['product_id']=product['product_id']
			temp_prod_spec_dict['question_id']=element.question_id
			temp_prod_spec_dict['question_name']=element.question
			temp_prod_spec_dict['answer_data']=element.answer
			console.log(element.answer)
			if (element.answer == null || element.answer == "" ){
				if (element.question_type == 'boolean-checkbox') {
			  temp_prod_spec_dict['answer_data'] = false
		  }
			}
			this.product_name_data.push(temp_prod_spec_dict)
		});
		console.log(this.product_name_data)
		}

	// 
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
			this.customerForm.controls['door_number'].setValue(data[0]['door_number']);
			this.customerForm.controls['postal_code'].setValue(data[0]['postal_code']);
			this.customerForm.controls['whatsapp'].setValue(data[0]['is_whatsapp']);
			this.customerForm.controls['latitude'].setValue(data[0]['latitude']);
			this.customerForm.controls['longitude'].setValue(data[0]['longitude']);
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
			console.log(this.new_customer_pref)
			this.product_names = Object.keys(this.new_customer_pref)
		}, (error) => {
			console.error(error);
		});
				}
}



