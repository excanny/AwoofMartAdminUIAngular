import { Component, OnInit } from '@angular/core';
import { AreaService, CityService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-add',
  templateUrl: './area-add.component.html',
  styleUrls: ['./area-add.component.css']
})
export class AreaAddComponent implements OnInit {

  
  addAreaForm = this.fb.group({
    area_name: ['', Validators.required],
    city_id: ['', Validators.required],
    description: ['', Validators.required]
});

cities: any = [];
constructor(private fb: FormBuilder, private areaService: AreaService, private cityService: CityService, public router: Router) {}

ngOnInit(): void {
  this.loadCities();
}

loadCities() {
  return this.cityService.getCities().subscribe((data: {}) => {
    this.cities = data;
    console.log(data)
  });
}


onSubmit():void{
  console.warn(this.addAreaForm.value);
    this.areaService.createArea(this.addAreaForm.value).subscribe((data: {}) => {
      //if(data.status)
      this.router.navigate(['/dashboard/areas']);
      //console.log(data.status);
    });
}
}
