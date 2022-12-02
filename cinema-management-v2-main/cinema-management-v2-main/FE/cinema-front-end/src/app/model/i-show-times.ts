import {ITimes} from './i-times';
import {IMovie} from './i-movie';
import {IRoom} from './i-room';

export interface IShowTimes {
  id?: number;
  dateProjection?: string;
  times?: ITimes;
  movie?: IMovie;
  room?: IRoom;
}
