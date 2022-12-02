import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRole} from '../model/i-role';


export class RoleService {
  private baseURL = 'http://localhost:8080/api/public/role';
  constructor(
    private http: HttpClient
  ) {
  }
  findAll(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.baseURL);
  }
}
