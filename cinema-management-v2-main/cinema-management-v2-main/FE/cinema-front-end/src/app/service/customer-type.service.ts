import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICustomerType} from '../model/i-customer-type';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  URL_API = 'http://localhost:8080/api/customer';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ICustomerType[]> {
    return this.http.get<ICustomerType[]>(this.URL_API + '/customerType');
  }
}
