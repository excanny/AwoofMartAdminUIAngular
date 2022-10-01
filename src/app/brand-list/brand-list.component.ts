import { Component, OnInit } from '@angular/core';
import { BrandService } from '../_services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: any = [];
  brand: any = {};
  id: any = {};
  constructor(private formBuilder: FormBuilder, private brandService: BrandService, public router: Router) { }

  ngOnInit(): void {
    this.loadBrands();
  }

  editBrandForm = this.formBuilder.group({
    brand_name: ['', Validators.required]
  });


  loadBrands() {
    return this.brandService.getBrands().subscribe((data: {}) => {
      this.brands = data;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {
    this.displayStyle = "block";
    this.brandService.getBrand(id).subscribe((data: {}) => {
      this.brand = data;
      this.id = id;
      console.log(data)

      this.editBrandForm.patchValue({
        brand_name: this.brand.data.brand_name
      });

      //console.log(this.id);
    })
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  updateBrand() {
    this.brandService.updateBrand(this.id, this.editBrandForm.value)
    .subscribe({
      next: (response) => console.log(response), 
      error: (error) => console.log(error),
      complete: () => { 
        this.loadBrands();
        this.closePopup();
      }
    });
  }

  deleteBrand(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.brandService.deleteBrand(id).subscribe((data: {}) => {
        this.loadBrands();
      });
    }
  }

}
