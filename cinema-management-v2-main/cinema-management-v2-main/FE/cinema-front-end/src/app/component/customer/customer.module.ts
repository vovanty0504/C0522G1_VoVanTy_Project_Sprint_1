import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomPipe} from '../decentralization/util/custom-pipe';







@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerEditComponent,
    CustomPipe,
  ],
  exports: [
    CustomPipe
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class CustomerModule { }
