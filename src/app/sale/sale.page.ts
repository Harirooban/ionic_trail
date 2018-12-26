import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpService } from '../http.service';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
})
export class SalePage implements OnInit {
	sale_datas : any;
  constructor(private router: Router ,private httpService : HttpService) { 
  	this.httpService.sales().subscribe((sale_data)=> {
      this.sale_datas = sale_data;
   	console.log(this.sale_datas)
    })
  }

  ngOnInit() {
  }

}
