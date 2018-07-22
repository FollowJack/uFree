import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,MatCheckboxModule,MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { AuthService } from './auth/auth.service';
import { ContractService } from './contract/contract.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { ApplicationComponent } from './application/application.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    ApplicationComponent,
    ConfirmationComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    AuthService,
    ContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
