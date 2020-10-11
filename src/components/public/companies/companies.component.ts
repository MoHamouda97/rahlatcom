import { CompaniesService } from 'src/services/companies/companies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  isLoading = true;
  data;
  companies;
  constructor(private service: CompaniesService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.service.getCompanies().subscribe(
      res => {
        this.data = res;
        this.companies = this.data.data;
        
        this.isLoading = false;
      }
    )  
  }

}
