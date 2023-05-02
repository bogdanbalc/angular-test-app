import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/welcome']);
    }
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (result) => {
          if (result) {
            console.log('Login successful');
            this.router.navigate(['/welcome']);
          } else {
            console.log('Login failed');
            this.errorMessage = 'Invalid username or password';
          }
        },
        error: (error) => {
          console.error('Error logging in', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
