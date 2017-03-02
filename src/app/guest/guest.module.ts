import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  imports: [
    SharedModule,
    GuestRoutingModule,
  ],
  declarations: [
    GuestComponent, 
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent,
  ]
})
export class GuestModule { }
