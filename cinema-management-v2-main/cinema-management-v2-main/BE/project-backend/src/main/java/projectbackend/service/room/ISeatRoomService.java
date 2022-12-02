package projectbackend.service.room;

import projectbackend.dto.room.ISeatRoomDto;

import java.util.List;

public interface ISeatRoomService {

    void updateSeatRoom(Integer idSeatRoom, Integer idSeatType);

    ISeatRoomDto findSeatRoomById(Integer id);

    List<ISeatRoomDto> findSeatRoomByRoomId(Integer id);

}
