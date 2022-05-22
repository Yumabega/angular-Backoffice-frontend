import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from '@shared/components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './services/login/storage.service';
import { AuthorizatedGuard } from './guards/authentication/authorizated.guard';
import { fakeBackendProvider } from './http/interceptor/fake-backend.interceptor';
import { RecepcionModule } from '@modules/recepcion/recepcion.module';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, RecepcionModule],
  providers: [StorageService, AuthorizatedGuard, fakeBackendProvider, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
