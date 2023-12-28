import { Component, } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide = true;
  loginForm: FormGroup;
  responseMsg: string = '';

  constructor(private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]),
    });
  }

  login() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.api.login(loginInfo).subscribe({
      next: (res: any) => {
        if (res.toString() === 'Invalid')
          this.responseMsg = 'Invalid Credentials!';
        else {
          this.responseMsg = 'Login Successful';
          this.api.saveToken(res.toString());
          let isActive = this.api.getTokenUserInfo()?.active ?? false;
          if(isActive)  this.router.navigateByUrl("/books/library");
          else 
          {
            this.responseMsg = "You are not active!!!";
            this.api.deleteToken();
          }
        }
      },
      error: (err: any) => {
        console.log('Error');
        console.log(err);
      },
    });
  }

  getEmailErrors() {
    if (this.Email.hasError('required')) return 'Email is required!';
    if (this.Email.hasError('email')) return 'Email is invalid.';
    return '';
  }
  getPasswordErrors() {
    if (this.Password.hasError('required')) return 'Password is required!';
    if (this.Password.hasError('minlength'))
      return 'Minimum 8 characters are required!';
    if (this.Password.hasError('maxlength'))
      return 'Maximum 15 characters are allowed!';
    return '';
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}

