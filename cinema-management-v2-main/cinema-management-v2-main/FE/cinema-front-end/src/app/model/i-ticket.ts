import {ICustomer} from './i-customer';
import {ISeatDetail} from './i-seat-detail';
import {IShowTimes} from './i-show-times';

export interface ITicket {
  id?: number;
  statusTicket?: number;
  customer?: ICustomer;
  seatDetail?: ISeatDetail;
  ticketBookingTime?: string;
}
