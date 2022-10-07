import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrontComponent } from './front/front.component';
import { DomainComponent } from './domain/domain.component';
import { DomainAddComponent } from './domain-add/domain-add.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CityListComponent } from './city-list/city-list.component';
import { CityAddComponent } from './city-add/city-add.component';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaAddComponent } from './area-add/area-add.component';
import { LandmarkListComponent } from './landmark-list/landmark-list.component';
import { LandmarkAddComponent } from './landmark-add/landmark-add.component';
import { ShippingcostListComponent } from './shippingcost-list/shippingcost-list.component';
import { ShippingcostAddComponent } from './shippingcost-add/shippingcost-add.component';
import { PackagingcostListComponent } from './packagingcost-list/packagingcost-list.component';
import { PackagingcostAddComponent } from './packagingcost-add/packagingcost-add.component';
import { VatListComponent } from './vat-list/vat-list.component';
import { VatUpdateComponent } from './vat-update/vat-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FrontComponent,
    DomainComponent,
    DomainAddComponent,
    BrandListComponent,
    BrandAddComponent,
    ItemListComponent,
    ItemAddComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CityListComponent,
    CityAddComponent,
    AreaListComponent,
    AreaAddComponent,
    LandmarkListComponent,
    LandmarkAddComponent,
    ShippingcostListComponent,
    ShippingcostAddComponent,
    PackagingcostListComponent,
    PackagingcostAddComponent,
    VatListComponent,
    VatUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
