import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/services/main/main.service';
import { OffersService } from 'src/services/offers/offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  isLoading = true;
  isData = false;
  length = 0;
  id;  
  data;
  slides;
  offers;

  constructor(
    private service: MainService, 
    private offerService: OffersService,
    private router: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getData(this.id);
  }

  getData (id) {
    this.service.getMain().subscribe(
      slides => {
        this.offerService.getCityOffers(id).subscribe(
          res => {
            this.isData = true;
            
            this.data = slides;
            this.slides = this.data.sliders;

            this.data = res;
            this.length = this.data.data.length;            
            this.offers = this.data.data;

            this.isLoading = false;
          }
        )                
      }
    )
  }

}
