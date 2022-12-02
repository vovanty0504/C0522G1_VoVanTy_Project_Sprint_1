import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITicket} from '../model/i-ticket';
import {SearchResult} from '../model/search-result';
import {ITicketManagerDto} from '../dto/i-ticket-manager-dto';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private API_TICKET = environment.api_url;
  httpOptions: any;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  paginate(page: number, limit: number, ticketId: string, customerId: string, idCard: string,
           phoneNumber: string): Observable<SearchResult<ITicketManagerDto>> {
    return this.http.get<SearchResult<ITicketManagerDto>>(this.API_TICKET + '/ticket/list-ticket-manager?page='
      + (page - 1) + '&size=' + limit + '&ticketId=' + ticketId + '&customerId=' + customerId + '&idCard='
      + idCard + '&phoneNumber=' + phoneNumber);
  }

  getTicketManagerById(id: number): Observable<ITicketManagerDto> {
    return this.http.get<ITicketManagerDto>(this.API_TICKET + '/ticket/find-ticket-by/{id}' + id);
  }

  editStatusTicketBy2(iTicket: ITicket): Observable<void> {
    return this.http.patch<void>(this.API_TICKET + '/ticket/edit-ticket-by/' + iTicket.id, iTicket);
  }


  showUsername(): Observable<any> {
    return this.http.get<any>(this.API_TICKET + '/ticket/findUsername/', this.httpOptions);
  }

  showListHistoryPoint(page: number, pageSize: number, startTime: string, endTime: string, point: string)
    : Observable<any> {
    return this.http.get<any>(this.API_TICKET +
      '/ticket/history/point?page=' + (page - 1) + '&size=' + pageSize +
      '&startTime=' + startTime + '&endTime=' + endTime + '&point=' + point, this.httpOptions);
  }


  findByCustomerNameAndPoint(): Observable<any> {
    return this.http.get<any>(this.API_TICKET +
      '/ticket/findCustomerName/and/point/', this.httpOptions);
  }

  showListBookingTicket(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.API_TICKET +
      '/ticket/history/booking?page=' + (page - 1) + '&size=' + pageSize, this.httpOptions);
  }


  showListCanceledTicket(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(this.API_TICKET +
      '/ticket/history/canceled?page=' + (page - 1) + '&size=' + pageSize, this.httpOptions);
  }


  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(this.API_TICKET + '/ticket/delete/' + id);
  }
}
