import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {EditCustomerUserComponent} from './edit-customer-user/edit-customer-user.component';
import {AuthGuard} from '../decentralization/auth.guard';

const routes: Routes = [
  {
    path: 'signup', component: CreateCustomerComponent
  },
  {
    path: 'info', component: EditCustomerUserComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
