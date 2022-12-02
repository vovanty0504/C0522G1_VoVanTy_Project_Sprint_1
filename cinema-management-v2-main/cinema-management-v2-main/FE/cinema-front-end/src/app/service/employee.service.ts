import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEmployee} from '../model/i-employee';
import {SearchResult} from '../model/search-result';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_URL: string;


  constructor(private http: HttpClient) {
    this.API_URL = environment.api_url;
  }

  findAllEmployee(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.API_URL + '/employee/list');
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL + '/employee/delete/' + id);
  }

// tslint:disable-next-line:max-line-length
  paginate(page: number, limit: number, nameSearch: string, idCardSearch: string, phoneNumberSearch: string): Observable<SearchResult<IEmployee>> {
    console.log(nameSearch);
    return this.http.get<SearchResult<IEmployee>>(this.API_URL + '/employee/list?page='
      + (page - 1) + '&size=' + limit + '&name=' + nameSearch + '&idCard=' + idCardSearch + '&phoneNumber=' + phoneNumberSearch);
  }

  /*HUYDN*/
  addEmployee(employee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.API_URL + '/employee/create', employee);
  }

  getById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.API_URL + '/employee/' + id);
  }

  getUsername(username: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.API_URL + username);
  }

  updateEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.patch<IEmployee>(this.API_URL + '/employee/edit/' + employee.id, employee);
  }

}
