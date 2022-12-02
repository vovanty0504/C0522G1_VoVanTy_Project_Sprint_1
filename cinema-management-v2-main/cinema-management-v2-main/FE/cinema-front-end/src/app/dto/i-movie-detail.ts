import {IMovieType} from '../model/i-movie-type';

export interface IMovieDetail {
  id?: number;
  name?: string;
  image?: string;
  startDay?: string;
  endDay?: string;
  director?: string;
  filmTime?: number;
  trailer?: string;
  showTimeDate?: string;
  movieType?: IMovieType;
  content?: string;
  filmStudio?: string;
  actor?: string;
  version?: string;

}
