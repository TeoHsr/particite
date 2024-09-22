import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Check if user is logged in
  isLoggedIn$(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user) // Returns true if user is logged in
    );
  }

  // Register a new user with email and password
  register(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Registration successful');
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  }

  // Log in user
  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/report-list']);
      })
      .catch(error => {
        console.error('Login error:', error);
      });
  }

  // Log out user
  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user) // True if user is logged in
    );
  }
}
