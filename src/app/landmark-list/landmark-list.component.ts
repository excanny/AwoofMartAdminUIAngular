import { Component, OnInit } from '@angular/core';
import { LandmarkService, AreaService, CityService } from '../_services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landmark-list',
  templateUrl: './landmark-list.component.html',
  styleUrls: ['./landmark-list.component.css']
})
export class LandmarkListComponent implements OnInit {

  cities: any = [];
  areas: any = [];
  landmarks: any = [];
  city: any = {};
  area: any = {};
  landmark: any = {};
  id: any = {};
  constructor(private formBuilder: FormBuilder, private cityService: CityService, private areaService: AreaService, private landmarkService: LandmarkService, public router: Router) { }

  ngOnInit(): void {
    this.loadCities();
    this.loadAreas();
    this.loadLandmarks();
  }

  editLandmarkForm = this.formBuilder.group({
    landmark_name: ['', Validators.required],
    city_id: ['', Validators.required],
    area_id: ['', Validators.required],
    description: ['', Validators.required],
  });

  loadCities() {
    return this.cityService.getCities().subscribe((data: {}) => {
      this.cities = data;
      console.log(data)
    });
  }

  loadAreas() {
    return this.areaService.getAreas().subscribe((data: {}) => {
      this.areas = data;
      console.log(data)
    });
  }

  loadLandmarks() {
    return this.landmarkService.getLandmarks().subscribe((data: {}) => {
      this.landmarks = data;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {

     this.displayStyle = "block";
      this.landmarkService.getLandmark(id).subscribe((data: {}) => {
      this.landmark = data;
      this.id = id;
      console.log(data)

      this.editLandmarkForm.patchValue({
        landmark_name: this.landmark.data.landmark_name,
        city_id: this.landmark.data.city_id,
        area_id: this.landmark.data.area_id,
        description: this.landmark.data.description
      });

      //console.log(this.id);
    });

    //alert("Hi")
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  updateLandmark() {
    this.landmarkService.updateLandmark(this.id, this.editLandmarkForm.value)
    .subscribe({
      next: (response) => console.log(response), 
      error: (error) => console.log(error),
      complete: () => { 
        this.loadLandmarks();
        this.closePopup();
      }
    });
  }

  deleteLandmark(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.landmarkService.deleteLandmark(id).subscribe((data: {}) => {
        this.loadLandmarks();
      });
    }
  }

}
