import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PromotionCreateComponent} from './promotion-create/promotion-create.component';
import {PromotionEditComponent} from './promotion-edit/promotion-edit.component';
import {PromotionListComponent} from './promotion-list/promotion-list.component';
import {AuthGuard} from '../decentralization/auth.guard';

const routes: Routes = [
  {
    path: 'list', component: PromotionListComponent
  },
  {
    path: 'create', component: PromotionCreateComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_EMPLOYEE']
    }
  },
  {
    path: 'edit/:id', component: PromotionEditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_EMPLOYEE']
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule {
}
