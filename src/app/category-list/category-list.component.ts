import { Component, OnInit } from '@angular/core';
import { CategoryService, DomainService } from '../_services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Domain } from "../_models";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  domains: any = [];
  domain: any = {};
  categories: any = [];
  category: any = {};
  id: any = {};
  constructor(private formBuilder: FormBuilder, private domainService: DomainService, private categoryService: CategoryService, public router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadDomains();
  }

  editCategoryForm = this.formBuilder.group({
    category_name: ['', Validators.required],
    domain_id: ['', Validators.required],
    description: ['', Validators.required],
    parent_id: [null, Validators.required],
    allow_merchant_upload: [null, Validators.required],
    category_image_name: [null, Validators.required],
  });


  loadCategories() {
    return this.categoryService.getCategories().subscribe((data: {}) => {
      this.categories = data;
      console.log(data)
    });
  }

  loadDomains() {
    return this.domainService.getDomains().subscribe((data: {} ) => {
      this.domains = data;
      console.log(data)
    });
  }

  getDomain(id:string) {
    return this.domainService.getDomainName(id).subscribe((data: Domain ) => {
      this.domain = data.domain_name;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {
      this.displayStyle = "block";
      this.categoryService.getCategory(id).subscribe((data: {}) => {
      this.category = data;
      this.id = id;
      console.log(data)

      this.editCategoryForm.patchValue({
        category_name: this.category.data.category_name,
        domain_id: this.category.data.domain_id,
        description: this.category.data.description,
        parent_id: this.category.data.parent_id,
        allow_merchant_upload: this.category.data.allow_merchant_upload,
        category_image_name: this.category.data.category_image_name,
      });
    });

    console.log(this.editCategoryForm.value);
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  updateDomain() {
    this.categoryService.updateCategory(this.id, this.editCategoryForm.value)
    .subscribe({
      next: (response) => console.log(response), 
      error: (error) => console.log(error),
      complete: () => { 
        this.loadCategories();
        this.closePopup();
      }
    });
  }
  deleteCategory(id: any) {
    if (window.confirm('Are you sure, you want to delete this record?')) {
      this.categoryService.deleteCategory(id).subscribe((data: {}) => {
        this.loadCategories();
      });
    }
  }
}
