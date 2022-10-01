import { Component, OnInit } from '@angular/core';
import { DomainService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-domain-add',
  templateUrl: './domain-add.component.html',
  styleUrls: ['./domain-add.component.css']
})
export class DomainAddComponent implements OnInit {
  addDomainForm = this.formBuilder.group({
      domain_name: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private domainService: DomainService, public router: Router) {}

  ngOnInit(): void {
  }

  onSubmit():void{
    //console.warn(this.loginForm.value);
      this.domainService.createDomain(this.addDomainForm.value).subscribe((data: {}) => {
        //if(data.status)
        this.router.navigate(['/dashboard/domains']);
        //console.log(data.status);
      });
  }
}
