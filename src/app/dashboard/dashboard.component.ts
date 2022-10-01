import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  get first_name(): any {
    return localStorage.getItem('first_name');
  }

  logout(): any {
    localStorage.removeItem("first_name");
    localStorage.removeItem("access_token");

    //this.authenticationService.logout().subscribe((data: any) => {
      //this.router.navigate(['/dashboard/home']);
      //alert("hi");
      //console.log(data.admin.first_name);
      
    //});
  }
}
