import {Component, OnInit} from '@angular/core';
import {IEmployee} from '../../../model/i-employee';
import {FormControl, FormGroup} from '@angular/forms';

import Swal from 'sweetalert2';
import {BehaviorSubject, Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {EmployeeService} from '../../../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  page = 1;
  pageSize = 5;
  employeeList$: Observable<IEmployee[]>;
  total$: Observable<number>;
  nameSearch = '';
  idCardSearch = '';
  phoneNumberSearch = '';
  action: boolean;

  employeeList: IEmployee[];
  employeeIdDelete: number;
  deleteImage: string;
  deleteName: string;
  // tslint:disable-next-line:max-line-length
  deleteImage2 = 'https://www.biography.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwMTgwMjczNTQyMDE0Mjk2/gettyimages-850161690.jpg';


  formDelete: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    gender: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    userName: new FormControl(),
    image: new FormControl(),
    idCard: new FormControl(),
    dayOfBirth: new FormControl()
  });

  constructor(private employeeService: EmployeeService,
              private title: Title) {
    this.title.setTitle('Danh sách nhân viên');
  }

  ngOnInit(): void {
    // this.getAllEmployee();
    console.log(this.formDelete);
    this.paginate();
  }

  // getAllEmployee(): void {
  //   this.employeeService.findAllEmployee().subscribe((value: any) => {
  //     this.employeeList = value.content;
  //   }, error => {
  //   }, () => {
  //     console.log(this.employeeList);
  //     console.log('complete');
  //   });
  // }

  getInfoEmployeeDelete(employeeId: number, employeeName: string,
                        employeeGender: number, employeeEmail: string,
                        employeeAddress: string, employeeUserName: string,
                        employeeImage: string, employeeIdCard: string,
                        employeeDayOfBirth: string, imageLink: string): void {
    this.formDelete.controls.id.setValue(employeeId);
    this.formDelete.controls.name.setValue(employeeName);
    this.formDelete.controls.gender.setValue(employeeGender);
    this.formDelete.controls.email.setValue(employeeEmail);
    this.formDelete.controls.address.setValue(employeeAddress);
    this.formDelete.controls.userName.setValue(employeeUserName);
    this.formDelete.controls.image.setValue(employeeImage);
    this.formDelete.controls.idCard.setValue(employeeIdCard);
    this.formDelete.controls.dayOfBirth.setValue(employeeDayOfBirth);
    this.deleteImage = imageLink;
    this.deleteName = employeeName;
  }

  deleteEmployee(): void {
    this.employeeIdDelete = Number(this.formDelete.value.id);
    this.employeeService.deleteEmployee(this.employeeIdDelete).subscribe(value => {
      this.ngOnInit();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã xóa thành công',
        showConfirmButton: false,
        timer: 2700
      });
    }, error => {
    }, () => {
    });
  }

  paginate() {
    this.employeeService.paginate(this.page, this.pageSize, this.nameSearch,
      this.idCardSearch, this.phoneNumberSearch).subscribe(data => {
      console.log(data);
      if (data != null) {
        this.action = true;
        this.employeeList = data.content;
        // this.total$ = new BehaviorSubject<number>(data.totalElements);
        this.total$ = new BehaviorSubject<number>(data.totalElements);
      } else {
        this.action = false;
      }
    });
    // this.nameSearch = '';
    // this.idCardSearch = '';
    // this.phoneNumberSearch = '';
  }
}
