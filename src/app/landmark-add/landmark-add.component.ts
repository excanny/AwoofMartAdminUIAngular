import { Component, OnInit } from '@angular/core';
import { LandmarkService, CityService, AreaService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landmark-add',
  templateUrl: './landmark-add.component.html',
  styleUrls: ['./landmark-add.component.css']
})
export class LandmarkAddComponent implements OnInit {

  addLandmarkForm = this.fb.group({
    landmark_name: ['', Validators.required],
    city_id: ['', Validators.required],
    area_id: ['', Validators.required],
    description: ['', Validators.required],
    
});

cities: any = [];
areas: any = [];
//areas: {};
constructor(private cityService: CityService, private areaService: AreaService, private fb: FormBuilder, private LandmarkService: LandmarkService, public router: Router) {}

ngOnInit(): void {
  this.loadCities();
}

loadCities() {
  return this.cityService.getCities().subscribe((data: {}) => {
    this.cities = data;
    console.log(data)
  });
}

onChangeCity(event:any) {
  return this.areaService.getAreasByCityId(event.value).subscribe((data: {}) => {
    this.areas = data;
    console.log(data)
  });
}

onSubmit():void{
  //console.warn(this.loginForm.value);
    this.LandmarkService.createLandmark(this.addLandmarkForm.value).subscribe((data: {}) => {
      //if(data.status)
      this.router.navigate(['/dashboard/landmarks']);
      //console.log(data.status);
    });
}

}
