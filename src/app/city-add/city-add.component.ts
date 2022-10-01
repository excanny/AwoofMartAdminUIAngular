import { Component, OnInit } from '@angular/core';
import { CityService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css']
})
export class CityAddComponent implements OnInit {
  
  addCityForm = this.fb.group({
    city_name: ['', Validators.required],
    description: ['', Validators.required]
});

constructor(private fb: FormBuilder, private CityService: CityService, public router: Router) {}

ngOnInit(): void {
}

onSubmit():void{
  //console.warn(this.loginForm.value);
    this.CityService.createCity(this.addCityForm.value).subscribe((data: {}) => {
      //if(data.status)
      this.router.navigate(['/dashboard/cities']);
      //console.log(data.status);
    });
}

}
