import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecentralizationRoutingModule } from './decentralization-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ConfirmResetPasswordComponent} from './confirm-reset-password/confirm-reset-password.component';
import {FocusInvalidInputDirective} from './util/focus-invalid-input.directive';



@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ConfirmResetPasswordComponent, FocusInvalidInputDirective],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    ConfirmResetPasswordComponent
  ],
  imports: [
    CommonModule,
    DecentralizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class DecentralizationModule { }
