import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpService } from '../http.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(private router: Router ) {
    
  }

  order_page() 
  {
  	this.router.navigate(['order']);
  }
 customer_page() 
  {
    this.router.navigate(['customer']);
  }
  sale_page()
  {
    this.router.navigate(['sale'])
  }
  payment_page()
  {
    this.router.navigate(['payment'])
  }
  product_page()
  {
     this.router.navigate(['product'])
  }
  tabs_page()
  {
    this.router.navigateByUrl('/tabs/tabs/(tab1:tab1)')
  }
  ngOnInit() {
  }

}



