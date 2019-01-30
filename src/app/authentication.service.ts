import { Injectable } from '@angular/core';
import { Events,Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GlobalServiceService } from './global-service.service';
import { Storage } from '@ionic/storage';
import { HttpService } from './http.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
	variablee: any;
	authendicationState = new BehaviorSubject(false);
	constructor(private global: GlobalServiceService,private httpservice:HttpService, private httpClient: HttpClient, private storage: Storage, private platoform: Platform,
		private events: Events) {
		this.platoform.ready().then(() => {
			this.checkToken();
		});
	}

	login(data) {
		this.httpClient.post(this.global.server_url + 'main/login/', data).subscribe((res_data) => {
			console.log(res_data);
			console.log("login inside")
			this.authendicationState.next(true);
			this.events.publish('login_event', res_data['token']);
			this.storage.set('user_profile',res_data['user_profile']);
			console.log(this.storage);
			this.storage.set(TOKEN_KEY, res_data['Token']);                       
			return this.storage.set(TOKEN_KEY, res_data['token']);
		}, (error) => {
			console.error(error);
			let detail_error=error.error['message'];
				alert(detail_error);
		});
	}

	async logout() {
		return   this.storage.clear().then((data)=> {
			console.log(data)
			console.log("logged out")
			this.authendicationState.next(false);
		});
		// return this.storage.remove(TOKEN_KEY).then(() => {
		//   this.authendicationState.next(false);
		// });
	}

	isAuthenticated() {
		return this.authendicationState.value;
	}

	async checkToken() {
		return this.storage.get(TOKEN_KEY).then((res) => {
			if (res) {
				this.authendicationState.next(true);
			}
		});
	}
}
