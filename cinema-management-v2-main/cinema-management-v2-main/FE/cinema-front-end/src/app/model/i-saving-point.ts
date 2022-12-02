import {ICustomer} from './i-customer';

export interface ISavingPoint {
  id?: number;
  point?: string;
  dayBooking?: string;
  customer?: ICustomer;
}
