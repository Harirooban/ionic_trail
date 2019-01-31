import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router  } from '@angular/router'; 
import { ModalController, NavController, ToastController, AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { AuthenticationService } from '../authentication.service'
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public login_form: FormGroup;
  swipeOption: boolean=true;
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController, 
    private menu :MenuController,
    private httpService: HttpService,
    private authendicationService: AuthenticationService) {
      
      this.login_form = this.formBuilder.group({
        user_name: ['', Validators.compose([Validators.required])],
        password: [null, Validators.required],
      });
    this.login_form.reset();  }

  ngOnInit() {
  }

  onLoginClicled() {
   this.authendicationService.login(this.login_form.value);
   this.login_form.reset();
    // this.navCtrl.navigateRoot('/app/tabs/(home:home)');
   }
}