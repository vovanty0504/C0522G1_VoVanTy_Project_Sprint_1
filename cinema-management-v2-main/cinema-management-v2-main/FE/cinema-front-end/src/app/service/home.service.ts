import {Injectable} from '@angular/core';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  username: string;
  roles: string[] = [];

  constructor(private tokenStorageService: TokenStorageService) {
  }
}
