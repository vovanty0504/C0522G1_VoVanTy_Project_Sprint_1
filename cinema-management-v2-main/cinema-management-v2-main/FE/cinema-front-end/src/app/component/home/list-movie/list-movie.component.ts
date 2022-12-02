import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MovieService} from '../../../service/movie.service';
import {IPromotion} from '../../../model/i-promotion';
import {PromotionService} from '../../../service/promotion.service';
import {Title} from '@angular/platform-browser';
import {IMovieDto} from '../../../dto/i-movie-dto';
import {HomeComponent} from '../home/home.component';
import {IMovieHome} from '../../../dto/i-movie-home';
import {Router} from '@angular/router';
import {IMovieBookingDto} from '../../../dto/i-movie-booking-dto';


@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css']
})
export class ListMovieComponent implements OnInit {
  pageSize = 6;
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
              private title: Title,
              private router: Router) {
    this.title.setTitle('Trang chủ');
  }

  ngOnInit(): void {
    this.paginate(this.movieNameSearch, this.pageSize);
    this.getPromotionList(this.numberRecord);
  }

  transmissionData(idClick: number, nameClick: string) {
    this.movieChoose = {id: idClick, name: nameClick};
    this.movieService.changeData(this.movieChoose);
  }

  paginate(movieNameSearch, pageSize) {
    this.movieService.findAllListMovie(movieNameSearch, pageSize).subscribe(data => {
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
    this.pageSize += 3;
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

  goToBookingTicket() {
    this.router.navigateByUrl('ticket/booking-ticket');
  }
}
