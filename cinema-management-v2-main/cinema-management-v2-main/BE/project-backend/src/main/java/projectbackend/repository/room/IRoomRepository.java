package projectbackend.repository.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import projectbackend.dto.room.IRoomDto;
import projectbackend.model.room.Room;

import java.util.List;

public interface IRoomRepository extends JpaRepository<Room, Integer> {
    @Query(value = "SELECT  " +
            "    room.id AS roomId, room.name AS roomName, room.maximum_seats_in_room AS maximumSeatsInRoom " +
            "FROM " +
            "    room " +
            "WHERE " +
            "    room.is_delete = 0 AND name LIKE %:name%", nativeQuery = true)
    List<IRoomDto> findAllRoom(@Param("name") String name);

    @Query(value = "SELECT room.id AS roomId, room.name AS roomName FROM room where id= :id",nativeQuery = true)
    IRoomDto findRoomById(@Param("id") String id);
}
