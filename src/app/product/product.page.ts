import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpService } from '../http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
product_datas : any;
  constructor(private router: Router ,private httpService : HttpService) { 
  	this.httpService.product().subscribe((product_data)=> {
      this.product_datas = product_data;
   	console.log(this.product_datas)
    })
  }

  ngOnInit() {
  }

}