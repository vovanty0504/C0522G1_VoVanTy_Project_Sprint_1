import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IUser} from '../model/i-user';
import {JwtResponseService} from './jwt-response-service';

const AUTH_API = 'http://localhost:8080/api/public/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions: any;
  isLoggedIn: boolean | undefined;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(obj: { username: string; password: string; }): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: obj.username,
      password: obj.password
    }, this.httpOptions);
  }

  forgotPassword(email): Observable<any> {
    return this.http.get(AUTH_API + 'forgot-password?email=' + email, this.httpOptions);
  }
  resetPassword(resetPassRequest): Observable<any> {
    return this.http.post(AUTH_API + 'comfirm-reset-password', {
      password: resetPassRequest.password,
      confirmPassword: resetPassRequest.confirmPassword,
      token: resetPassRequest.token
    }, this.httpOptions);
  }

  sendLogin(user: IUser): Observable<JwtResponseService> {
    return this.http.post<JwtResponseService>(AUTH_API + '/login', user, httpOptions);
  }

  google(jwtResponse: JwtResponseService): Observable<JwtResponseService> {
    return this.http.post<JwtResponseService>(AUTH_API + '/oauth/google', jwtResponse, httpOptions);
  }

}
