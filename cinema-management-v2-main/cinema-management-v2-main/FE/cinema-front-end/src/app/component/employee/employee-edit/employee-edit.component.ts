import {Component, Inject, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../service/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '../../../model/i-user';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {IEmployee} from '../../../model/i-employee';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeFormGroup: FormGroup;
  employeeId: number;
  user: IUser;
  employee: IEmployee;
  selectedImage: any = null;
  username: string;
  imgUrl: string | ArrayBuffer;
  submitCheck = false;

  constructor(private employeeService: EmployeeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private title: Title) {
    this.title.setTitle('Sửa nhân viên');
  }

  ngOnInit(): void {
    this.employeeId = Number(this.activatedRoute.snapshot.params.id);
    console.log(this.employeeId);
    this.employeeService.getById(this.employeeId).subscribe(value => {
      this.employee = value;
      this.username = value.user.username;
      this.employeeFormGroup.patchValue(this.employee);
      this.imgUrl = this.employee.image;
      console.log(this.employeeFormGroup);
    });


    this.employeeFormGroup = new FormGroup({
      id: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,  Validators.minLength(12), Validators.maxLength(32)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
      name: new FormControl('',
        [Validators.required, Validators.pattern('[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀ' +
          'ỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+'),
          Validators.minLength(4), Validators.maxLength(32)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('(0|[(]84[)][+])9\\d{8}')]),
      idCard: new FormControl('', [Validators.required, Validators.pattern('^(\\d{9}|\\d{12})$')]),
      dayOfBirth: new FormControl('', [Validators.required, this.checkAge]),
      image: new FormControl(''),
      user: new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
      }),
      passwordGroup: new FormGroup({
        passwordNew: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
        passwordConfirm: new FormControl('')
      }, this.checkPassword)
    });
  }

  updateEmployee() {
    this.submitCheck = true;
    this.employee = this.employeeFormGroup.value;
    this.employee.user.password = this.employeeFormGroup.get('passwordGroup').get('passwordNew').value;
    if (this.selectedImage) {
      const image = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(image);
      this.storage.upload(image, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.employeeFormGroup.patchValue({image: url});
            this.employee.image = url;
            this.employeeService.updateEmployee(this.employee).subscribe(() => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Nhân viên: ' + this.employee.name,
                title: 'Đã chỉnh sửa thành công',
                showConfirmButton: false,
                timer: 2700
              });
              this.router.navigateByUrl('/employee/list');
            });
          });
        })
      ).subscribe();
    } else {
      this.imgUrl = this.employee.image;
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Nhân viên: ' + this.employee.name,
          title: 'Đã chỉnh sửa thành công',
          showConfirmButton: false,
          timer: 2700
        });
        this.router.navigateByUrl('/employee/list');
      });
    }
  }


  checkPassword(abstractControl: AbstractControl): any {
    const checkPass = abstractControl.value;
    return checkPass.passwordNew === checkPass.passwordConfirm ? null : {notSame: true};
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

  checkAge(abstract: AbstractControl): any {
    const formYear = Number(abstract.value.substr(0, 4));
    const curYear = new Date().getFullYear();
    return (curYear - formYear >= 18 && curYear - formYear <= 80 ) ? null : {invalid18: true};
  }


}
