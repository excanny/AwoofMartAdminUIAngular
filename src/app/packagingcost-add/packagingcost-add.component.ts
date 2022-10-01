import { Component, OnInit } from '@angular/core';
import { PackagingCostService, CategoryService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packagingcost-add',
  templateUrl: './packagingcost-add.component.html',
  styleUrls: ['./packagingcost-add.component.css']
})
export class PackagingcostAddComponent implements OnInit {

  addPackagingCostForm = this.fb.group({
    parent_category_id: ['', Validators.required],
    sub_category_id: ['', Validators.required],
    child_category_id: ['', Validators.required],
    volume: ['', Validators.required],
    material: ['', Validators.required],    
});

parentcategories: any = [];
subcategories: any = [];
childcategories: any = [];
constructor(private fb: FormBuilder, private categoryService: CategoryService, private packagingCostService: PackagingCostService, public router: Router) {}

ngOnInit(): void {
  this.loadParentCategories();
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
  //console.warn(this.loginForm.value);
    this.packagingCostService.createPackagingCost(this.addPackagingCostForm.value).subscribe((data: {}) => {
      //if(data.status)
      this.router.navigate(['/dashboard/packagingcosts']);
      //console.log(data.status);
    });
}

}
