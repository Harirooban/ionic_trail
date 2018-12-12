import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpService } from '../http.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  customer_datas : any ;
  product_preferences : any[][] = [[],[]];
  // question : any ;

  constructor(private router: Router ,private httpService : HttpService) {
    this.httpService.testfun().subscribe((data)=> {
      this.customer_datas = data;
      for (let customer in this.customer_datas) {
        console.log(this.customer_datas[customer]['product_preferences']);
        for (let product in this.customer_datas[customer]['product_preferences']) {
          console.log(this.customer_datas[customer]['product_preferences'][product]);
        }
      }
    }, (error) => {
      console.error(error);
    });
  }
 
  
  go() 
  {
  	 this.router.navigateByUrl('/tabs/tabs/(tab1:tab1)')
  }

  ngOnInit() {
  }

}
