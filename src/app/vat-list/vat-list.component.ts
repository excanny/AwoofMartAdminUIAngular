import { Component, OnInit } from '@angular/core';
import { VatService } from '../_services';
import { Vat } from '../_models';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vat-list',
  templateUrl: './vat-list.component.html',
  styleUrls: ['./vat-list.component.css']
})
export class VatListComponent implements OnInit {

  vat: any = {};
  constructor(private formBuilder: FormBuilder, private vatService: VatService, public router: Router) { }

  ngOnInit(): void {
    this.loadVats();
    console.log(this.editVatForm.value)
  }

  editVatForm = this.formBuilder.group({
    vat: [0]
  });

  loadVats() {
    return this.vatService.getVats().subscribe((data: Vat) => {
      this.vat = data.vat_value;
      console.log(data)

      this.editVatForm.patchValue({
        vat: data.vat_value,
      });
    });
  }

  updateVat() {
    
      // this.vatService.updateVat(this.id, this.Vat).subscribe(data => {
      //   this.router.navigate(['/dashboard/Vats'])
      // })

      this.loadVats();
       
    
  }
}
