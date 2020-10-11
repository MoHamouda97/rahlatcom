import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/services/offers/offers.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  isLoading = true;
  isData = false;
  id;
  data;
  images;
  details;
  customOptions: OwlOptions = {
    loop: true,
    nav: true,
    navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    items: 1,
    animateOut: 'fadeOut',
  }  

  constructor(private service: OffersService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getDetails(this.id);
  }

  getDetails (id) {
    this.service.getCityOfferDetails(id).subscribe(
      res => {
        this.data = res;
        this.images = this.data.offer.offer_photos;
        this.details = this.data.offer;

        $('#js_description').html(this.details.description);

        this.isLoading = false;
        this.isData = true;
      }
    )
  }

}
