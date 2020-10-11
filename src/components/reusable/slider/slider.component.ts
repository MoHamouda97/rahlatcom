import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input("slides") slides;  
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

  constructor() { }

  ngOnInit(): void {
  }

}
