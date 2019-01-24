import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router  } from '@angular/router'; 
import { ModalController, NavController, ToastController, AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public login_form: FormGroup;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private httpService: HttpService,
    private authendicationService: AuthenticationService) {
    this.login_form = this.formBuilder.group({
      user_name: ['', Validators.compose([Validators.required])],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  onLoginClicled() {
   this.authendicationService.login(this.login_form.value);
    // this.navCtrl.navigateRoot('/app/tabs/(home:home)');
   }
}