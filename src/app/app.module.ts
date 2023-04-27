import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { TestResultComponent } from './pages/test-result/test-result.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {HttpClientModule} from "@angular/common/http";
import { TakingTestComponent } from './pages/taking-test/taking-test.component';
import { QuestionContainerComponent } from './components/question-container/question-container.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";

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
    TestResultComponent,
    AboutUsComponent,
    HomePageComponent,
    TakingTestComponent,
    QuestionContainerComponent,
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
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
