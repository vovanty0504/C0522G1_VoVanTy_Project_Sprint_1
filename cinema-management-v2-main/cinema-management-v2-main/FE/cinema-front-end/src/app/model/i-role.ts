import {IUserRole} from './i-user-role';


export interface IRole {
  id: number;
  name: string;
  userRoleList: IUserRole[];
}
