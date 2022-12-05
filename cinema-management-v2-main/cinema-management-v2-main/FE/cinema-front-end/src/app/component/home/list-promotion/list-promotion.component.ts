import {Component, OnInit} from '@angular/core';
import {PromotionService} from "../../../service/promotion.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {IPromotion} from "../../../model/i-promotion";
import {IMovieBookingDto} from "../../../dto/i-movie-booking-dto";

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.css']
})
export class ListPromotionComponent implements OnInit {
  promotionList: IPromotion[];
  morePromotionList: IPromotion[];
  numberRecord = 0;
  content: boolean;
  totalRecord = 0;
  movieChoose: IMovieBookingDto;

  constructor(private promotionService: PromotionService,
              private title: Title,
              private router: Router) {
    this.title.setTitle('Trang chủ');
  }

  ngOnInit(): void {
    this.getPromotionList(this.numberRecord);
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
}
