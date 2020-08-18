import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  loginForm: FormGroup;
  passwordFieldType: string = 'password';

  ngOnInit(): void {    
  }

  async login() {
    try {
      var response: any = await this.authService.login(
        this.loginForm.get('user').value,
        this.loginForm.get('password').value
      );
      if (response?.success) {
        const { Token } = response.success;
        localStorage.setItem('token', Token);
        this.authService.autenticated$.emit();
        this.router.navigate(['/']);
      }
    } catch (error) {
      alert('Credenciales Incorrectas');
    }
  }

  mostrarContrasena(): void {
    if (this.passwordFieldType == 'password') {
      this.passwordFieldType = 'text';
    } else {
      this.passwordFieldType = 'password';
    }
  }
}
