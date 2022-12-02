package projectbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectbackend.dto.movie.ITimeDto;
import projectbackend.service.show_times.ITimesService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/showTime")
public class ShowTimesRestController {

    @Autowired
    private ITimesService timesService;

    @GetMapping("/time")
    public ResponseEntity<List<ITimeDto>> getTime(@RequestParam(value = "dateT", defaultValue = "") String dateProjection,
                                                  @RequestParam(value = "idRoom", defaultValue = "") Integer room) {
        List<ITimeDto> times = timesService.getTime(dateProjection, room);
        return new ResponseEntity<>(times, HttpStatus.OK);
    }
}
