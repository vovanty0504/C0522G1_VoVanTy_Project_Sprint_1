import {IUser} from './i-user';
import {IRole} from './i-role';

export interface IUserRole {
  user: IUser;
  role: IRole;
}
