package projectbackend.service.show_times.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectbackend.dto.booking_ticket.IMovie;
import projectbackend.dto.booking_ticket.IShowDates;
import projectbackend.dto.booking_ticket.IShowTimes;
import projectbackend.model.show_times.ShowTimes;
import projectbackend.repository.show_times.IShowTimesRepository;
import projectbackend.service.show_times.IShowTimesService;

import java.util.List;


@Service
public class ShowTimesService implements IShowTimesService {
    @Autowired
    private IShowTimesRepository showTimesRepository;

    @Override
    public List<ShowTimes> getShowTime(Integer id) {
        return showTimesRepository.getShowTime(id);
    }

    @Override
    public List<ShowTimes> findAll() {
        return showTimesRepository.findAll();
    }

    @Override
    public List<IMovie> findAllMovie() {
        return showTimesRepository.findAllMovie();
    }

    @Override
    public List<IShowDates> findAllShowDate(Integer idMovie) {
        return showTimesRepository.findAllShowDate(idMovie);
    }

    @Override
    public List<IShowTimes> findAllShowTimesInDay(String showDate, Integer idMovie) {
        return showTimesRepository.findAllShowTimesInDay(showDate, idMovie);
    }

}
