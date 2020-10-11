import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getMain () {
    return this.http.get(`${environment.URLSite}companies/mainpage.json`);
  }
  
  login(body) {
    return this.http.post(`${environment.URLSite}users/token.json`, body);
  }

  restore(body) {
    return this.http.post(`${environment.URLSite}users/forgotpassword.json`, body);
  }

}
