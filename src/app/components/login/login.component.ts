import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  // Method to handle user login
  login() {
    this.authService.login(this.email, this.password).catch((error) => {
      console.error('Login error', error);
    });
  }
}
