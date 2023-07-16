import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageRoutingModule } from './login-routing.module';
// import { TokenInterceptorService } from '../services/token-interceptor.service';
import { LoginPage } from './login.page';
import { InputModule } from '../components/input/input.module';

@NgModule({
  imports: [
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    InputModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
