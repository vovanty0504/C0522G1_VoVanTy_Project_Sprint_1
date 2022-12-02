import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IRoom} from '../../../model/i-room';
import {ITimes} from '../../../model/i-times';
import {RoomService} from 'src/app/service/room.service';
import {TimesService} from '../../../service/times.service';
import {MovieService} from '../../../service/movie.service';
import {IMovieType} from '../../../model/i-movie-type';

import {BehaviorSubject, Observable} from 'rxjs';

import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {IMovie} from '../../../model/i-movie';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movieObj: IMovie;
  formAddMovie: FormGroup;
  showTimeDto: FormGroup;
  movieTypeDto: FormArray;
  // time: FormArray;
  roomList: IRoom[] = [];
  timeList: ITimes[] = [];
  movieTypeList$: Observable<IMovieType[]>;
  submitted = false;
  selectedImage: any = null;
  imgUrl: string | ArrayBuffer;
  curDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

  constructor(private fb: FormBuilder,
              private roomService: RoomService,
              private timeService: TimesService,
              private movieService: MovieService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.getAllMovieType();
    this.getAllRoom();
    this.formAddMovie = this.fb.group({
      // employee: [],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      image: ['', [Validators.required]],
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
          room: new FormControl('', [Validators.required]),
          dateProjection: new FormControl(),
          times: new FormControl ('', [Validators.required])
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
    const item = this.formAddMovie.value.showTimeDto;
    console.log(item);
    const id = item.room.id;
    const endDate = this.formAddMovie.value.dateGroup.endDay;
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

  onCheckboxChange(movieTypeDto: IMovieType, event) {
    this.movieTypeDto = this.formAddMovie.controls.movieTypeDto as FormArray;
    const name = movieTypeDto.name;
    const isChecked = event.target.checked;
    if (isChecked) {
      this.movieTypeDto.push(new FormControl({movieTypeDto}));
      console.log(this.movieTypeDto.getRawValue());
    } else {
      const i = this.movieTypeDto.controls.findIndex(x => x.value === {name});
      this.movieTypeDto.removeAt(i);
    }
  }

  addMovie() {
    this.submitted = true;
    this.movieObj = this.formAddMovie.value;
    this.formAddMovie.value.showTimeDto.dateProjection = this.formAddMovie.value.dateGroup.endDay;
    const image = this.getCurrentDateTime() + this.selectedImage.name;
    const destinationFilename = 'Movie/' + image;
    const fileRef = this.storage.ref(destinationFilename);
    this.storage.upload(destinationFilename, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formAddMovie.patchValue({image: url});

          // Call API to create vaccine
          this.movieObj = this.formAddMovie.value;
          this.movieObj.startDay = this.formAddMovie.get('dateGroup').get('startDay').value;
          this.movieObj.endDay = this.formAddMovie.get('dateGroup').get('endDay').value;
          this.movieObj.image = url;
          this.imgUrl = this.movieObj.image;
          this.movieService.saveMovie(this.formAddMovie.value).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Thêm mới thành công!',
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
            this.formAddMovie.reset();
            this.router.navigateByUrl('/movie/list');
          }, error => {
            console.log(error);
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
