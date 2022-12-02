import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMovieBookingDto} from '../dto/i-movie-booking-dto';
import {IShowDateBookingDto} from '../dto/i-show-date-booking-dto';
import {IShowtimesBookingDto} from '../dto/i-showtimes-booking-dto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {ISeatDetailBookingDto} from '../dto/i-seat-detail-booking-dto';
import {ITicket} from '../model/i-ticket';
import {ICustomer} from '../model/i-customer';
import {ISeatDetail} from '../model/i-seat-detail';
import {ITicketDto} from '../dto/i-ticket-dto';


// const API_URL = `${environment.api_url}`;
const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class BookingTicketService {
  private movieBooking = new BehaviorSubject<IMovieBookingDto>(undefined);
  private showDateBooking = new BehaviorSubject<IShowDateBookingDto>(undefined);
  private showTimeBooking = new BehaviorSubject<IShowtimesBookingDto>(undefined);
  curMovie = this.movieBooking.asObservable();
  curShowDate = this.showDateBooking.asObservable();
  curShowTime = this.showTimeBooking.asObservable();

  httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  findAllMovieInNext7Days(): Observable<any> {
    console.log(this.httpOptions);
    return this.httpClient.get<IMovieBookingDto[]>(API_URL + '/ticket/movie', this.httpOptions);
  }

  findAllShowDateByMovie(idMovie: number): Observable<any> {
    return this.httpClient.get<IShowDateBookingDto[]>(API_URL + '/ticket/show-date/' + idMovie, this.httpOptions);
  }

  findAllShowTimeByShowDate(showDate: string, idMovie: number): Observable<any> {
    return this.httpClient.get<IShowtimesBookingDto[]>(API_URL + '/ticket/showtime/' + showDate + '&' + idMovie,
      this.httpOptions);
  }

  findAllSeatByShowTime(idShowTime: number): Observable<any> {
    return this.httpClient.get<ISeatDetailBookingDto[]>(API_URL + '/ticket/seat-detail/' + idShowTime, this.httpOptions);
  }

  changeData(movie: IMovieBookingDto, showDate: IShowDateBookingDto, showTime: IShowtimesBookingDto): void {
    this.movieBooking.next(movie);
    this.showDateBooking.next(showDate);
    this.showTimeBooking.next(showTime);
  }

  addPendingTicket(ticket: ITicket): Observable<any> {
    return this.httpClient.post<ITicket>(API_URL + '/ticket/add-pending-ticket', ticket, this.httpOptions);
  }

  getCustomerByUsername(): Observable<any> {
    return this.httpClient.get<ICustomer>(API_URL + '/ticket/get-customer', this.httpOptions);
  }

  getSeatDetailById(id: number): Observable<any> {
    return this.httpClient.get<ISeatDetail>(API_URL + '/ticket/seat/' + id, this.httpOptions);
  }

  getTicketByuserName(): Observable<any> {
    console.log(this.httpOptions);
    return this.httpClient.get<ITicketDto>(API_URL + '/ticket/list-ticket', this.httpOptions);
  }

  updateStatusTicketByUserName(): Observable<any> {
    console.log(API_URL + '/ticket/update-ticket', this.httpOptions);
    return this.httpClient.put<void>(API_URL + '/ticket/update-ticket', this.httpOptions);
  }
}
