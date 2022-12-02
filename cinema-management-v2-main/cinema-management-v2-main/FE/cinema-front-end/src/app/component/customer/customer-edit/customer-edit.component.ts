import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ICustomer} from '../../../model/i-customer';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CustomerService} from '../../../service/customer.service';
import {CustomerTypeService} from '../../../service/customer-type.service';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customer: ICustomer;
  // CustomerTypes: ICustomerType[] = [];
  formEdit: FormGroup;
  user: FormGroup;
  idCustomer: number;

  constructor(private customerService: CustomerService,
              private customerTypeService: CustomerTypeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.formEdit = new FormGroup({
      name: new FormControl('', [Validators.required,
        Validators.pattern(
          '[a-zA-Z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪ' +
          'ễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      user: new FormGroup({
        username: new FormControl(''),
        password: new FormControl('', [Validators.required,
          Validators.pattern('^[0-9a-zA-Z]{6,12}$')])
      }),
      id: new FormControl(''),
      dayOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      idCard: new FormControl('', [Validators.required,
        Validators.pattern('^(\\d{9}|\\d{12})$')]),
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[A-Za-z0-9_.]{4,32}@([a-zA-Z0-9]{2,12})(.[a-zA-Z]{2,12})+$')]),
      phoneNumber: new FormControl('', [Validators.required,
        Validators.pattern('^([+84][\\d]{9})|([0]\\d{9})$')])
      // customerType: new FormControl('', Validators.required)
    });
  }


  // this.namedForm.addControl(this.name, new FormControl(''));
  ngOnInit(): void {
    this.idCustomer = Number(this.activatedRoute.snapshot.params.id);
    console.log(this.idCustomer);
    this.customerService.findById(this.idCustomer).subscribe(value => {
      this.customer = value;
      this.formEdit.patchValue(this.customer);
      this.formEdit.get('user').get('username').setValue(this.customer.user.username);
    });
  }

  saveEditing() {
    const customer = this.formEdit.value;
    console.log(this.formEdit);
    this.customerService.editObject(customer).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Khách hàng: ' + customer.name,
        title: 'Đã chỉnh sửa thành công',
        showConfirmButton: false,
        timer: 2700
      });
      this.router.navigateByUrl('customer/list');
    });
  }


}
