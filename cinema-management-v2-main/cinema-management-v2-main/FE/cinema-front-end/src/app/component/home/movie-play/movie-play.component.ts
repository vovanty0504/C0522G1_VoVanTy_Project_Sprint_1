import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMovieHome} from '../../../dto/i-movie-home';
import {MovieService} from '../../../service/movie.service';
import {PromotionService} from '../../../service/promotion.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-play',
  templateUrl: './movie-play.component.html',
  styleUrls: ['./movie-play.component.css']
})
export class MoviePlayComponent implements OnInit {
  pageSize = 6;
  movieList$: Observable<IMovieHome[]> | undefined;
  total$: Observable<number>;
  movieNameSearch = '';
  action: boolean;

  constructor(private movieService: MovieService,
              private router: Router) { }
  ngOnInit(): void {
    this.paginate(this.movieNameSearch, this.pageSize);
    // this.getPromotionList(this.numberRecord);
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
  goToBookingTicket() {
    this.router.navigateByUrl('ticket/booking-ticket');
  }
}
