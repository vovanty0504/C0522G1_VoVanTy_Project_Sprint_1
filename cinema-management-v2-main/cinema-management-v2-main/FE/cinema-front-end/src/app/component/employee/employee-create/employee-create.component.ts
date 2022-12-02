import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../../../service/employee.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {IEmployee} from '../../../model/i-employee';
import {User} from '../../../dto/user';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  user = new User();
  employee: IEmployee;
  submitCheck = false;
  imgUrl: string | ArrayBuffer = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-d' +
    'oi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg';

  constructor(private employeeService: EmployeeService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private title: Title) {
    this.title.setTitle('Thêm nhân viên');
  }


  selectedImage: any = null;

  employeeFormGroup: FormGroup = new FormGroup({
    name: new FormControl('',
      [Validators.required, Validators.pattern('[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀ' +
        'ỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+'),
        Validators.minLength(4), Validators.maxLength(32)]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(12), Validators.maxLength(32)]),
    address: new FormControl('', [Validators.required,
      Validators.minLength(3), Validators.maxLength(32)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('(0|[(]84[)][+])9\\d{8}')]),
    idCard: new FormControl('', [Validators.required, Validators.pattern('^(\\d{9}|\\d{12})$')]),
    dayOfBirth: new FormControl('', [Validators.required, this.checkAge]),
    image: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    passwordGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      passwordConfirm: new FormControl('', [Validators.required])
    }, this.checkPassword)
  });

  ngOnInit(): void {
  }


  submit(): void {
    this.submitCheck = true;
    this.employee = this.employeeFormGroup.value;
    this.user.username = this.employeeFormGroup.value.username;
    this.user.password = this.employeeFormGroup.get('passwordGroup').get('password').value;
    this.employee.user = this.user;
    const image = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(image);
    this.storage.upload(image, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.employeeFormGroup.patchValue({image: url});
          this.employee.image = url;
          this.imgUrl = this.employee.image;
          this.employeeService.addEmployee(this.employee).subscribe(data => {
            Swal.fire({
              icon: 'success',
              title: 'Thêm mới thành công!',
              text: 'Nhân viên: ' + this.employee.name,
            });
          }, error => {
            console.log(error);
          }, () => {
            this.router.navigateByUrl('employee/list');
            console.log('Thêm mới nhân viên thành công!');
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyy', 'en-US');
  }

  checkPassword(abstractControl: AbstractControl): any {
    const checkPass = abstractControl.value;
    return checkPass.password === checkPass.passwordConfirm ? null : {notSame: true};
  }

  getAllEmployee(): any {
    return this.employeeService.findAllEmployee();
  }

  checkAge(abstract: AbstractControl): any {
    const formYear = Number(abstract.value.substr(0, 4));
    const curYear = new Date().getFullYear();
    return ( curYear - formYear >= 18 && curYear - formYear <= 80 ) ? null : {invalid18: true};
  }
}
