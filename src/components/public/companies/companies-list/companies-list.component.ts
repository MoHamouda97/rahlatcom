import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {
  @Input('companies') companies;
  constructor() { }

  ngOnInit(): void {
  }

}
