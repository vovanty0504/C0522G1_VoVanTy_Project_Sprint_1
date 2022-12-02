import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchResult} from '../model/search-result';
import {IPromotion} from '../model/i-promotion';
import {environment} from '../../environments/environment';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) {
  }

  paginate(page: number, limit: number, name: string, dateStart: string): Observable<SearchResult<IPromotion>> {
    return this.http.get<SearchResult<IPromotion>>(API_URL + '/promotion/list' + '?page=' + (page - 1)
      + '&size=' + limit + '&name=' + name + '&dateStart=' + dateStart);
  }

  createPromotion(promotion): Observable<IPromotion> {
    return this.http.post<IPromotion>(API_URL + '/promotion/save', promotion);
  }

  editPromotion(id: number, promotion): Observable<IPromotion> {
    return this.http.patch<IPromotion>(API_URL + '/promotion/edit/' + id, promotion);
  }

  deletePromotion(id: number): Observable<void> {
    return this.http.delete<void>(API_URL + '/promotion/delete/' + id);
  }

  getAllPromotion(page: number): Observable<IPromotion[]> {
    return this.http.get<IPromotion[]>(API_URL + '/promotion/list?page=' + page);
  }

  getPromotionById(id: number): Observable<IPromotion> {
    return this.http.get<IPromotion>(API_URL + '/promotion/detail/' + id);
  }
}
