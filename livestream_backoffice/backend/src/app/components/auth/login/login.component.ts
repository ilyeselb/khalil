import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { user } from 'src/app/shared/data/user';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public user : user
  constructor(private formBuilder: FormBuilder , public authentication : AuthenticationService , public router : Router) {
    this.createLoginForm();
    this.createRegisterForm();
    this.user = new user()
  }

  

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
    })
  }


  ngOnInit() {
  }

  onSubmit() {
    this.authentication.login(this.user.email , this.user.password).subscribe(data => {
try {
  this.router.navigate(['home'])

} catch (error) {
  alert('password or username incorrect')

}

    })
  }

}
