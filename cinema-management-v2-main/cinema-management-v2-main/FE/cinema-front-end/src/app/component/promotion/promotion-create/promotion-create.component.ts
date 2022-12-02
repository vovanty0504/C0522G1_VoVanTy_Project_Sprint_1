import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PromotionService} from '../../../service/promotion.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {IPromotion} from '../../../model/i-promotion';


@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.css']
})

export class PromotionCreateComponent implements OnInit {
  promotionFormGroup: FormGroup = new FormGroup({
    image: new FormControl(),
    name: new FormControl('', [Validators.required,
      Validators.maxLength(150),
      Validators.pattern('^([A-Z][^@*&%#!<>]+[ ][^@*&%#!<>]+)$')]),
    dateFormGroup: new FormGroup({
      startTime: new FormControl('', this.checkStartDate),
      endTime: new FormControl('')
    }, this.checkEndDate),
    detail: new FormControl('', [Validators.required, Validators.maxLength(1000),
      Validators.pattern('^([A-Z][^@*&%#!<>]+[ ][^@*&%#!<>]+)$')]),
    discount: new FormControl('', [Validators.required, Validators.max(50), Validators.pattern('^([0-9]+)')])
  });
  selectedImage: any = null;
  curDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  promotion: IPromotion;
  imgUrl: string | ArrayBuffer = 'https://png.pngtree.com/png-vector/20190916/ourlarge' +
    '/pngtree-gallery-icon-for-your-project-png-image_1731100.jpg';
  button = false;

  constructor(private promotionService: PromotionService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.imgUrl = this.promotion.image;
  }

  submit(): void {
    this.button = true;
    const promotion = this.promotionFormGroup.value;
    const image = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(image);
    this.storage.upload(image, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.promotionFormGroup.patchValue({image: url});

          // Call API to create vaccine
          this.promotion = this.promotionFormGroup.value;
          this.promotion.startTime = this.promotionFormGroup.get('dateFormGroup').get('startTime').value;
          this.promotion.endTime = this.promotionFormGroup.get('dateFormGroup').get('endTime').value;
          this.promotionService.createPromotion(this.promotion).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Thêm mới thành công!',
              text: promotion.name,
              width: 600,
              padding: '3em',
              color: '#716add'
            });
            this.promotionFormGroup.reset();
          }, error => {
            console.log(error);
          }, () => {
            this.router.navigateByUrl('/promotion/list');
            console.log('Thêm mới khuyến mãi thành công!');
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
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  checkStartDate(abstractControl: AbstractControl): any {
    const formYear = Number(new Date(abstractControl.value).getFullYear());
    const formMonth = Number(new Date(abstractControl.value).getMonth() + 1);
    const formDay = Number(new Date(abstractControl.value).getDate());
    if (formYear > new Date().getFullYear()) {
      return null;
    }

    if (formYear < new Date().getFullYear()) {
      return {invalidStartDate: true};
    }

    if (formMonth > new Date().getMonth() + 1) {
      return null;
    }

    if (formMonth < new Date().getMonth() + 1) {
      return {invalidStartDate: true};
    }

    return (formDay >= new Date().getDate()) ? null : {invalidStartDate: true};
  }

  checkEndDate(abstractControl: AbstractControl): any {
    console.log(new Date(abstractControl.value.startTime));
    const formStartYear = new Date(abstractControl.value.startTime).getFullYear();
    const formStartMonth = new Date(abstractControl.value.startTime).getMonth() + 1;
    const formStartDay = new Date(abstractControl.value.startTime).getDate();
    console.log(formStartDay + '-' + formStartMonth + '-' + formStartYear);
    console.log(formStartDay);
    const formEndYear = new Date(abstractControl.value.endTime).getFullYear();
    const formEndMonth = new Date(abstractControl.value.endTime).getMonth() + 1;
    const formEndDay = new Date(abstractControl.value.endTime).getDate();

    if (formEndYear > formStartYear) {
      return null;
    }

    if (formEndYear < formStartYear) {
      return {invalidEndDate: true};
    }

    if (formEndMonth > formStartMonth) {
      return null;
    }

    if (formEndMonth < formStartMonth) {
      return {invalidEndDate: true};
    }

    return (formEndDay >= formStartDay) ? null : {invalidEndDate: true};
  }
}
