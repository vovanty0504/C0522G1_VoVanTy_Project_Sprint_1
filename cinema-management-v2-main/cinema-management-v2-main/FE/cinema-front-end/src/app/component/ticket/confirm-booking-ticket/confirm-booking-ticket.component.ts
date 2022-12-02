import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ITicketDto} from '../../../dto/i-ticket-dto';
import {Title} from '@angular/platform-browser';
import {BookingTicketService} from '../../../service/booking-ticket.service';
import {BehaviorSubject, Observable} from 'rxjs';


@Component({
  selector: 'app-confirm-booking-ticket',
  templateUrl: './confirm-booking-ticket.component.html',
  styleUrls: ['./confirm-booking-ticket.component.css']
})
export class ConfirmBookingTicketComponent implements OnInit {
  arrayTicket$: Observable<ITicketDto[]>;
  total$: number;
  infoCustomer$: BehaviorSubject<ITicketDto>;

  constructor(private bookingTicketService: BookingTicketService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Xác nhận đặt vé');
  }


  ngOnInit(): void {
    this.getTicket();
  }

  getTicket(): void {
    this.bookingTicketService.getTicketByuserName().subscribe(value => {
        // console.log(value);
        this.arrayTicket$ = new BehaviorSubject(value);
        // console.log(this.arrayTicket$);
        this.infoCustomer$ = new BehaviorSubject<ITicketDto>(value[0]);
        console.log(this.infoCustomer$);
        let temp = 0;
        for (const i of value) {
          temp += i.price;
        }
        this.total$ = temp;
      },
      error => {
        console.log(error);
      });
  }
}
