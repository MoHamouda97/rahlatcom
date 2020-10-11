import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-nav',
  templateUrl: './site-nav.component.html',
  styleUrls: ['./site-nav.component.css']
})
export class SiteNavComponent implements OnInit {
  isLogin;
  constructor() { }

  ngOnInit(): void {
  }

  checkLogin() {
    this.isLogin = (localStorage.getItem('token') ? true : false);

    return this.isLogin;
  }

}
