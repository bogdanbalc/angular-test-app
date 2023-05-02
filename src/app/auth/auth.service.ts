import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Mock login method
  login(username: string, password: string): Observable<boolean> {
    if (username === 'test' && password === 'test') {
      localStorage.setItem('isLoggedIn', 'true');
      // Return an Observable of true to indicate successful login
      // add a delay to simulate server response
      return of(true).pipe(delay(250));
    } else {
      // Return an Observable of false to indicate failed login
      // add a delay to simulate server response
      return of(false).pipe(delay(250));
    }
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Mock logout method
  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }
}
