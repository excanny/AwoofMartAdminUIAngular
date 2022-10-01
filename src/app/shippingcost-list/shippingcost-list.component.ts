import { Component, OnInit } from '@angular/core';
import { ShippingCostService, CityService, CategoryService } from '../_services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shippingcost-list',
  templateUrl: './shippingcost-list.component.html',
  styleUrls: ['./shippingcost-list.component.css']
})
export class ShippingcostListComponent implements OnInit {

  parentcategories: any = [];
  subcategories: any = [];
  childcategories: any = [];
  cities: any = [];
  shippingCosts: any = [];
  shippingCost: any = {};
  id: any = {};
  constructor(private formBuilder: FormBuilder, private cityService: CityService, private categoryService: CategoryService, private shippingCostService: ShippingCostService, public router: Router) {}

  ngOnInit(): void {
    this.loadShippingCosts();
    this.loadParentCategories();
    this.loadCities();
  }

  editShippingCostForm = this.formBuilder.group({
    weight: [''],
    parent_category_id: [''],
    sub_category_id: [''],
    child_category_id: [''],
    source_location: [''],
    delivery_location: [''],
    delivery_timeline: ['']
  });

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

 

  loadShippingCosts() {
    return this.shippingCostService.getShippingCosts().subscribe((data: {}) => {
      this.shippingCosts = data;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {
    this.displayStyle = "block";
    this.shippingCostService.getShippingCost(id).subscribe((data: {}) => {
      this.shippingCost = data;
      this.id = id;
      console.log(data)

      this.editShippingCostForm.patchValue({
        weight: this.shippingCost.data.weight,
        parent_category_id: this.shippingCost.data.parent_category_id,
        sub_category_id: this.shippingCost.data.sub_category_id,
        child_category_id: this.shippingCost.data.child_category_id,
        source_location: this.shippingCost.data.source_location,
        delivery_location: this.shippingCost.data.delivery_location,
        delivery_timeline: this.shippingCost.data.delivery_timeline
      });

      //console.log(this.id);
    })
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  updateShippingCost() {
    console.warn(JSON.stringify(this.editShippingCostForm.value));
    this.shippingCostService.updateShippingCost(this.id, this.editShippingCostForm.value)
    .subscribe({
      next: (response) => console.log(response), 
      error: (error) => console.log(error),
      complete: () => { 
        this.loadShippingCosts();
        this.closePopup();
      }
    });
  }

  deleteShippingCost(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.shippingCostService.deleteShippingCost(id).subscribe((data: {}) => {
        this.loadShippingCosts();
      });
    }
  }

}
