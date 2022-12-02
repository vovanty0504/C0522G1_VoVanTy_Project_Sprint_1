package projectbackend.service.room;

import projectbackend.dto.room.IRoomDto;
import projectbackend.model.room.Room;

import java.util.List;

public interface IRoomService {
    List<Room> getListRoom();

    List<IRoomDto> findAllRoom(String name);

    IRoomDto findRoomById(String id);
}
