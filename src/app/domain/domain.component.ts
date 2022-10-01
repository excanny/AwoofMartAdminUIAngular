import { Component, OnInit } from '@angular/core';
import { DomainService } from '../_services';
import { Router } from '@angular/router';
import { Domain } from '../_models';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  domains: any = [];
  domain: any = {};
  id: any = {};
  constructor(private formBuilder: FormBuilder, private domainService: DomainService, public router: Router) { }

  ngOnInit(): any {
    this.loadDomains();
  }

  editDomainForm = this.formBuilder.group({
    domain_name: ['']
  });

  loadDomains() {
    return this.domainService.getDomains().subscribe((data: {}) => {
      this.domains = data;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {
    this.displayStyle = "block";
    this.domainService.getDomain(id).subscribe((data: {}) => {
      this.domain = data;
      this.id = id;
      console.log(data)

      this.editDomainForm.patchValue({
        domain_name: this.domain.data.domain_name
      });

    })
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  updateDomain() {
    this.domainService.updateDomain(this.id, this.editDomainForm.value).subscribe((data: {}) => {
        this.loadDomains();
        this.closePopup();
      });
  }

  deleteDomain(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.domainService.deleteDomain(id).subscribe((data: {}) => {
        this.loadDomains();
      });
    }
  }
}
