import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './services/token-interceptor.service';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,FormsModule,HttpClientModule,
    ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ 
     provide: HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true
   }],
  bootstrap: [AppComponent],
})

export class AppModule {}
