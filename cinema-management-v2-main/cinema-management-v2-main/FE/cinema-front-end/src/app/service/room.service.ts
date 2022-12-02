import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRoom} from '../model/i-room';


const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {
  }

  getAllRoom(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(API_URL + '/room/list');
  }

  getAllRooms(name: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/room` + '?name=' + name);
  }

  findSeatRoomByRoomId(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/room/seat-room/` + id);
  }

  updateSeatType(id, idSeatType) {
    return this.http.patch(`http://localhost:8080/api/room/updateStatusSeatRoom/${id}/${idSeatType}`, '');
  }

  findNameRoomById(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/room/` + id);
  }

}
