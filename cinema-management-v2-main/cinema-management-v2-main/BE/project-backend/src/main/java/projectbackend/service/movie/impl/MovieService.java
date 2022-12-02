package projectbackend.service.movie.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import projectbackend.dto.movie.IMovieDto;
import projectbackend.dto.movie.IMovieDtoHome;
import projectbackend.dto.movie.IMovieStatementDto;
import projectbackend.dto.movie.MovieFullDto;
import projectbackend.model.movie.Movie;
import projectbackend.model.show_times.ShowTimes;
import projectbackend.repository.movie.IMovieRepository;
import projectbackend.repository.show_times.IShowTimesRepository;
import projectbackend.service.movie.IMovieService;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService implements IMovieService {

    @Autowired
    private IMovieRepository iMovieRepository;
    @Autowired
    private IShowTimesRepository showTimesRepository;

    @Override
    public Optional<IMovieDto> getMovieDetail(Integer id) {
        return iMovieRepository.movieDetail(id);
    }

    //NamHV
    //6.5.1.1. Danh Sách Phim – Xem danh sách phim
    //6.5.1.3. Danh sách Phim – Tìm kiếm Phim
    @Override
    public Page<IMovieDtoHome> findAllHome(String name, Pageable pageable) {
        return iMovieRepository.findAllHome(name, pageable);
    }

    @Override

    public Page<IMovieDtoHome> findAllPremiereSoon(String name, Pageable pageable) {
        return iMovieRepository.findAllPremiereSoon(name,pageable);
    }

    @Override

    public Page<IMovieDto> findAllMovie(Pageable pageable, String keyword) {
        return iMovieRepository.findAllMovie(pageable, keyword);
    }

    @Override
    public void deleteById(int idDelete) {
        iMovieRepository.deleteById(idDelete);
    }

    @Override
    public void addMovieDto(MovieFullDto movieFullDto) {
        Movie movie = new Movie();
        BeanUtils.copyProperties(movieFullDto, movie);
        Movie movie1 = iMovieRepository.save(movie);
        ShowTimes showTimes = new ShowTimes();
        BeanUtils.copyProperties(movieFullDto.getShowTimeDto(), showTimes);
        showTimes.setMovie(movie1);
        showTimesRepository.save(showTimes);

    }

    @Override
    public void editMovieDto(MovieFullDto movieFullDto) {
        Movie movie = new Movie();
        BeanUtils.copyProperties(movieFullDto, movie);
        iMovieRepository.save(movie);
        ShowTimes showTimes = new ShowTimes();
        BeanUtils.copyProperties(movieFullDto.getShowTimeDto(), showTimes);
        showTimesRepository.save(showTimes);
    }


    @Override
    public Movie getMovie(Integer id) {
        return iMovieRepository.findMovieById(id);
    }

    @Override
    public List<ShowTimes> getShowTime(Integer id) {
        return iMovieRepository.findShowTimeById(id);
    }

    @Override
    public Optional<Movie> finById(Integer id) {
        return iMovieRepository.findById(id);
    }


    @Override
    public List<Movie> getListMovie() {
        return iMovieRepository.findAll();
    }


    @Override
    public List<Movie> findAll() {
        return iMovieRepository.findAll();
    }

    /**
     * creator: Phan PhÆ°á»›c Äáº¡i
     * date:11/11/2022
     * method use statistical top movie positive
     */
    @Override
    public List<IMovieStatementDto> getMovieTop(int numberMonth) {
        if (numberMonth == 0) {
            return iMovieRepository.getMovieTop();
        }
        return iMovieRepository.getMovieTop(numberMonth);
    }


}
