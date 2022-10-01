import { Component, OnInit } from '@angular/core';
import { CategoryService, DomainService } from '../_services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  addCategoryForm = this.formBuilder.group({
    category_name: ['', Validators.required],
    domain_id: ['', Validators.required],
    description: ['', Validators.required],
    parent_id: [null, Validators.required],
    allow_merchant_upload: [null],
    category_image_name: [null, Validators.required],
});

  categories: any = [];
  domains: any = [];
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private domainService: DomainService, private categoryService: CategoryService, public router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadDomains();
  }

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

  onFileChange(event:any) {
    
      const file = event.target.files[0];
      this.addCategoryForm.patchValue({
        category_image_name: file
      });

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const height = img.naturalHeight;
          const width = img.naturalWidth;
          console.log('Width and Height', width, height);
        };

      }

      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // console.log(reader);
      //reader.onload = () => {
        // const img = new Image();
        // img.src = reader.result as string;
        // img.onload = () => {
        //   const height = img.naturalHeight;
        //   const width = img.naturalWidth;
        //   console.log('Width and Height', width, height);
        // };
      //};
  }

  onSubmit() {
      this.categoryService.createCategory(
          this.addCategoryForm.get('category_name')?.value!,
          this.addCategoryForm.get('domain_id')?.value!,
          this.addCategoryForm.get('description')?.value!,
          this.addCategoryForm.get('parent_id')?.value!,
          this.addCategoryForm.get('allow_merchant_upload')?.value!,
          this.addCategoryForm.get('category_image_name')?.value!
      ).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error)
      });

      this.loadCategories();

      this.router.navigate(['/dashboard/categories']);

     //console.log(JSON.stringify(this.addCategoryForm.value))
  }
}

