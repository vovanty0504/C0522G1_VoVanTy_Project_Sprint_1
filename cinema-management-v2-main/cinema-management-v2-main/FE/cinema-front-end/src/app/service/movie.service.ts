import {IMovieDto} from '../dto/i-movie-dto';
import {Injectable} from '@angular/core';
import {IMovieType} from '../model/i-movie-type';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TokenStorageService} from './token-storage.service';
import {IMovie} from '../model/i-movie';
import {IMovieDetail} from '../dto/i-movie-detail';
import {SearchResult} from '../model/search-result';
import {IMovieHome} from '../dto/i-movie-home';
import {IMovieBookingDto} from '../dto/i-movie-booking-dto';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  URL_API = `${environment.api_url}`;
  httpOptions: any;
  private movieBooking = new BehaviorSubject<IMovieBookingDto>(undefined);
  currentMovie = this.movieBooking.asObservable();

  constructor(private httpClient: HttpClient, private tokenService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllMovieType(): Observable<IMovieType[]> {
    console.log(this.URL_API + 'movie/movieType');
    return this.httpClient.get<IMovieType[]>(this.URL_API + '/movie/movieType');
  }

  saveMovie(movie: IMovie): Observable<IMovie> {
    console.log(this.URL_API + 'movie/add', movie);
    return this.httpClient.post<IMovie>(this.URL_API + '/movie/add', movie);
  }

  editMovie(movie: IMovie): Observable<IMovie> {
    console.log(this.URL_API + 'movie/edit/' + movie.id, movie);
    return this.httpClient.patch<IMovie>(this.URL_API + '/movie/edit/' + movie.id, movie);
  }

  getMovieById(id: number): Observable<IMovieDto> {
    console.log(this.URL_API + 'movie/' + id);
    return this.httpClient.get<IMovieDto>(this.URL_API + '/movie/' + id);
  }

  // ok
  findById(id: number): Observable<IMovieDetail> {
    return this.httpClient.get<IMovieDetail>(this.URL_API + '/movie/detail/' + id);
  }

  // ok
  findAllListMovie(name: string, size: number): Observable<SearchResult<IMovieDto>> {
    const API_URL_HOME = this.URL_API + '/movie/list/home?name=' + name + '&size=' + size;
    console.log(API_URL_HOME);
    return this.httpClient.get<SearchResult<IMovieDto>>(API_URL_HOME);
  }

// ok
  findAllListPremiereSoonMovie(name: string, size: number): Observable<SearchResult<IMovieHome>> {
    const API_URL_PREMIERE = this.URL_API + '/movie/list/premiere?name=' + name + '&size=' + size;
    console.log(API_URL_PREMIERE);
    return this.httpClient.get<SearchResult<IMovieHome>>(API_URL_PREMIERE);
  }


  getMovieList(page: number, size: number, name: string): Observable<SearchResult<IMovie>> {
    return this.httpClient.get<SearchResult<IMovie>>(this.URL_API + '/movie/list?name=' + name + '&page=' + (page - 1) + '&size=' + size);
  }

  deleteMovie(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.URL_API + '/movie/delete/' + id);
  }

  changeData(movie: IMovieBookingDto): void {
    this.movieBooking.next(movie);
  }
}
