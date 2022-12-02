
import {IMovieType} from './i-movie-type';
import {IEmployee} from './i-employee';

export interface IMovie {
  id?: number;
  name?: string;
  image?: string;
  startDay?: string;
  endDay?: string;
  director?: string;
  filmTime?: number;
  trailer?: string;
  content?: string;
  filmStudio?: string;
  actor?: string;
  version?: number;
  movieType?: IMovieType;
  employee?: IEmployee;
}
