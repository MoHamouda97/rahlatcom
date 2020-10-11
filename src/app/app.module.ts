import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { RouterModule } from '@angular/router';

// Angular Material
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

// Owl Carousel
import { CarouselModule } from 'ngx-owl-carousel-o';

// WoW JS
import { NgwWowModule } from 'ngx-wow';

// Reusable Components
import { SiteNavComponent } from 'src/components/reusable/site-nav/site-nav.component';
import { SliderComponent } from 'src/components/reusable/slider/slider.component';
import { OfferCardComponent } from 'src/components/reusable/offer-card/offer-card.component';
import { OfferDetailsComponent } from 'src/components/reusable/offer-details/offer-details.component';
import { LoaderComponent } from 'src/components/reusable/loader/loader.component';

// Public Components
import { HomeComponent } from 'src/components/public/home/home.component';
import { CitiesComponent } from 'src/components/public/home/cities/cities.component';
import { DownloadAppComponent } from 'src/components/public/home/download-app/download-app.component';
import { OffersComponent } from 'src/components/public/offers/offers.component';
import { AboutComponent } from 'src/components/public/about/about.component';
import { SearchFormComponent } from 'src/components/public/companies/search-form/search-form.component';
import { CompaniesListComponent } from 'src/components/public/companies/companies-list/companies-list.component';
import { CompaniesComponent } from 'src/components/public/companies/companies.component';
import { CompanyOffersComponent } from './../components/public/company-offers/company-offers.component';
import { AddCompanyComponent } from 'src/components/public/add-company/add-company.component';
import { LoginComponent } from 'src/components/public/login/login.component';
import { FooterComponent } from 'src/components/public/footer/footer.component';

// Gmap
import { AgmCoreModule, GoogleMapsAPIWrapper  } from '@agm/core';

// Services
import { MainService } from 'src/services/main/main.service';
import { CompaniesService } from 'src/services/companies/companies.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SiteNavComponent,
    HomeComponent,
    CitiesComponent,
    DownloadAppComponent,
    SliderComponent,
    OffersComponent,
    OfferCardComponent,
    OfferDetailsComponent,
    AboutComponent,
    SearchFormComponent,
    CompaniesListComponent,
    CompaniesComponent,
    CompanyOffersComponent,
    AddCompanyComponent,
    LoginComponent,
    LoaderComponent,
    FooterComponent    
  ],
  imports: [
    NgZorroAntdModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    CarouselModule,
    NgwWowModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCjzzd4nbOiZJx3B53u9ZZAq0tcOsVUBdg' }),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'companies',
        component: CompaniesComponent
      }, 
      {
        path: 'register',
        component: AddCompanyComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },                        
      {
        path: 'offers/:id',
        component: OffersComponent
      },
      {
        path: 'details/:id',
        component: OfferDetailsComponent
      }
      ,
      {
        path: 'company-offers/:id',
        component: CompanyOffersComponent
      }      
    ])
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    GoogleMapsAPIWrapper,
    MainService,
    CompaniesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
