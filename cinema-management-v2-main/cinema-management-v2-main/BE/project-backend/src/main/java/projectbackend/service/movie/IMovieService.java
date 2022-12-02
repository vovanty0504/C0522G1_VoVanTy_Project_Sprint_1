package projectbackend.service.movie;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import projectbackend.dto.movie.IMovieDto;
import projectbackend.dto.movie.IMovieDtoHome;
import projectbackend.dto.movie.IMovieStatementDto;
import projectbackend.dto.movie.MovieFullDto;
import projectbackend.model.movie.Movie;
import projectbackend.model.show_times.ShowTimes;

import java.util.List;
import java.util.Optional;

public interface IMovieService {


    Optional<IMovieDto> getMovieDetail(Integer id);


    //NamHV
    //6.5.1.1. Danh Sách Phim – Xem danh sách phim
    //6.5.1.3. Danh sách Phim – Tìm kiếm Phim
    Page<IMovieDtoHome> findAllHome(String name, Pageable pageable);
    //phim sắp công chiếu
    Page<IMovieDtoHome> findAllPremiereSoon(String name, Pageable pageable);

    Page<IMovieDto> findAllMovie(Pageable pageable, String keyword);

    void deleteById(int idDelete);


    void addMovieDto(MovieFullDto movie);

    void editMovieDto(MovieFullDto movieFullDto);


    Movie getMovie(Integer id);

    List<ShowTimes> getShowTime(Integer id);

    Optional<Movie> finById(Integer id);

    List<Movie> getListMovie();

    List<Movie> findAll();

    /**
     * creator: Phan PhÆ°á»›c Äáº¡i
     * date:11/11/2022
     * method use statistical top movie positive
     */
    List<IMovieStatementDto> getMovieTop(int numberMonth);

}
