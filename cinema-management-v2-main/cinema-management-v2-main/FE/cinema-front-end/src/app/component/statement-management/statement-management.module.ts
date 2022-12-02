import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { StatementManagementRoutingModule } from './statement-management-routing.module';
import { MovieStatementComponent } from './movie-statement/movie-statement.component';
import { CustomerStatementComponent } from './customer-statement/customer-statement.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import {NgApexchartsModule} from 'ng-apexcharts';

@NgModule({

  declarations: [
    MovieStatementComponent,
    CustomerStatementComponent,
    ErrorComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        StatementManagementRoutingModule,
        NgApexchartsModule
    ]
})
export class StatementManagementModule { }
