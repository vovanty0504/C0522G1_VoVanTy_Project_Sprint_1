import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ICustomer} from '../../../model/i-customer';
import {User} from '../../../dto/user';
import {CustomerService} from '../../../service/customer.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  submitted = false;
  action = true;
  customerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.pattern(
        '[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
        'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      dayOfBirth: new FormControl('', this.checkDateOfBirth),
      gender: new FormControl('', Validators.required),
      idCard: new FormControl('', [Validators.required,
        Validators.pattern('^(\\d{9}|\\d{12})$')]),
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[A-Za-z0-9_.]{4,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$')]),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required,
        Validators.pattern('^([+84][\\d]{9})|([0]\\d{9})$')]),
      username: new FormControl('', [Validators.required,
        Validators.pattern('[a-zA-Z0-9' +
          ' _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
          'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+'),
        Validators.minLength(3)]),
      passGroup: new FormGroup(
        {
          password: new FormControl('', [Validators.required,
            Validators.minLength(6)]),
          confirmPassword: new FormControl('', [Validators.required,
            Validators.minLength(6)])
        }, this.checkPasswords),
      customerType: new FormGroup({
        id: new FormControl(4)
      })
    });

  user = new User();
  customer: ICustomer;


  constructor(private customerService: CustomerService,
              private router: Router) {
  }

  ngOnInit(): void {
    window.onbeforeunload = function(e) {
      e = e || window.event;
      // For IE and Firefox prior to version 4
      if (e) {
        e.returnValue = 'Sure?';
      }
      // For Safari
      return 'Sure?';
    };
  }

  submit(): void {
    this.submitted = true;
    this.customer = this.customerForm.value;
    this.user.username = this.customerForm.value.username;
    this.user.password = this.customerForm.get('passGroup').get('password').value;
    this.customer.user = this.user;
    console.log(this.customerForm.get('passGroup').get('password').value);
    this.customerService.saveCustomer(this.customer).subscribe(value => {
      console.log(value);
      if (value == null) {
        Swal.fire({
          icon: 'success',
          title: 'Đăng Ký Thành Công!',
          text: 'Tài Khoản: ' + this.user.username,
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat`
        });
      }
      this.customerForm.reset();
      this.router.navigateByUrl('');
    }, error => {
      this.action = false;
    }, () => {
    });
  }

  checkPasswords(group: AbstractControl): any {
    const passwordCheck = group.value;
    return (passwordCheck.password === passwordCheck.confirmPassword ? null : {notSame: true});
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  checkDateOfBirth(abstractControl: AbstractControl): any {
    const formYear = Number(new Date(abstractControl.value).getFullYear());
    const formMonth = Number(new Date(abstractControl.value).getMonth() + 1);
    const formDay = Number(new Date(abstractControl.value).getDate());

    return (new Date().getFullYear() - formYear > 15) ? null : {invalidDateOfBirth: true};
  }

}
