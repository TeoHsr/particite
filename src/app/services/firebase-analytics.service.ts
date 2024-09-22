import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAnalyticsService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {
    if (isPlatformBrowser(this.platformId) && environment.useAnalytics) {
      this.ngZone.runOutsideAngular(() => this.loadFirebaseAnalytics());
    }
  }
  

  private async loadFirebaseAnalytics(): Promise<void> {
    const { initializeApp } = await import('firebase/app');
    const { getAnalytics, isSupported } = await import('firebase/analytics');

    // Check if analytics is supported before initializing
    const analyticsSupported = await isSupported();

    if (analyticsSupported) {
      const app = initializeApp(environment.firebaseConfig);
      const analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized:', analytics);
    } else {
      console.warn('Firebase Analytics is not supported in this environment');
    }
  }
}
