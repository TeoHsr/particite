import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string; // You can change this to Date or Timestamp in the future
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  // Add a new user to the Firestore 'users' collection
  addUser(user: User): Promise<void> {
    const userId = this.firestore.createId();
    return this.firestore.collection('users').doc(userId).set(user);
  }

  // Get all users from the Firestore
  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges();
  }

  // Get a single user by their ID
  // Get a specific user from Firestore
getUser(userId: string): Observable<User | undefined> {
  return this.firestore
    .collection<User>('users')
    .doc(userId)
    .valueChanges()
    .pipe(
      map((user: User | undefined) => {
        if (user) {
          return user;
        } else {
          console.warn(`User with ID ${userId} not found.`);
          return undefined;
        }
      })
    );
}


  // Update user information in Firestore
  updateUser(userId: string, user: Partial<User>): Promise<void> {
    return this.firestore.collection('users').doc(userId).update(user);
  }

  // Delete a user from Firestore
  deleteUser(userId: string): Promise<void> {
    return this.firestore.collection('users').doc(userId).delete();
  }
}
