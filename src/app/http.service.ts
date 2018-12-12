import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from './global-service.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient, private globalService: GlobalServiceService ) { }

  testfun() {
    return this.httpClient.get(this.globalService.base_url + 'main/customer/' );
  }
}
