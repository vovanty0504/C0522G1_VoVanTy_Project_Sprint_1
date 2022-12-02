import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from '../../../../service/ticket.service';
import {Title} from '@angular/platform-browser';
import {BehaviorSubject, Observable} from 'rxjs';
import {ITicketManagerDto} from '../../../../dto/i-ticket-manager-dto';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import {ITicket} from '../../../../model/i-ticket';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-management-list',
  templateUrl: './ticket-management-list.component.html',
  styleUrls: ['./ticket-management-list.component.css']
})
export class TicketManagementListComponent implements OnInit {
  page = 1;
  pageSize = 5;
  ticketListDto$: Observable<ITicketManagerDto[]>;
  total$: Observable<number>;
  ticketIdSearch = '';
  customerIdSearch = '';
  idCardSearch = '';
  phoneNumberSearch = '';
  action: boolean;
  ticketId: number;
  customerId: number;
  movieName: string;
  dateProjection: string;
  startTime: string;
  roomName: string;
  seatName: string;
  statusTicket: number;
  iTicket: ITicket;
  nowDay = new Date();
  formEditTicket: FormGroup = new FormGroup({
    id: new FormControl(),
    statusTicket: new FormControl()
  });
  id: number;
  totalElement: number;
  @ViewChild('content', {static: true}) el!: ElementRef<HTMLImageElement>;

  constructor(private ticketService: TicketService,
              private title: Title,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.title.setTitle('Quản lý đặt vé');
  }

  ngOnInit(): void {
    this.paginate();
  }

  paginate() {
    this.ticketService.paginate(this.page, this.pageSize, this.ticketIdSearch,
      this.customerIdSearch, this.idCardSearch, this.phoneNumberSearch).subscribe(data => {
      if (data != null) {
        console.log(data.content);
        this.action = true;
        this.ticketListDto$ = new BehaviorSubject<ITicketManagerDto[]>(data.content);
        this.total$ = new BehaviorSubject<number>(data.totalElements);
        this.totalElement = data.totalElements;
      } else {
        this.action = false;
      }
    });
    // this.ticketIdSearch = '';
    // this.customerIdSearch = '';
    // this.idCardSearch = '';
    // this.phoneNumberSearch = '';

  }

  getInfoTicketDto(idTic: number, idCus: number, movie: string,
                   startDay: string, startTime: string, seat: string, room: string): void {
    this.ticketId = idTic;
    this.customerId = idCus;
    this.movieName = movie;
    this.dateProjection = startDay;
    this.startTime = startTime;
    this.roomName = room;
    this.seatName = seat;
  }

  getTicketIdToUpdate(editId: number, editStatus): void {
    this.formEditTicket.controls.id.setValue(editId);
    this.formEditTicket.controls.statusTicket.setValue(editStatus);
  }

  editTicketManager(): void {
    this.id = +this.formEditTicket.value.id;
    this.iTicket = this.formEditTicket.value;
    this.ticketService.editStatusTicketBy2(this.iTicket).subscribe(value => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Xác nhận chọn vé thành công !',
        showConfirmButton: false,
        timer: 2700
      });
      this.paginate();
    });
  }

  exportPdf() {
    html2canvas(this.el.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF({
        orientation: 'portrait'
      });
      const imageProps = pdf.getImageProperties(imgData);
      const pdfw = pdf.internal.pageSize.getWidth();
      const pdfh = (imageProps.height * pdfw) / imageProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh);
      pdf.save('ticket-pill.pdf');
      this.editTicketManager();
    });
  }

  modalDelete() {
    Swal.fire({
      title: 'Bạn có muốn xóa ?',
      text: 'Tác vụ này không thể hoàn tác !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng Ý',
      cancelButtonText: 'Hủy Bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/ticket/delete-management');
      }
    });
  }

  resetSearchInput(): void {
    this.idCardSearch = '';
    this.phoneNumberSearch = '';
    this.paginate();
    this.page = 1;
  }
}

