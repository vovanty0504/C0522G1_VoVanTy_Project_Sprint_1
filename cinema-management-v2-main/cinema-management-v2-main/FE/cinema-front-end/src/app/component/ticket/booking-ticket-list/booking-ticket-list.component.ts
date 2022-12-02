import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TicketService} from '../../../service/ticket.service';
import Swal from 'sweetalert2';
import {ITicketTyDto} from '../../../dto/iticket-ty-dto';
import {TokenStorageService} from '../../../service/token-storage.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-booking-ticket-list',
  templateUrl: './booking-ticket-list.component.html',
  styleUrls: ['./booking-ticket-list.component.css']
})
export class BookingTicketListComponent implements OnInit {


  nameDelete: string;
  idDelete: number;
  page = 1;
  pageSize = 5;
  total$: Observable<number>;
  ticketDto$: Observable<ITicketTyDto[]>;
  action: boolean;
  customerName = '';
  customer: ITicketTyDto[];
  totalPoint = '';
  price: number;
  customerTypeName: number;
  private username: string;

  constructor(private tokenService: TokenStorageService,
              private ticketService: TicketService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Vé đã đặt');
  }

  ngOnInit(): void {
    this.showListBookingTicket();
    this.findByCustomerNameAndPoint();


  }


  findByCustomerNameAndPoint() {
    this.ticketService.findByCustomerNameAndPoint().subscribe(value => {
      console.log(value);
      this.customerName = value.customerName;
      this.totalPoint = value.totalPoint;
      this.customerTypeName = value.customerTypeId;
      console.log(this.customerTypeName);
    });
  }

  showListBookingTicket() {
    this.ticketService.showListBookingTicket(this.page, this.pageSize).subscribe(value => {
        console.log(value);
        if (value != null) {
          this.action = true;
          this.ticketDto$ = new BehaviorSubject<ITicketTyDto[]>(value.content);
          this.total$ = new BehaviorSubject<number>(value.totalElements);
        } else {
          this.action = false;

        }
      },
      error => {
      });
  }

  confirmDelete(value) {
    const timeBook = new Date(value.bookingTime);
    const now = new Date();
    if (new Date().getTime() - new Date(value.bookingTime).getTime() >= 30 * 60 * 1000) {
      Swal.fire({
        title: 'Không thể hủy vé!',
        text: 'Thời gian đặt vé quá 30 phút.',
        icon: 'warning',
        showCancelButton: false,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hủy Bỏ',
      });
    } else {
      this.idDelete = value.ticketId;
      this.nameDelete = value.movieName;
      console.log(this.idDelete);
      Swal.fire({
        title: 'Bạn có muốn xóa ' + this.nameDelete + '?',
        text: 'Tác vụ này không thể hoàn tác !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng Ý',
        cancelButtonText: 'Hủy Bỏ',
      }).then((result) => {
        if (result.isConfirmed) {
          this.ticketService.deleteTicket(this.idDelete).subscribe(value1 => {
            console.log(this.idDelete);
            Swal.fire(
              'Đã xóa!',
              'Thông tin này đã được xóa.'
            );
            this.ngOnInit();
          });
        }
      });
    }
  }

  whenLogout() {
    this.tokenService.logOut();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: ' Đăng xuất thành công !',
      showConfirmButton: false,
      timer: 1000
    });
    this.router.navigateByUrl('');
    this.reload();
  }

  reload() {
    window.location.reload();
  }
}
