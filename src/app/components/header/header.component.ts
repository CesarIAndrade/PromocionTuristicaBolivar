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
    if(localStorage.getItem('token')){
      this.logged = false;
    }
    this.authService.autenticated$.subscribe(() => {
      this.logged = false;
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout().then(ok => {
      this.logged = true;
      localStorage.clear();
    })
  }
}
