import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DateFormatPipe,
  ],
  declarations: [
    DateFormatPipe,
  ],
})
export class SharedModule {
}
