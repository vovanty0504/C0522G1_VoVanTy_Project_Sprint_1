package projectbackend.repository.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import projectbackend.dto.movie.IMovieTypeDto;
import projectbackend.model.movie.MovieType;

import java.util.List;

public interface IMovieTypeRepository extends JpaRepository<MovieType, Integer> {

    @Query(value = "select id, name from movie_type where is_delete = 0 ", nativeQuery = true)
    List<IMovieTypeDto> findAllMovieType();
}
