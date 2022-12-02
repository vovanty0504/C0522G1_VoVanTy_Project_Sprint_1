import {Component, OnInit} from '@angular/core';
import {ITicketDto} from '../../../dto/i-ticket-dto';
import {Router} from '@angular/router';
import {render} from 'creditcardpayments/creditCardPayments';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';
import {BookingTicketService} from '../../../service/booking-ticket.service';

@Component({
  selector: 'app-payment-booking-ticket',
  templateUrl: './payment-booking-ticket.component.html',
  styleUrls: ['./payment-booking-ticket.component.css']
})
export class PaymentBookingTicketComponent implements OnInit {

  action = false;
  arrayTicket: ITicketDto[] = [];
  total = 0;
  totalPaypal = 0;
  tlP: string;

  constructor(private bookingTicketService: BookingTicketService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Thông tin đặt vé');
  }

  ngOnInit(): void {
    this.getTicket();
  }

  /**
   * Phương thức này dùng để update thông tin người dùng đặt vé
   * creator: ThanhNT
   */
  confirmUpdate() {
    this.bookingTicketService.updateStatusTicketByUserName().subscribe(payment => {
        console.log('payment');
        console.log(payment);
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Cảm ơn quý khách !',
          title: 'Đã thanh toán thành công',
          showConfirmButton: false,
        });
      }, error => {
        console.log('fail');
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'Xin lỗi quý khách !',
          title: 'Thanh toán thất bại !',
          showConfirmButton: false,
        });
      },
      () => {
      });
    this.router.navigateByUrl('ticket/confirm-ticket');
  }

  /**
   * Phương thức này dùng để lấy thông tin vé và khách hàng
   * creator: ThanhNT
   */
  getTicket(): void {
    this.bookingTicketService.getTicketByuserName().subscribe(value => {
        this.arrayTicket = value;
        for (let index in value) {
          this.total += value[index].price;
        }
        this.totalPaypal = Math.round(this.total / 24795);
        console.log('hihi');
        console.log(this.totalPaypal);
        this.tlP = String (this.totalPaypal);
        console.log( this.tlP);
        render(
          {
            id: '#myPaypal',
            value: this.tlP,
            currency: 'USD',
            onApprove: (details) => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Cảm ơn quý khách !',
                title: 'Đã thanh toán thành công',
                showConfirmButton: false,
              });
              this.action = true;
              this.confirmUpdate();
              this.router.navigateByUrl('');
            }
          }
        );
      },
      error => {
      });
  }

  /**
   * Phương thức này dùng để hiển thị nút Paypal và thanh toán
   * creator: ThanhNT
   */
  payment() {
    render(
      {
        id: '#myPaypal',
        value: `55`,
        currency: 'VNĐ',
        onApprove: (details) => {
          Swal.fire({
            icon: 'success',
            title: 'Thanh toán thành công!',
            width: 600,
            padding: '3em',
            color: '#716add',
            backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
        `
          });
        }
      });
  }
}
