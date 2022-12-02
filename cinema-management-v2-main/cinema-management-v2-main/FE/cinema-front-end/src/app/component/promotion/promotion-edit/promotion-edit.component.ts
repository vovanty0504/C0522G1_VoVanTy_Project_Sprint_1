import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {PromotionService} from '../../../service/promotion.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {IPromotion} from '../../../model/i-promotion';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.css']
})
export class PromotionEditComponent implements OnInit {
  promotionFormGroup: FormGroup;
  id: number;
  // image: string;
  selectedImage: any = null;
  curDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  promotion: IPromotion;
  imgUrl: string | ArrayBuffer;
  button = false;


  constructor(private promotionService: PromotionService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private title: Title,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.title.setTitle('Sửa thông tin khuyến mãi');
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.promotionService.getPromotionById(this.id).subscribe(promotion => {
      this.promotion = promotion;
      this.imgUrl = this.promotion.image;
      // this.image = promotion.image;
      this.promotionFormGroup = new FormGroup({
        image: new FormControl(promotion.image),
        name: new FormControl(promotion.name, [Validators.required,
          Validators.maxLength(150),
          Validators.pattern('^([A-Z][^@*&%#!<>]+[ ][^@*&%#!<>]+)$')]),
        dateFormGroup: new FormGroup({
          startTime: new FormControl(promotion.startTime, this.checkStartDate),
          endTime: new FormControl(promotion.endTime)
        }, this.checkEndDate),
        detail: new FormControl(promotion.detail, [Validators.required, Validators.maxLength(1000),
          Validators.pattern('^([A-Z][^@*&%#!<>]+[ ][^@*&%#!<>]+)$')]),
        discount: new FormControl(promotion.discount, [Validators.required, Validators.max(20), Validators.pattern('^([0-9]+)')])
      });
    }, error => {
      console.log(error);
    }, () => {
      console.log('OK!');
    });
  }

  editPromotion(id: number) {
    this.button = true;
    this.promotion = this.promotionFormGroup.value;
    this.promotion.startTime = this.promotionFormGroup.get('dateFormGroup').get('startTime').value;
    this.promotion.endTime = this.promotionFormGroup.get('dateFormGroup').get('endTime').value;
    const promotion = this.promotionFormGroup.value;
    console.log(this.promotion);
    if (this.selectedImage) {
      const image = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(image);
      this.storage.upload(image, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.promotionFormGroup.patchValue({image: url});
            this.promotion.image = url;
            this.imgUrl = this.promotion.image;
            // Call API to create vaccine
            this.promotionService.editPromotion(id, this.promotion).subscribe(() => {
              Swal.fire({
                icon: 'success',
                title: 'Chỉnh sửa  thành công!',
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
              console.log('Chỉnh sửa khuyến mãi thành công!');
            });
          });
        })
      ).subscribe();
    } else {
      this.imgUrl = this.promotion.image;
      this.promotionService.editPromotion(id, this.promotion).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Chỉnh sửa  thành công!',
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
        console.log('Chỉnh sửa khuyến mãi thành công!');
      });
    }
  }

  compareWithId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
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
