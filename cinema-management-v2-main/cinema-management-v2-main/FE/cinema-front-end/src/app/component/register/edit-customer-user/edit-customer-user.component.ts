import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerTypeService} from '../../../service/customer-type.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ICustomer} from '../../../model/i-customer';
import Swal from 'sweetalert2';
import {UserService} from '../../../service/user.service';
import {User} from '../../../dto/user';
import {UserDto} from '../../../dto/user-dto';
import {CustomerService} from '../../../service/customer.service';
import {TicketService} from '../../../service/ticket.service';
import {TokenStorageService} from '../../../service/token-storage.service';

@Component({
  selector: 'app-edit-customer-user',
  templateUrl: './edit-customer-user.component.html',
  styleUrls: ['./edit-customer-user.component.css']
})
export class EditCustomerUserComponent implements OnInit {
  submitted = false;
  customerName = '';
  totalPoint;
  customerTypename: number;

  constructor(private customerService: CustomerService,
              private customerTypeService: CustomerTypeService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private tokenService: TokenStorageService,
              private ticketService: TicketService) {
  }

  customerForm: FormGroup;
  customer: ICustomer;
  userForm: FormGroup;
  username: string;
  user = new User();
  iUser: UserDto;
  action = true;

  ngOnInit(): void {
    this.findByCustomerNameAndPoint();
    this.customerService.findCustomerByUsername().subscribe(value => {
      console.log(value);
      this.customer = value;
      this.username = value.username;
      this.customerForm = new FormGroup(
        {
          id: new FormControl(),
          name: new FormControl(value.customerName, [Validators.required,
            Validators.pattern(
              '[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
              'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
          dayOfBirth: new FormControl('', this.checkDateOfBirth),
          gender: new FormControl('', [Validators.required]),
          idCard: new FormControl('', [Validators.required,
            Validators.pattern('^(\\d{9}|\\d{12})$')]),
          email: new FormControl('', [Validators.required,
            Validators.pattern('^[A-Za-z0-9_.]{4,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$')]),
          address: new FormControl('', [Validators.required]),
          phoneNumber: new FormControl('', [Validators.required,
            Validators.pattern('^([+84][\\d]{9})|([0]\\d{9})$')]),
          username: new FormControl('', [Validators.required]),
        });

      this.userForm = new FormGroup(
        {
          username: new FormControl(),
          oldPassword: new FormControl(),
          psFormGroup: new FormGroup({
            newPassword: new FormControl('', [Validators.required,
              Validators.minLength(6)]),
            confirmPassword: new FormControl('', [Validators.required,
              Validators.pattern('^[0-9a-zA-Z]{6,12}$')])
          }, this.checkPasswords)
        });
      this.customerForm.patchValue(this.customer);
      this.userForm.patchValue(this.customer);
    });
  }

  updateUser(): void {
    this.submitted = true;
    this.iUser = this.userForm.value;
    console.log(this.userForm.get('psFormGroup').get('newPassword'));
    console.log(this.username);
    this.iUser.password = this.userForm.value.oldPassword;
    this.iUser.newPassword = this.userForm.get('psFormGroup').get('newPassword').value;
    this.userService.editUser(this.iUser).subscribe(value => {
      if (value == null) {
        this.action = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhật thành công!',
          text: 'Thông tin của: ' + this.iUser.username,
          showConfirmButton: false,
          timer: 2000
        });
        this.userForm.reset();
      } else {
        this.action = false;
      }

    }, error => {
      this.action = false;
    }, () => {
      this.router.navigateByUrl('/register/info');
    });
  }

  updateCustomer(): void {
    this.submitted = true;
    const customer = this.customerForm.value;
    console.log(this.username);
    this.customerService.editCustomer(customer, this.username).subscribe(value => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cập nhật thành công!',
        text: 'Thông tin của: ' + customer.name,
        showConfirmButton: false,
        timer: 2000
      });
      this.customerForm.reset();
    }, error => {

    }, () => {
      this.router.navigateByUrl('/register/info');
    });
  }

  checkPasswords(group: AbstractControl): any {
    const passwordCheck = group.value;
    return (passwordCheck.newPassword === passwordCheck.confirmPassword ? null : {notSame: true});
  }

  findByCustomerNameAndPoint() {
    this.ticketService.findByCustomerNameAndPoint().subscribe(value => {
      this.customerName = value.customerName;
      this.totalPoint = value.totalPoint;
      this.customerTypename = value.customerTypeId;
      console.log(this.customerTypename);
    });
  }

  whenLogout() {
    this.tokenService.logOut();
    this.username = '';
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

  checkDateOfBirth(abstractControl: AbstractControl): any {
    const formYear = Number(new Date(abstractControl.value).getFullYear());
    const formMonth = Number(new Date(abstractControl.value).getMonth() + 1);
    const formDay = Number(new Date(abstractControl.value).getDate());

    return (new Date().getFullYear() - formYear > 15) ? null : {invalidDateOfBirth: true};
  }
}
