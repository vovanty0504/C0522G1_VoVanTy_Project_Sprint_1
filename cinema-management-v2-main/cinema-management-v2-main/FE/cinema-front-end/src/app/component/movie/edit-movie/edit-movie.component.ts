import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IRoom} from '../../../model/i-room';
import {ITimes} from '../../../model/i-times';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMovieType} from '../../../model/i-movie-type';
import {RoomService} from '../../../service/room.service';
import {TimesService} from '../../../service/times.service';
import {MovieService} from '../../../service/movie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IMovieDto} from '../../../dto/i-movie-dto';
import {IShowTimes} from '../../../model/i-show-times';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  formEditMovie: FormGroup;
  showTimeDto: FormGroup;
  movieTypeDto: FormArray;
  // time: FormArray;
  roomList: IRoom[] = [];
  timeList: ITimes[] = [];
  movieTypeList$: Observable<IMovieType[]>;
  dateProjection: string;
  movieDto: IMovieDto;
  showTime: IShowTimes[];
  submitted = false;
  selectedImage: any = null;
  replaceImage = false;
  id: number;
  imgUrl: string | ArrayBuffer;
  curDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();


  constructor(private fb: FormBuilder,
              private roomService: RoomService,
              private timeService: TimesService,
              private movieService: MovieService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.getAllMovieType();
    this.getAllRoom();
    // console.log('imgUrl' + this.movieDto.image);
    const id = this.activatedRoute.snapshot.params.id;
    this.movieService.getMovieById(id).subscribe(val => {
      this.movieDto = val;
      this.imgUrl = this.movieDto.image;
      this.showTime = val.showTimeDto;
      this.id = val.id;
      this.formEditMovie.patchValue(this.movieDto);
      this.formEditMovie.get('dateGroup').get('startDay').setValue(this.movieDto.startDay);
      this.formEditMovie.get('dateGroup').get('endDay').setValue(this.movieDto.endDay);
      // this.formEditMovie.get('image').setValue(this.movieDto.image);
      console.log(this.showTime);
      this.formEditMovie.get('showTimeDto').get('room').setValue(this.showTime[0].room);
      this.getInfo();
      this.formEditMovie.get('showTimeDto').get('times').setValue(this.showTime[0].times);
      this.formEditMovie.get('showTimeDto').get('movie').setValue(this.showTime[0].movie);
      console.log(this.formEditMovie.value);
    });
    this.formEditMovie = this.fb.group({
      id: [],
      // employee: [],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      image: [],
      dateGroup: new FormGroup({
        startDay: new FormControl('', this.checkStartDate),
        endDay: new FormControl('')
      }, this.checkEndDate),
      director: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^([A-Z][^0-9@*&%#!<>]+[ ][^0-9@*&%#!<>]+)$')]],
      filmTime: ['', [Validators.required, Validators.max(120), Validators.pattern('^([0-9]+)')]],
      trailer: ['', [Validators.required]],
      content: [],
      filmStudio: ['', [Validators.required, Validators.maxLength(40)]],
      actor: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^([A-Z][^0-9@*&%#!<>]+[ ][^0-9@*&%#!<>]+)$')]],
      version: ['', [Validators.required]],
      movieTypeDto: this.fb.array([]),
      showTimeDto:
        new FormGroup({
          movie: new FormControl(''),
          room: new FormControl('', [Validators.required]),
          dateProjection: new FormControl(),
          times: new FormControl('', [Validators.required])
        })
    });
  }

  getAllRoom() {
    this.roomService.getAllRoom().subscribe(value => {
      this.roomList = value;
      console.log(value);
    });
  }

  getInfo() {
    const item = this.formEditMovie.value.showTimeDto;
    console.log(item);
    const id = item.room.id;
    const endDate = this.formEditMovie.value.dateGroup.endDay;
    console.log(id, endDate);
    this.timeService.getAllTime(id, endDate).subscribe(value => {
      this.timeList = value;
      console.log(value);
    });
  }

  private getAllMovieType() {
    this.movieService.getAllMovieType().subscribe(value => {
      this.movieTypeList$ = new BehaviorSubject(value);
      console.log(value);
    });
  }

  onCheckboxChange(movieType: IMovieType, event) {
    this.movieTypeDto = this.formEditMovie.controls.movieType as FormArray;
    const name = movieType.name;
    const isChecked = event.target.checked;
    if (isChecked) {
      this.movieTypeDto.push(new FormControl(name));
      console.log(this.movieTypeDto.getRawValue());
    } else {
      const i = this.movieTypeDto.controls.findIndex(x => x.value === {name});
      this.movieTypeDto.removeAt(i);
    }
  }

  editMovie() {
    // this.submitted = true;
    this.formEditMovie.value.showTimeDto.dateProjection = this.formEditMovie.value.dateGroup.endDay;
    this.movieDto = this.formEditMovie.value;
    this.movieDto.startDay = this.formEditMovie.get('dateGroup').get('startDay').value;
    this.movieDto.endDay = this.formEditMovie.get('dateGroup').get('endDay').value;
    if (this.replaceImage) {
      const image = this.getCurrentDateTime() + this.selectedImage.name;
      const destinationFilename = 'Movie/' + image;
      const fileRef = this.storage.ref(destinationFilename);
      this.storage.upload(destinationFilename, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formEditMovie.patchValue({image: url});
            // this.imgUrl = this.movieDto.image;
            // Call API to create vaccine
            this.movieService.editMovie(this.formEditMovie.value).subscribe(() => {
              Swal.fire({
                icon: 'success',
                title: 'Chỉnh sửa thành công!',
                // text: mo.name,
                width: 600,
                padding: '3em',
                color: '#716add',
                // background: '#fff url(/images/trees.png)',
                backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
              });
              this.formEditMovie.reset();
              this.router.navigateByUrl('/movie/list');
            }, error => {
              console.log(error);
            });
          });
        })
      ).subscribe();
    } else {
      // this.imgUrl = this.movieDto.image;
      this.movieService.editMovie(this.formEditMovie.value).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Chỉnh sửa thành công!',
          // text: mo.name,
          width: 600,
          padding: '3em',
          color: '#716add',
          // background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        });
        this.formEditMovie.reset();
        this.router.navigateByUrl('/movie/list');
      }, error => {
        console.log(error);
      });
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imgUrl = reader.result;

      reader.readAsDataURL(file);
      this.replaceImage = true;
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  compareWithId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

  compareWithTimeId(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
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
    console.log(new Date(abstractControl.value.startDay));
    const formStartYear = new Date(abstractControl.value.startDay).getFullYear();
    const formStartMonth = new Date(abstractControl.value.startDay).getMonth() + 1;
    const formStartDay = new Date(abstractControl.value.startDay).getDate();
    console.log(formStartDay + '-' + formStartMonth + '-' + formStartYear);
    console.log(formStartDay);
    const formEndYear = new Date(abstractControl.value.endDay).getFullYear();
    const formEndMonth = new Date(abstractControl.value.endDay).getMonth() + 1;
    const formEndDay = new Date(abstractControl.value.endDay).getDate();

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
