package projectbackend.service.show_times;

import projectbackend.dto.booking_ticket.IMovie;
import projectbackend.dto.booking_ticket.IShowDates;
import projectbackend.dto.booking_ticket.IShowTimes;
import projectbackend.model.show_times.ShowTimes;

import java.util.List;

public interface IShowTimesService {

    List<ShowTimes> getShowTime(Integer id);

    List<ShowTimes> findAll();

    List<IMovie> findAllMovie();

    List<IShowDates> findAllShowDate(Integer idMovie);

    List<IShowTimes> findAllShowTimesInDay(String showDate, Integer idMovie);

}
