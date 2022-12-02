import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PromotionRoutingModule} from './promotion-routing.module';
import {PromotionCreateComponent} from './promotion-create/promotion-create.component';
import {PromotionEditComponent} from './promotion-edit/promotion-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PromotionListComponent} from './promotion-list/promotion-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomerModule} from '../customer/customer.module';


@NgModule({
  declarations: [
    PromotionCreateComponent,
    PromotionEditComponent,
    PromotionListComponent,
  ],
    imports: [
        CommonModule,
        PromotionRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbPaginationModule,
        CustomerModule
    ]
})
export class PromotionModule {
}
