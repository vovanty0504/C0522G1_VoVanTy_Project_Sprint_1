import {Component, Injectable, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {TicketService} from '../../../service/ticket.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {HomeService} from '../../../service/home.service';
import {IMovieBookingDto} from '../../../dto/i-movie-booking-dto';
import {MovieService} from '../../../service/movie.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit {

  username: string;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  movieChoose: IMovieBookingDto;

  constructor(private router: Router,
              private ticketService: TicketService,
              private homeService: HomeService,
              private tokenService: TokenStorageService,
              private movieService: MovieService
  ) {
  }
  transmissionData() {
    this.movieChoose = {id: 0, name: ''};
    this.movieService.changeData(this.movieChoose);
  }

  ngOnInit(): void {
    this.username = '';
    this.showUsername();
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });
  }

  showUsername() {
    this.username = this.tokenService.getUser().username;
    this.roles = this.tokenService.getUser().roles;
    this.isCustomer = this.roles.indexOf('ROLE_CUSTOMER') !== -1;
    this.isEmployee = this.roles.indexOf('ROLE_EMPLOYEE') !== -1;
    this.isAdmin = this.roles.indexOf('ROLE_ADMIN') !== -1;
  }

  whenLogout() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: ' Đăng xuất thành công !',
      showConfirmButton: false,
      timer: 1000
    });
    this.tokenService.logOut();
    this.router.navigateByUrl('');
    this.username = '';
    this.isCustomer = false;
    this.isEmployee = false;
    this.isAdmin = false;
  }
}
