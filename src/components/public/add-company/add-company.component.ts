import { MainService } from 'src/services/main/main.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { NzMessageService } from 'ng-zorro-antd';
import { CompaniesService } from 'src/services/companies/companies.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  addForm: FormGroup;
  validateForm!: FormGroup;
  isLoading = true;
  loader = false;
  data;
  cities;
  selectedValue: string;
  inputValue?: string;
  options: string[] = [];  
  lat = 0;
  lng = 0;
  zoom = 15;
  geocoder = new google.maps.Geocoder();
  logoName = 'اختر صورة';
  logo;
  coverName = 'اختر صورة الخلفية';
  cover;
  value;  
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @ViewChild('map3', { static: true }) map3;   

  constructor(
    private fb: FormBuilder, 
    private service: MainService, 
    private companyService: CompaniesService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      number: [null, [Validators.required]],
      website: [null, [Validators.required]],
      email: [null, [Validators.required]],
      address: [null, [Validators.required]],
      username: [null, [Validators.required]],
      pwp: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });

    navigator.geolocation.getCurrentPosition((position) => {                   
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });

    this.getCities();     
  }

  getCities() {
    this.service.getMain().subscribe(
      res => {
        this.data = res;
        this.cities = this.data.cities;
        this.isLoading = false;
      }
    )
  } 
  
  onChange(value: string): void {
    this.updateValue(value);
  } 
  
  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }
  
  updateValue(value: string): void {
    const reg = /^[0-9]+$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement!.nativeElement.value = this.value;
  }   

  formatNumber(value: string): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }

    return `${prefix}${result}${list[1] ? `${list[1]}` : ''}`;
  }   

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['gmail.com', 'yahoo.com', 'hotmail.com'].map(domain => `${value}@${domain}`);
    }
  }    

  changeAddress(event) {
    let address = event.target.value;

    this.geocoder.geocode({'address': address}, (result, status) => {
      this.lat = result[0].geometry.location.lat();
      this.lng = result[0].geometry.location.lng();

      localStorage.setItem('lat', this.lat.toString());
      localStorage.setItem('lng', this.lng.toString());      
    });
  }
  
  markerDragEnd(m: any) {
    let lat = m.coords.lat;
    let lng = m.coords.lng;    
    this.geocoder.geocode({
      'location': {
        lat: lat,
        lng: lng
      }
    }, (result, status) => {
      localStorage.setItem('lat', result[0].geometry.location.lat().toString());
      localStorage.setItem('lng', result[0].geometry.location.lng().toString());          
    })
  }
  
  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.addForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.addForm.controls.pwp.value) {
      return { confirm: true, error: true };
    }
    return {};
  };  
  
  getLogoName(files: FileList) {
    let fileName = $('#logo').val().toString().replace(/C:\\fakepath\\/i, '')
    this.logoName = fileName;
    this.logo = files.item(0);   
  }

  getCoverName(files: FileList) {
    let fileName = $('#cover').val().toString().replace(/C:\\fakepath\\/i, '')
    this.coverName = fileName;
    this.cover = files.item(0);      
  }

  add() {
    this.loader = true;
    let name = this.addForm.get('name').value;
    let number = this.addForm.get('number').value;
    let website = this.addForm.get('website').value;
    let email = this.addForm.get('email').value;
    let city = $('.mat-select-value-text span').text(); 
    let address = this.addForm.get('address').value;
    let lat = localStorage.getItem('lat');
    let lng = localStorage.getItem('lng');
    let username = this.addForm.get('username').value;
    let pwp = this.addForm.get('pwp').value;
    let rePwp = this.addForm.get('checkPassword').value; 
    
    this.companyService.addComapny(name, email, city, address, number, this.logo, this.cover, username, pwp, lat, lng, website).subscribe(
      res => {
        this.message.success('تمت اضافة الشركة بنجاح');
        this.loader = false;
        console.log(res)        
      },

      err => {
        this.message.error('حدث خطأ بالرجاء المحاولة مرة اخرى');
        this.loader = false; 
        console.log(err)
      }
    )
  }

}
