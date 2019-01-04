import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-prodpref',
  templateUrl: './prodpref.page.html',
  styleUrls: ['./prodpref.page.scss'],
})
export class ProdprefPage implements OnInit {

  product_preference: any[];

  shownGroup = null;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }
  openList(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup == group;
  };


  ngOnInit() {
    this.product_preference = this.navParams.get('customer_value');
    console.log(this.product_preference)
  }

}
