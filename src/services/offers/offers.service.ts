import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) { }

  getCityOffers (id) {
    return this.http.get(`${environment.URLSite}offers/getcitiesoffers/${id}/0.json`);
  }

  getCityOfferDetails (id) {
    return this.http.get(`${environment.URLSite}offers/details/${id}.json`);
  }
}
