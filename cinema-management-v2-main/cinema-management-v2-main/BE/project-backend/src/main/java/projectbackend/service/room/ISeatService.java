package projectbackend.service.room;

import projectbackend.model.room.Seat;

import java.util.List;

public interface ISeatService {
    List<Seat> findAll();
}
