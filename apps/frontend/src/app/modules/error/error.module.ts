import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { ErrorRoutingModule } from './error-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
