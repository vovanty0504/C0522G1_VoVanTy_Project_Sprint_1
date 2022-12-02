package projectbackend.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import projectbackend.common.validation.DateInput;
import projectbackend.dto.movie.*;
import projectbackend.model.movie.Movie;
import projectbackend.model.show_times.ShowTimes;
import projectbackend.service.movie.IMovieService;
import projectbackend.service.movie.IMovieTypeService;
import projectbackend.service.show_times.IShowTimesService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/movie")
public class MovieRestController {
    @Autowired
    private IMovieService iMovieService;

    @Autowired
    private IMovieTypeService movieTypeService;

    @Autowired
    private IShowTimesService showTimesService;

    private DateInput dateInput = new DateInput();

    //TruongNT function
    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<Optional<IMovieDto>> getMovieDetail(@PathVariable Integer id) {
        Optional<IMovieDto> movie = iMovieService.getMovieDetail(id);
        if (!movie.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    //NamHV function
    //6.5.1.1. Danh Sách Phim – Xem danh sách phim
    //6.5.1.3. Danh sách Phim – Tìm kiếm Phim
    @GetMapping("/list/home")
    public ResponseEntity<Page<IMovieDtoHome>> getAllMovie(@RequestParam(value = "name", defaultValue = "") String name,
                                                       @PageableDefault Pageable pageable) {
        Page<IMovieDtoHome> moviePage = iMovieService.findAllHome(name, pageable);
        if (moviePage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(moviePage, HttpStatus.OK);
    }

    @GetMapping("/list/premiere")
    public ResponseEntity<Page<IMovieDtoHome>> getAllPremiereSoonMovie(@RequestParam(value = "name", defaultValue = "") String name,
                                                           @PageableDefault Pageable pageable) {
        Page<IMovieDtoHome> moviePage = iMovieService.findAllPremiereSoon(name, pageable);

  

        if (moviePage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(moviePage, HttpStatus.OK);
    }


    //TriHM function
    @GetMapping(value = "/list")
    public ResponseEntity<Page<IMovieDto>> getList(Pageable pageable, @RequestParam(value = "name", defaultValue = "") String name) {
        Page<IMovieDto> movieList = iMovieService.findAllMovie(pageable, name);
        if (movieList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(movieList, HttpStatus.OK);
    }

    //TriHM function
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Movie> deleteMovie(@PathVariable Integer id) {
        Optional<Movie> movie = iMovieService.finById(id);
        if (movie.isPresent()) {
            iMovieService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    //QuyetND function
    @GetMapping("/{id}")
    public ResponseEntity<?> getMovie(@PathVariable int id) {
        Movie movie = iMovieService.getMovie(id);
        MovieDto movieDto = new MovieDto();
        if (movie != null) {
            List<ShowTimes> showTimes = showTimesService.getShowTime(id);
            BeanUtils.copyProperties(movie, movieDto);
            movieDto.setShowTimesDto(showTimes);
            return new ResponseEntity<>(movieDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(movieDto, HttpStatus.NO_CONTENT);

    }

    @GetMapping("/showTime/{id}")
    public ResponseEntity<List<ShowTimes>> getShowTime(@PathVariable int id) {
        List<ShowTimes> showTimeDto = iMovieService.getShowTime(id);
        return new ResponseEntity<>(showTimeDto, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMovie(@RequestBody @Valid MovieFullDto movieFullDto,
                                      BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(),
                    HttpStatus.BAD_REQUEST);
        } else if (dateInput.validateInput(movieFullDto)) {
            iMovieService.addMovieDto(movieFullDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    //QuyetND function
    @PatchMapping("/edit/{id}")
    public ResponseEntity<List<FieldError>> editMovie(@RequestBody @Valid MovieFullDto movieFullDto,
                                                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(),
                    HttpStatus.BAD_REQUEST);
        } else if (dateInput.validateInput(movieFullDto)) {
            iMovieService.editMovieDto(movieFullDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/movieType")
    public ResponseEntity<List<IMovieTypeDto>> getListMovieType() {
        List<IMovieTypeDto> movieTypes = movieTypeService.getListMovieType();

        if (movieTypes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(movieTypes, HttpStatus.OK);
        }
    }

    @GetMapping("/listMovie")
    public ResponseEntity<List<Movie>> getListMovie() {
        List<Movie> movie = iMovieService.getListMovie();
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    /**
     * creator: Phan Phước Đại
     * date:11/11/2022
     * method use statistical top movie positive
     */
    @GetMapping("/statement")
    public ResponseEntity<List<IMovieStatementDto>> getCustomerTop(@RequestParam(defaultValue = "0") int numberMonth) {
        if (numberMonth < 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<IMovieStatementDto> customerStatementDtoPage = iMovieService.getMovieTop(numberMonth);
        if (customerStatementDtoPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(customerStatementDtoPage, HttpStatus.OK);
    }

}

