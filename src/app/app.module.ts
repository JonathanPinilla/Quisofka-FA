import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FrequentlyAskedComponent } from './pages/frequently-asked/frequently-asked.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { StartTestComponent } from './pages/start-test/start-test.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavbarComponent,
    LoginComponent,
    FooterComponent,
    ContactUsComponent,
    FrequentlyAskedComponent,
    NotFoundComponent,
    StartTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
