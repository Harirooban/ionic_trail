import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
@Component({
  selector: 'app-newpayment',
  templateUrl: './newpayment.page.html',
  styleUrls: ['./newpayment.page.scss'],
})
export class NewpaymentPage implements OnInit {
paymentmethod_datas : any
  constructor(private httpService : HttpService) {

    this.httpService.paymentmethod().subscribe((paymentmethod)=> {
      this.paymentmethod_datas = paymentmethod;
    }, (error) => {
      console.error(error);
    }); }

  ngOnInit() {
  }

}
