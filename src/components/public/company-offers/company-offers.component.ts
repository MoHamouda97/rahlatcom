import { CompaniesService } from 'src/services/companies/companies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/services/main/main.service';

@Component({
  selector: 'app-company-offers',
  templateUrl: './company-offers.component.html',
  styleUrls: ['./company-offers.component.css']
})
export class CompanyOffersComponent implements OnInit {
  isLoading = true;
  isData = false;
  length = 0;
  id;  
  data;
  slides;
  offers;

  constructor(
    private service: MainService,
    private offersService: CompaniesService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.getData(this.id);
  }

  getData (id) {
    this.service.getMain().subscribe(
      slides => {
        this.offersService.getCompanyOffers(id).subscribe(
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
