import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TicketManagementListComponent} from './ticket-management/ticket-management-list/ticket-management-list.component';
import {TicketManagementDeleteComponent} from './ticket-management/ticket-management-delete/ticket-management-delete.component';
import {PaymentBookingTicketComponent} from './payment-booking-ticket/payment-booking-ticket.component';
import {ConfirmBookingTicketComponent} from './confirm-booking-ticket/confirm-booking-ticket.component';
import {BookingTicketComponent} from './booking-ticket/booking-ticket.component';
import {BookingSeatComponent} from './booking-seat/booking-seat.component';
import {HistoryPointListComponent} from './history-point-list/history-point-list.component';
import {BookingTicketListComponent} from './booking-ticket-list/booking-ticket-list.component';
import {CanceledTicketListComponent} from './canceled-ticket-list/canceled-ticket-list.component';
import {AuthGuard} from '../decentralization/auth.guard';

const routes: Routes = [
  {
    path: 'booking-ticket',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    }, component: BookingTicketComponent
  },
  {
    path: 'booking-seat',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    },
    component: BookingSeatComponent
  },
  {
    path: 'payment-ticket',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    },
    component: PaymentBookingTicketComponent
  },
  {
    path: 'confirm-ticket',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    }, component: ConfirmBookingTicketComponent
  },
  {
    path: 'list-management',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_EMPLOYEE']
    },
    component: TicketManagementListComponent
  },
  {
    path: 'delete-management',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_EMPLOYEE']
    },
    component: TicketManagementDeleteComponent
  },
  {
    path: 'history/point',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    },
    component: HistoryPointListComponent
  },
  {
    path: 'history/booking',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    },
    component: BookingTicketListComponent
  },
  {
    path: 'history/canceled',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    },
    component: CanceledTicketListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
