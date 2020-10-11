import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  getCompanies () {
    return this.http.get(`${environment.URLSite}Companies/index.json`);
  } 
  
  getCompanyOffers(id) {
    return this.http.get(`${environment.URLSite}Companies/getComOffers/${id}/1.json`);
  }

  addComapny(name, email, city, address, phone, logo: File, cover: File, username, password, lat, lng, website) {
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('city_id', city);
    formData.append('address', address);
    formData.append('phone', phone);
    if(cover){formData.append('cover', cover, cover.name);}
    if(logo){formData.append('logo', logo, logo.name);}  
    formData.append('username', username);
    formData.append('password', password);
    formData.append('lat', lat);
    formData.append('lng', lng);
    formData.append('website', website);

    return this.http.post<any>(`${environment.URLSite}companies/add.json`, formData);    
  }
}
