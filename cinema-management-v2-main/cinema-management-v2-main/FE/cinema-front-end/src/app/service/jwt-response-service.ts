import {IUser} from '../model/i-user';

export class JwtResponseService {

  token: string;
  user: IUser;
  username: string;

  constructor(token: string) {
    this.token = token;
  }
}
