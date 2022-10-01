import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import {  CategoryAddComponent } from './category-add/category-add.component';
import { CityListComponent } from './city-list/city-list.component';
import {  CityAddComponent } from './city-add/city-add.component';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaAddComponent } from './area-add/area-add.component';
import { LandmarkListComponent } from './landmark-list/landmark-list.component';
import {  LandmarkAddComponent } from './landmark-add/landmark-add.component';
import { ShippingcostListComponent } from './shippingcost-list/shippingcost-list.component';
import {  ShippingcostAddComponent } from './shippingcost-add/shippingcost-add.component';
import { PackagingcostListComponent } from './packagingcost-list/packagingcost-list.component';
import { PackagingcostAddComponent } from './packagingcost-add/packagingcost-add.component';
import { VatListComponent } from './vat-list/vat-list.component';
import {  VatUpdateComponent } from './vat-update/vat-update.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, 
    children: [
      { path: 'home', component: FrontComponent },
      { path: 'domains', component: DomainComponent },
      { path: 'add-domain', component: DomainAddComponent },
      { path: 'brands', component: BrandListComponent },
      { path: 'add-brand', component: BrandAddComponent },
      { path: 'items', component: ItemListComponent },
      { path: 'add-item', component: ItemAddComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'add-category', component: CategoryAddComponent },
      { path: 'cities', component: CityListComponent },
      { path: 'add-city', component: CityAddComponent },
      { path: 'areas', component: AreaListComponent },
      { path: 'add-area', component: AreaAddComponent },
      { path: 'landmarks', component: LandmarkListComponent },
      { path: 'add-landmark', component: LandmarkAddComponent },
      { path: 'shippingcosts', component: ShippingcostListComponent },
      { path: 'add-shippingcost', component: ShippingcostAddComponent },
      { path: 'packagingcosts', component: PackagingcostListComponent },
      { path: 'add-packagingcost', component: PackagingcostAddComponent },
      { path: 'vats', component: VatListComponent },
      { path: 'update-vat', component:  VatUpdateComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
