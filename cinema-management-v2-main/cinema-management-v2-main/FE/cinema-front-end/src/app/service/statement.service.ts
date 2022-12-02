import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import {IMovieStatementDto} from '../dto/i-movie-statement-dto';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private httpClient: HttpClient) {
  }

  listMovieTop(numberMonth: number): Observable<Array<IMovieStatementDto>> {

    const URL = environment.api_url + '/movie/statement?numberMonth=' + (numberMonth);
    return this.httpClient.get<Array<IMovieStatementDto>>(URL);
  }

  listCustomerTop(numberMonth: number): Observable<Array<IMovieStatementDto>> {
    const URL = environment.api_url + '/customer/statement?numberMonth=' + (numberMonth);
    console.log(URL);

    return this.httpClient.get<Array<IMovieStatementDto>>(URL);
  }
}
