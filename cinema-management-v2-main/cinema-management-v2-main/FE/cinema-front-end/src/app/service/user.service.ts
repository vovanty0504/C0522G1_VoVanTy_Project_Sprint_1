import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../model/i-user';
import {environment} from '../../environments/environment';

import {UserDto} from '../dto/user-dto';
import {TokenStorageService} from './token-storage.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:8080/api/public/user';
  private FIND_USERNAME_URL = 'http://localhost:8080/api/public/';

  httpOptions: any;

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  editUser(user: UserDto): Observable<any> {
    return this.http.patch<any>(environment.api_url + 'user/edit', user, this.httpOptions);
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseURL);
  }

  showUsername(): Observable<any> {
    return this.http.get<any>(this.FIND_USERNAME_URL + 'findUsername', this.httpOptions);
  }
}
