import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-test-app';
  items: MenuItem[] = [];
  layout = '';

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    const isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      { label: 'Home', routerLink: '/' },
      { label: 'New Product', routerLink: '/new-product' },
      { label: 'Sales', routerLink: '/sales' },
    ];
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route: ActivatedRoute) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        mergeMap((route: ActivatedRoute) => route.data)
      )
      .subscribe((data) => {
        this.layout = data['layout'];
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
