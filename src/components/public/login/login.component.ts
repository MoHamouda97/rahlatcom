import { MainService } from 'src/services/main/main.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  restoreForm: FormGroup;
  loader = false;
  restoreLoader = false;
  isVisible;
  data;

  constructor(private fb: FormBuilder, private service: MainService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    $('#nav_bar, #main_footer, #copy_footer').hide();

    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      pwp: [null, [Validators.required]],
    });
    
    this.restoreForm = this.fb.group({
      restore: [null, [Validators.required]],
    });    
  }

  login() {
    this.loader = true;

    let obj = {
      "username": this.loginForm.get('username').value,
      "password": this.loginForm.get('pwp').value
    }

    this.service.login(obj).subscribe(
      res => {
        this.message.success('تمت عملية تسجيل الدخول بنجاح');
        
        this.data = res;
        localStorage.setItem('token', this.data.data.token);

        this.loader = false;

        this.router.navigate(['/']);
      },
      err => {
        this.message.error('اسم المستخدم او كلمة المرور غير صحيحة بالرجاء المحاولة مره اخرى');
        this.loader = false;
      }
    )
  }

  showModal() {
    this.isVisible = true;
  }
  
  handleCancel() {
    this.isVisible = false;
  } 
  
  restore() {
    this.restoreLoader = true;

    let obj = {'email': this.restoreForm.get('restore').value};

    this.service.restore(obj).subscribe(
      res => {
        this.message.loading('جار استرجاع بيانات الحساب بالرجاء التحقق من البريد الالكتروني');
        this.restoreLoader = false;
      },
      err => {
        this.message.error('حدث خطأ اثناء استرجاع البيانات بالرجاء المحاولة مرة اخرى');
        this.restoreLoader = false;
      }
    )
  }

  ngOnDestroy(): void {
    $('#nav_bar, #main_footer, #copy_footer').show();
  }  

}
