import {IMovieType} from '../model/i-movie-type';
import {IShowTimes} from '../model/i-show-times';

export interface IMovieDto {
  id?: number;
  name?: string;
  image?: string;
  startDay?: string;
  endDay?: string;
  director?: string;
  filmTime?: string;
  trailer?: string;
  content?: string;
  filmStudio?: string;
  actor?: string;
  version?: string;
  movieTypeDto?: IMovieType;
  showTimeDto?: IShowTimes[];
}
