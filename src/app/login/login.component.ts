import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, public router: Router) {}
  public loading: boolean = false;

  ngOnInit(): void {}

  onSubmit():void{
    //console.warn(this.loginForm.value);
      this.loading = true;
      this.authenticationService.adminlogin(this.loginForm.value).subscribe((data: any) => {
        //this.router.navigate(['/#/dashboard/home']);
        //alert("hi");
        //console.log(data.admin.first_name);
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('first_name', data.admin.first_name)
        window.location.href = '/admin/#/dashboard/home';
        this.loading = true;
      });
  }

}
