import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './shared/core.module';
import { HttpInterceptor } from './shared/http.interceptor';
import { SessionService } from './shared/session.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GuestModule } from './guest/guest.module';
import { ApplicationsModule } from './applications/applications.module';
import { LogoutComponent } from './logout/logout.component';

export function httpFactory(backend, defaultOptions, SessionService): HttpInterceptor {
  return new HttpInterceptor(backend, defaultOptions, SessionService);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    GuestModule,
    ApplicationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    // I wanted to put this in CoreModule, but it doesn't run :(
    SessionService,
    {
      provide: Http,
      deps: [XHRBackend, RequestOptions, SessionService],
      useFactory: httpFactory,
    }
  ]
})
export class AppModule { }
