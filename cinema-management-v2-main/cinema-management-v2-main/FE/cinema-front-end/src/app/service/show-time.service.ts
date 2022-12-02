import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMovieType} from '../model/i-movie-type';
import {IMovieDto} from '../dto/i-movie-dto';
import {environment} from '../../environments/environment';
import {IShowTimes} from '../model/i-show-times';

const API_URL = `${environment.api_url}`;
@Injectable({
  providedIn: 'root'
})
export class ShowTimeService {

  constructor(private http: HttpClient) { }

  // getAllShowTime(): Observable<IMovieType[]> {
  //   console.log(API_URL + '/movieType');
  //   return this.http.get<IMovieType[]>(API_URL + '/movieType');
  // }

  // saveShowTime(showTime: IShowTimes[]): Observable<void> {
  //   console.log(API_URL + '/add', showTime);
  //   console.log(showTime);
  //   return this.http.post<void>(API_URL + '/add', showTime);
  // }
}
