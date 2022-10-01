import { Component, OnInit } from '@angular/core';
import { PackagingCostService } from '../_services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-packagingcost-list',
  templateUrl: './packagingcost-list.component.html',
  styleUrls: ['./packagingcost-list.component.css']
})
export class PackagingcostListComponent implements OnInit {

  packagingCosts: any = [];
  packagingCost: any = {};
  id: any = {};
  constructor(private formBuilder: FormBuilder, private packagingCostService: PackagingCostService, public router: Router) { }

  ngOnInit(): void {
    this.loadPackagingCosts();
  }

  editPackagingCostForm = this.formBuilder.group({
    packagingCost_name: ['']
  });


  loadPackagingCosts() {
    return this.packagingCostService.getPackagingCosts().subscribe((data: {}) => {
      this.packagingCosts = data;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {
    this.displayStyle = "block";
    this.packagingCostService.getPackagingCost(id).subscribe((data: {}) => {
      this.packagingCost = data;
      this.id = id;
      console.log(data)

      this.editPackagingCostForm.patchValue({
        packagingCost_name: this.packagingCost.data.packagingCost_name
      });

      //console.log(this.id);
    })
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  updatePackagingCost() {
    this.packagingCostService.updatePackagingCost(this.id, this.editPackagingCostForm.value)
    .subscribe({
      next: (response) => console.log(response), 
      error: (error) => console.log(error),
      complete: () => { 
        this.loadPackagingCosts();
        this.closePopup();
      }
    });
  }
  deletePackagingCost(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.packagingCostService.deletePackagingCost(id).subscribe((data: {}) => {
        this.loadPackagingCosts();
      });
    }
  }
}
