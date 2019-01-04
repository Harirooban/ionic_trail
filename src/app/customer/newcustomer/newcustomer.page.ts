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

	constructor(private httpService: HttpService, private activaterouter: ActivatedRoute, public formBuilder: FormBuilder) {
		
		this.customerForm = this.formBuilder.group({
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
			latitude: ['', Validators.required],
			longitude: ['', Validators.required],
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
		this.single_customer_pref.push({
			'product_name': this.selected_product,
			'customer_product_preference': this.product_answer
		})
		this.slides.slideTo(slide_index)
		console.log(this.single_customer_pref),
			(error) => {
				console.error(error);
			}
	}

	addCustomer() {
		this.customer_data_with_pref['customer_details'] = this.customerForm.value
		this.customer_data_with_pref['product_specs'] = this.single_customer_pref
		console.log(this.customer_data_with_pref)
		this.httpService.newCustomerPost(this.customer_data_with_pref).subscribe((payment_datas) => {
		}, (error) => {
			console.error(error);
		});	
	}

	slideForward(slide_index: number) {
		this.slides.slideTo(slide_index)
		this.selected_product = null;
	}
	ngOnInit() {
		this.httpService.newCustomerpref().subscribe((pref_data) => {
			this.new_customer_pref = pref_data;
			this.product_names = Object.keys(this.new_customer_pref)
		}, (error) => {
			console.error(error);
		});
				}
}



