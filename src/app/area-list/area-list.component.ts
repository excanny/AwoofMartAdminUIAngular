import { Component, OnInit } from '@angular/core';
import { AreaService, CityService } from '../_services';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {

  cities: any = [];
  areas: any = [];
  area: any = {};
  id: any = {};
  constructor(private formBuilder: FormBuilder, private areaService: AreaService, private cityService: CityService, public router: Router) { }

  ngOnInit(): void {
    this.loadAreas();
    this.loadCities();
  }

  editAreaForm = this.formBuilder.group({
    area_name: ['', Validators.required],
    city_id: ['', Validators.required],
    description: ['', Validators.required]
  });


  loadAreas() {
    return this.areaService.getAreas().subscribe((data: {}) => {
      this.areas = data;
      console.log(data)
    });
  }

  loadCities() {
    return this.cityService.getCities().subscribe((data: {}) => {
      this.cities = data;
      console.log(data)
    });
  }

  displayStyle = "none";
  
  openPopup(id:any) {
    this.displayStyle = "block";
    this.areaService.getArea(id).subscribe((data: {}) => {
      this.area = data;
      this.id = id;
      console.log(data)

      this.editAreaForm.patchValue({
        area_name: this.area.data.area_name,
        city_id: this.area.data.city_id,
        description: this.area.data.description
      });
      //console.log(this.id);
    })

    //alert("hi")
  }
  
  closePopup() {
    this.displayStyle = "none";
  }

  updateArea() {
    this.areaService.updateArea(this.id, this.editAreaForm.value)
    .subscribe({
      next: (response) => console.log(response), 
      error: (error) => console.log(error),
      complete: () => { 
        //console.log('getSomething completed!');
        //location.reload();
        this.loadAreas();
        this.closePopup();
      }
    });
  }

  deleteArea(id: any) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.areaService.deleteArea(id).subscribe((data: {}) => {
        this.loadAreas();
      });
    }
  }

}
