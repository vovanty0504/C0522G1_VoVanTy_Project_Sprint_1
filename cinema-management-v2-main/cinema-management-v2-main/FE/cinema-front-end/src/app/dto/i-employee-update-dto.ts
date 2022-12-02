import {User} from './user';

export interface IEmployeeUpdateDto {
  id?: number;
  name?: string;
  gender?: number;
  email?: string;
  address?: string;
  phoneNumber?: string;
  user?: User;
  idCard?: string;
  dayOfBirth?: string;
  image?: string;
  passwordNew?: string;
}
