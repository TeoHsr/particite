import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = ''; // Add this property to store error messages

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] // Set min length validator
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService.register(email, password)
        .then(() => {
          console.log('User registered successfully');
          this.errorMessage = ''; // Clear any previous error
        })
        .catch((error) => {
          this.handleError(error);
        });
    } else {
      this.errorMessage = 'Please fill out all fields correctly'; // Display form validation error
    }
  }

  handleError(error: any) {
    // Check Firebase error codes and set appropriate error messages
    switch (error.code) {
      case 'auth/weak-password':
        this.errorMessage = 'Password should be at least 6 characters long';
        break;
      case 'auth/email-already-in-use':
        this.errorMessage = 'The email address is already in use by another account';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'The email address is invalid';
        break;
      default:
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
    }
  }
}
