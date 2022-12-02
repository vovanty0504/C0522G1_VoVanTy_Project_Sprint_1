import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import Swal from 'sweetalert2';
import {IResetPassRequest} from '../../../model/i-reset-pass-request';


@Component({
  selector: 'app-verify-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.scss']
})
export class ConfirmResetPasswordComponent implements OnInit {
  formResetPass: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formResetPass = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],

    }, {validators: this.ConfirmedValidator('password', 'confirmPassword')});
  }

  get password() {
    return this.formResetPass.get('password');
  }

  get confirmPassword() {
    return this.formResetPass.get('confirmPassword');
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  comfirmResetPassword() {
    if (this.formResetPass.valid) {
      const token = this.activateRoute.snapshot.paramMap.get('token');
      const iResetPassRequest: IResetPassRequest = {
        password: this.password.value,
        confirmPassword: this.confirmPassword.value,
        token
      };

      this.authService.resetPassword(iResetPassRequest).subscribe(
        data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đổi mật khẩu thành công !',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigateByUrl('/login');
        },
        error => {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Đổi mật khẩu thất bại !',
            showConfirmButton: false,
            timer: 2000
          });
        });
    }
  }
}
