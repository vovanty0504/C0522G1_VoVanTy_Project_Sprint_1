
import {ICustomerType} from './i-customer-type';
import {IUser} from './i-user';


export interface ICustomer {
  id?: number;
  name?: string;
  dayOfBirth?: string;
  gender?: number;
  idCard?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  user?: IUser;
  customerType?: ICustomerType;
}
