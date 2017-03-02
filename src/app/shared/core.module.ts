import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { DeisService } from './deis.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  imports: [ CommonModule ],
  exports: [],
  declarations: [],
  providers: [
    UserService,
    DeisService,
    AuthGuardService
  ],
})
export class CoreModule {
}
