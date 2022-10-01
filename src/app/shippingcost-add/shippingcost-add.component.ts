import { Component, OnInit } from '@angular/core';
import { ShippingCostService, CategoryService, CityService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shippingcost-add',
  templateUrl: './shippingcost-add.component.html',
  styleUrls: ['./shippingcost-add.component.css']
})
export class ShippingcostAddComponent implements OnInit {

  addShippingCostForm = this.fb.group({
    weight: ['', Validators.required],
    parent_category_id: ['', Validators.required],
    sub_category_id: ['', Validators.required],
    child_category_id: ['', Validators.required],
    source_location: ['', Validators.required],
    delivery_location: ['', Validators.required],
    delivery_timeline: ['', Validators.required]
    
});

parentcategories: any = [];
subcategories: any = [];
childcategories: any = [];
cities: any = [];

constructor(private fb: FormBuilder, private cityService: CityService, private categoryService: CategoryService, private ShippingCostService: ShippingCostService, public router: Router) {}

ngOnInit(): void {
  this.loadParentCategories();
  this.loadCities();
}

loadCities() {
  return this.cityService.getCities().subscribe((data: {}) => {
    this.cities = data;
    console.log(data)
  });
}

loadParentCategories() {
  return this.categoryService.getParentCategories().subscribe((data: {}) => {
    this.parentcategories = data;
    console.log(data)
  });
}

onChangeParentCategory(event:any) {
  return this.categoryService.getSubCategories(event.value).subscribe((data: {}) => {
    this.subcategories = data;
    console.log(data)
 });
}

onChangeSubCategory(event:any) {
  return this.categoryService.getSubCategories(event.value).subscribe((data: {}) => {
    this.childcategories = data;
    console.log(data)
 });
}

onSubmit():void{
    console.warn(JSON.stringify(this.addShippingCostForm.value));
    this.ShippingCostService.createShippingCost(this.addShippingCostForm.value).subscribe((data: {}) => {
      //if(data.status)
      this.router.navigate(['/dashboard/shippingcosts']);
      //console.log(data.status);
    });
}


}
