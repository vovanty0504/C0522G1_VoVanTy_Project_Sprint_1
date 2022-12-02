import {Component, OnInit} from '@angular/core';
import {ISeatDetailBookingDto} from '../../../dto/i-seat-detail-booking-dto';
import {IMovieBookingDto} from '../../../dto/i-movie-booking-dto';
import {IShowDateBookingDto} from '../../../dto/i-show-date-booking-dto';
import {IShowtimesBookingDto} from '../../../dto/i-showtimes-booking-dto';
import {BookingTicketService} from '../../../service/booking-ticket.service';
import {ITicket} from '../../../model/i-ticket';
import {ICustomer} from '../../../model/i-customer';
import {Router} from "@angular/router";


@Component({
  selector: 'app-booking-seat',
  templateUrl: './booking-seat.component.html',
  styleUrls: ['./booking-seat.component.css']
})
export class BookingSeatComponent implements OnInit {
  seatDetails$: ISeatDetailBookingDto[];
  selectTemp = [
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', ''
  ];
  countSeat = 0;
  totalMoney = 0;
  seatBookings: ISeatDetailBookingDto[] = [];

  movieChoose: IMovieBookingDto;
  showDateChoose: IShowDateBookingDto;
  showTimeChoose: IShowtimesBookingDto;

  customer: ICustomer;

  ticketBooking: ITicket;

  constructor(private bookingTicketService: BookingTicketService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.bookingTicketService.curMovie.subscribe(value => this.movieChoose = value);
    this.bookingTicketService.curShowDate.subscribe(value => this.showDateChoose = value);
    this.bookingTicketService.curShowTime.subscribe(value => this.showTimeChoose = value);

    this.getAllSeatByShowTime();

    this.bookingTicketService.getCustomerByUsername().subscribe(value => {
        this.customer = value;
      },
      error => {
        console.log(error);
      });
  }

  getAllSeatByShowTime(): void {
    this.bookingTicketService.findAllSeatByShowTime(this.showTimeChoose.id).subscribe(value => {
        this.seatDetails$ = value;
      },
      error => {
        console.log(error);
      });
  }

  chooseSeat(seatDetail: ISeatDetailBookingDto, i: number): void {
    if (this.selectTemp[i] === '') {
      this.selectTemp[i] = 'selected';
      this.countSeat++;
      this.totalMoney += seatDetail.price;
      this.seatBookings.push(seatDetail);
    } else {
      this.selectTemp[i] = '';
      this.countSeat--;
      this.totalMoney -= seatDetail.price;
      for (let index in this.seatBookings) {
        if (seatDetail.id === this.seatBookings[index].id) {
          this.seatBookings.splice(Number(index), 1);
          break;
        }
      }
    }
  }

  nextConfirm() {
    for (let item of this.seatBookings) {
      console.log(item);
      this.bookingTicketService.getSeatDetailById(item.id).subscribe(value => {
          this.ticketBooking = {
            statusTicket: 0,
            seatDetail: value,
            customer: this.customer,
            ticketBookingTime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
              + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
          };

          this.bookingTicketService.addPendingTicket(this.ticketBooking).subscribe(() => {
            this.router.navigateByUrl('confirm-ticket');
          }, error => {
            console.log(error);
          });
        },
        error => {
          console.log(error);
        });
    }
  }
}
