import { Component, OnInit } from '@angular/core';
import { ItemService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService, DomainService, CategoryService } from '../_services';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  addItemForm = this.fb.group({
    item_name: ['', Validators.required],
    domain_id: ['', Validators.required],
    parent_category_id: ['', Validators.required],
    sub_category_id: [null, Validators.required],
    child_category_id: [null, Validators.required],
    sku_name: ['', Validators.required],
    sku_weight: ['', Validators.required],
    description: ['', Validators.required],
    item_image_name: [null, Validators.required],
});

domains: any = [];
parentcategories: any = [];
subcategories: any = [];
childcategories: any = [];
items: any = [];
item: any = {};
constructor(private fb: FormBuilder, private itemService: ItemService, private categoryService: CategoryService, private brandService: BrandService, private domainService: DomainService, public router: Router) {}

ngOnInit(): void {
  this.loadItems();
  this.loadDomains();
  this.loadParentCategories();
}

loadDomains() {
  return this.domainService.getDomains().subscribe((data: {}) => {
    this.domains = data;
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

loadItems() {
  return this.itemService.getItems().subscribe((data: {}) => {
    this.items = data;
    console.log(data)
  });
}

onFileChange(event:any) {
    
  const file = event.target.files[0];
  this.addItemForm.patchValue({
    item_image_name: file
  });
}

onSubmit() {
  this.itemService.createItem(
      this.addItemForm.get('sku_weight')?.value!,
      this.addItemForm.get('item_name')?.value!,
      this.addItemForm.get('domain_id')?.value!,
      this.addItemForm.get('description')?.value!,
      this.addItemForm.get('parent_category_id')?.value!,
      this.addItemForm.get('sub_category_id')?.value!,
      this.addItemForm.get('child_category_id')?.value!,
      this.addItemForm.get('sku_name')?.value!,
      this.addItemForm.get('item_image_name')?.value!,
     
  ).subscribe({next: (response) => console.log(response),error: (error) => console.log(error)});

  this.loadItems();

  this.router.navigate(['/dashboard/items']);

}

}
