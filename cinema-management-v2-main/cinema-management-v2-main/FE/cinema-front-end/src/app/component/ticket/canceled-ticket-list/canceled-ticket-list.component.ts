import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TicketService} from '../../../service/ticket.service';
import {ITicketTyDto} from '../../../dto/iticket-ty-dto';
import {TokenStorageService} from '../../../service/token-storage.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-canceled-ticket-list',
  templateUrl: './canceled-ticket-list.component.html',
  styleUrls: ['./canceled-ticket-list.component.css']
})
export class CanceledTicketListComponent implements OnInit {
  page = 1;
  pageSize = 5;
  total$: Observable<number>;
  ticketDto$: Observable<ITicketTyDto[]>;
  action: boolean;
  customerName = '';
  customer: ITicketTyDto[];
  totalPoint = '';
  customerTypeName: number;


  constructor(private tokenService: TokenStorageService,
              private ticketService: TicketService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Vé đã hủy');
  }

  ngOnInit(): void {
    this.showListCanceledTicket();
    this.findByCustomerNameAndPoint();
  }

  findByCustomerNameAndPoint() {
    this.ticketService.findByCustomerNameAndPoint().subscribe(value => {
      this.customerName = value.customerName;
      this.totalPoint = value.totalPoint;
      this.customerTypeName = value.customerTypeId;

    });
  }


  showListCanceledTicket() {
    this.ticketService.showListCanceledTicket(this.page, this.pageSize).subscribe(value => {
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
