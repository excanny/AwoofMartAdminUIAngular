import { Component, OnInit } from '@angular/core';
import { ItemService, CategoryService, DomainService } from '../_services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  domains: any = [];
  parentcategories: any = [];
  subcategories: any = [];
  childcategories: any = [];
  items: any = [];
  item: any = {};
  id: any = {};

constructor(private formBuilder: FormBuilder, private itemService: ItemService, private categoryService: CategoryService, private domainService: DomainService, public router: Router) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadDomains();
    this.loadParentCategories();
  }

  editItemForm = this.formBuilder.group({
    item_name: [''],
    domain_id: [''],
    parent_category_id: [''],
    sub_category_id: [''],
    child_category_id: ['null'],
    sku_name: [''],
    sku_weight: [null],
    description: [''],
    item_image_name: [null],
  });

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

onFileChange(event:any) {
    
  const file = event.target.files[0];
  this.editItemForm.patchValue({
    item_image_name: file
  });
}


  loadItems() {
    return this.itemService.getItems().subscribe((data: {}) => {
      this.items = data;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {
    this.displayStyle = "block";
    this.itemService.getItem(id).subscribe((data: {}) => {
      this.item = data;
      this.id = id;
      console.log(data)

      this.editItemForm.patchValue({
        item_name: this.item.data.item_name,
        domain_id: this.item.data.domain_id,
        parent_category_id: this.item.data.parent_category_id,
        sub_category_id: this.item.data.sub_category_id,
        child_category_id: this.item.data.child_category_id,
        sku_name: this.item.data.sku_name,
        sku_weight: this.item.data.sku_weight,
        description: this.item.data.description,
        item_image_name: this.item.data.item_image_name,
      });

      console.log(this.id);
    })

    //console.log(id);

    //alert("hi")
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  updateItem() {
    console.warn(JSON.stringify(this.editItemForm.value));
    this.itemService.updateItem(this.id, this.editItemForm.value)
    .subscribe({
      next: (response) => console.log(response), 
      error: (error) => console.log(error),
      complete: () => { 
        this.loadItems();
        this.closePopup();
      }
    });
  }

  deleteItem(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.itemService.deleteItem(id).subscribe((data: {}) => {
        this.loadItems();
      });
    }
  }
}
