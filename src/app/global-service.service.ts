import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {
	server_url: string = 'http://192.168.0.7:8000/';

  constructor() { }

  get base_url() {
  	return this.server_url;
  }
}
