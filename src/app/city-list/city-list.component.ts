import { Component, OnInit } from '@angular/core';
import { CityService } from '../_services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  cities: any = [];
  city: any = {};
  id: any = {};
  constructor(private formBuilder: FormBuilder, private cityService: CityService, public router: Router) { }

  ngOnInit(): void {
    this.loadCities();
  }

  editCityForm = this.formBuilder.group({
    city_name: ['', Validators.required],
    description: ['', Validators.required]
  });

  loadCities() {
    return this.cityService.getCities().subscribe((data: {}) => {
      this.cities = data;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {

    this.displayStyle = "block";
    this.cityService.getCity(id).subscribe((data: {}) => {
      this.city = data;
      this.id = id;
      console.log(data)

      this.editCityForm.patchValue({
        city_name: this.city.data.city_name,
        description: this.city.data.description,
      });

      //console.log(this.id);
    })
    //alert("hi")
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  updateCity() {
    this.cityService.updateCity(this.id, this.editCityForm.value)
    .subscribe({
      next: (response) => console.log(response), 
      error: (error) => console.log(error),
      complete: () => { 
        this.loadCities();
        this.closePopup();
      }
    });
  }
  deleteCity(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.cityService.deleteCity(id).subscribe((data: {}) => {
        this.loadCities();
      });
    }
  }

}
