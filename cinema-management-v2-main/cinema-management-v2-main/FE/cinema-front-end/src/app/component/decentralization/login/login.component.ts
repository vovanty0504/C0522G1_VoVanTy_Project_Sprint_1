import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../../../service/token-storage.service';
import {AuthService} from '../../../service/auth.service';
import {ShareService} from '../../../service/share.service';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {JwtResponseService} from '../../../service/jwt-response-service';
import {AuthenticationService} from '../../../service/authentication.service';
import {UserService} from '../../../service/user.service';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  username: string;
  roles: string[] = [];
  returnUrl: string;
  socialUser: SocialUser;

  constructor(private authSocialService: SocialAuthService,
              private auth: AuthenticationService,
              private ref: ChangeDetectorRef,
              private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private shareService: ShareService,
              private title: Title) {
    title.setTitle('Đăng nhập');
    this.formGroup = this.formBuild.group({
        username: [''],
        password: [''],
        rememberMe: ['']
      }
    );
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    this.formGroup = this.formBuild.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember_me: ['']
      }
    );

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(
      data => {
        if (this.formGroup.value.remember_me) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.authService.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formGroup.reset();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: this.username + ' Đăng nhập thành công !',
          showConfirmButton: false,
          timer: 2000
        });
        this.shareService.sendClickEvent();
        window.location.replace('');
      },
      err => {
        this.authService.isLoggedIn = false;
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Người dùng/ mật khẩu không hợp lệ. Vui lòng thử lại!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }
  signInWithGoogle(): void {
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      const tokenGoogle = new JwtResponseService(this.socialUser.idToken);
      this.auth.google(tokenGoogle).subscribe(req => {
          if (req.token === '') {
            this.tokenStorageService.saveUser(req.user);
          } else {
            this.tokenStorageService.saveTokenLocal(req.accessToken);
            this.tokenStorageService.saveUserLocal(req.user);
            this.tokenStorageService.saveUserLocal(this.socialUser.email);
            this.username = this.socialUser.email;
            window.location.replace('');
          }
        },
        error => {
          console.log(error);
          this.logOut();
        });
    }).catch(
      err => {
        console.log(err);
      }
    );
  }

  logOut(): void {
    this.authSocialService.signOut().then(
      data => {
        this.tokenStorageService.logOut();
        window.location.reload();
      }
    );
  }
  whenExit() {
    this.tokenStorageService.signOut();
    this.username = '';
    this.router.navigateByUrl('');
  }
}
