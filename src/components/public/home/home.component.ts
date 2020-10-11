import { MainService } from 'src/services/main/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = true;
  data;
  slides;
  cities;

  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.getMain();
  }

  getMain () {
    this.service.getMain().subscribe(
      res => {
        this.data = res;
        this.slides = this.data.sliders;
        this.cities = this.data.cities;
        this.isLoading = false;
      }
    )
  }

}
