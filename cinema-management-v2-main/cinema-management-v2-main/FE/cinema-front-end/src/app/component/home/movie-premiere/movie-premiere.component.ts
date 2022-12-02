import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IMovieHome} from '../../../dto/i-movie-home';
import {MovieService} from '../../../service/movie.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-premiere',
  templateUrl: './movie-premiere.component.html',
  styleUrls: ['./movie-premiere.component.css']
})
export class MoviePremiereComponent implements OnInit {

  pageSize = 3;
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

  goToBookingTicket() {
    this.router.navigateByUrl('ticket/booking-ticket');
  }
}
