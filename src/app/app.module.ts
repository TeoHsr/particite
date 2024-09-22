import { Inject, NgModule, NgZone, PLATFORM_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatToolbarModule } from '@angular/material/toolbar';
import { isPlatformBrowser } from '@angular/common';
import { FirebaseAnalyticsService } from './services/firebase-analytics.service';
import { RegisterComponent } from './components/register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function firebaseAnalyticsFactory(platformId: Object, ngZone: NgZone) {
  if (isPlatformBrowser(platformId) && environment.useAnalytics) {
    return new FirebaseAnalyticsService(platformId, ngZone);
  }
  return null; // Return null if not in the browser
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ReportFormComponent,
    ReportListComponent,
    MapViewComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    AuthGuard,
    AuthService,
    {
      provide: FirebaseAnalyticsService,
      useFactory: firebaseAnalyticsFactory,
      deps: [PLATFORM_ID, NgZone], // Add both PLATFORM_ID and NgZone
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
