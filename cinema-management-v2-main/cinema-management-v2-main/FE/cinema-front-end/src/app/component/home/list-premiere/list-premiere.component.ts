import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MovieDto} from '../../../dto/movie-dto';
import {MovieService} from '../../../service/movie.service';
import {IPromotion} from '../../../model/i-promotion';
import {PromotionService} from '../../../service/promotion.service';
import {Title} from '@angular/platform-browser';
import {IMovieDto} from '../../../dto/i-movie-dto';
import {IMovieHome} from '../../../dto/i-movie-home';
import {IMovieBookingDto} from '../../../dto/i-movie-booking-dto';

@Component({
  selector: 'app-list-premiere',
  templateUrl: './list-premiere.component.html',
  styleUrls: ['./list-premiere.component.css']
})
export class ListPremiereComponent implements OnInit {
  pageSize = 3;
  movieList$: Observable<IMovieHome[]> | undefined;
  total$: Observable<number>;
  movieNameSearch = '';
  action: boolean;
  promotionList: IPromotion[];
  morePromotionList: IPromotion[];
  numberRecord = 0;
  content: boolean;
  totalRecord = 0;
  movieChoose: IMovieBookingDto;

  constructor(private movieService: MovieService,
              private promotionService: PromotionService,
              private title: Title) {
    this.title.setTitle('Trang chủ');
  }

  ngOnInit(): void {
    this.paginate(this.movieNameSearch, this.pageSize);
    this.getPromotionList(this.numberRecord);
  }

  paginate(movieNameSearch, pageSize) {
    this.movieService.findAllListPremiereSoonMovie(movieNameSearch, pageSize).subscribe(data => {
      console.log(data);
      if (data != null) {
        this.action = true;
        this.movieList$ = new BehaviorSubject<IMovieHome[]>(data.content);
        this.total$ = new BehaviorSubject<number>(data.totalElements);
      } else {
        this.action = false;
      }
    });
  }

  nextPage() {
    this.pageSize += 1;
    this.paginate(this.movieNameSearch, this.pageSize);
  }

  getPromotionList(numberP: number) {
    this.promotionService.getAllPromotion(numberP).subscribe(value => {
      // @ts-ignore
      this.totalRecord = Math.ceil(value.totalElements / 4);
      if (value != null) {
        this.content = true;
        if (this.numberRecord === 0) {
          // @ts-ignore
          this.promotionList = value.content;
        } else {
          // @ts-ignore
          this.morePromotionList = value.content;
          this.promotionList = this.promotionList.concat(this.morePromotionList);
        }
      } else {
        this.content = false;
      }
    });
  }

  loadMore() {
    this.numberRecord += 1;
    this.getPromotionList(this.numberRecord);
  }
  transmissionData(idClick: number, nameClick: string) {
    this.movieChoose = {id: idClick, name: nameClick};
    this.movieService.changeData(this.movieChoose);
  }
}
