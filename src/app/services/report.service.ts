// src/app/services/report.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

export interface Report {
  title: string;
  description: string;
  category: string;
  imageUrls: string[];
  geolocation: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // Add report to Firestore
  addReport(report: Report): Promise<void> {
    const reportId = this.firestore.createId(); // Generate a unique ID for the report
    return this.firestore.collection('reports').doc(reportId).set(report);
  }

  uploadImages(files: File[]): Observable<string[]> {
    const uploadPromises: Observable<string>[] = files.map((file) => {
      const filePath = `reports/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      return task
        .snapshotChanges()
        .pipe(
          finalize(() => fileRef.getDownloadURL()), // Wait for the file to be fully uploaded
          switchMap(() => fileRef.getDownloadURL()) // Then fetch the download URL
        );
    });
  
    // Combine all observables to return an array of image URLs
    return forkJoin(uploadPromises); // Combine all the observables and return as one observable
  }
  

  // Get reports from Firestore
  getReports(): Observable<Report[]> {
    return this.firestore.collection<Report>('reports').valueChanges();
  }
}
