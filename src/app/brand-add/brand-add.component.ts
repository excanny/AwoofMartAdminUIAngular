import { Component, OnInit } from '@angular/core';
import { BrandService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  addBrandForm = this.fb.group({
    brand_name: ['', Validators.required]
});

constructor(private fb: FormBuilder, private brandService: BrandService, public router: Router) {}

ngOnInit(): void {
}

onSubmit():void{
    console.warn(this.addBrandForm.value);
      this.brandService.createBrand(this.addBrandForm.value).subscribe((data: {}) => {
      //if(data.status)
      this.router.navigate(['/dashboard/brands']);
      //console.log(data.status);
    });
 }
}
