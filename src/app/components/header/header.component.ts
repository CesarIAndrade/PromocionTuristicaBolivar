import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  logged: boolean = true;

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.logged = false;
      if (localStorage.getItem('userType') == '1') {
        this.buildNavTree('1');
      } else {
        this.buildNavTree('2');
      }
    } else {
      this.buildNavTree('');
    }
    this.authService.autenticated$.subscribe(() => {
      this.logged ? (this.logged = false) : (this.logged = true);
      if (localStorage.getItem('userType') == '1') {
        this.buildNavTree('1');
      } else {
        this.buildNavTree('2');
      }
    });
  }

  logout() {
    this.authService.logout().then((ok) => {
      localStorage.clear();
      this.authService.autenticated$.emit();
      this.buildNavTree('');
    });
    this.router.navigateByUrl('/');
  }

  buildNavTree(userType: string) {
    if (userType == '1') {
      return (this.navItems = [
        {
          route: 'Artículos',
          url: '/articles-list',
        },
        {
          route: 'Actividades',
          url: '/activities-list',
        },
        {
          route: 'Publicaciones',
          url: '/research-list',
        },
        {
          route: 'Usuarios',
          url: '/user-form',
        },
      ]);
    } else if(userType == '2') {
      return (this.navItems = [
        {
          route: 'Artículos',
          url: '/articles-list',
        },
        {
          route: 'Publicaciones',
          url: '/research-list',
        },
      ]);
    } else {
      return (this.navItems = [
        {
          route: 'Artículos',
          url: '/articles-list',
        },
        {
          route: 'Actividades',
          url: '/activities-list',
        },
        {
          route: 'Publicaciones',
          url: '/research-list',
        },
      ]);
    }
  }

  navItems = [];
}
