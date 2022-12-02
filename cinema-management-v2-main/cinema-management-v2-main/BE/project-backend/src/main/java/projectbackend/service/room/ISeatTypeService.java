package projectbackend.service.room;

import projectbackend.model.room.SeatType;

import java.util.List;

public interface ISeatTypeService {
    List<SeatType> findAll();
}
