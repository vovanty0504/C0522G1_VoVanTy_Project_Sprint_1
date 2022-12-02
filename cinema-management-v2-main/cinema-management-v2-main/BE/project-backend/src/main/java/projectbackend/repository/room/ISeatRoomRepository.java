package projectbackend.repository.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import projectbackend.dto.room.ISeatRoomDto;
import projectbackend.model.room.SeatRoom;

import java.util.List;

@Transactional
public interface ISeatRoomRepository extends JpaRepository<SeatRoom, Integer> {
    @Modifying
    @Query(value = "UPDATE seat_room  " +
            "SET  " +
            "    seat_type_id = :idSeatType " +
            "WHERE " +
            "    id = :idSeatRoom ",nativeQuery = true)
    void updateSeatRoom(@Param("idSeatRoom") Integer idSeatRoom,@Param("idSeatType") Integer idSeatType);

    @Query(value = "SELECT " +
            "    seat_room.id AS id, " +
            "    seat.name AS seatName, " +
            "    seat_type_id AS seatType, " +
            "    seat_type.name AS seatTypeName " +
            "FROM " +
            "    seat_room " +
            "        JOIN " +
            "    seat_type ON seat_type.id = seat_type_id " +
            "        JOIN " +
            "    seat ON seat.id = seat_id " +
            "WHERE " +
            "    seat_room.id = :id", nativeQuery = true)
    public ISeatRoomDto findSeatRoomById(@Param(value = "id") Integer id);

    @Query(value = "SELECT \n" +
            "    seat_room.id AS id,\n" +
            "    seat.name AS seatName,\n" +
            "    seat_type_id AS seatTypeId,\n" +
            "    seat_type.name AS seatTypeName\n" +
            "FROM\n" +
            "    seat_room\n" +
            "        JOIN\n" +
            "    seat_type ON seat_type.id = seat_type_id\n" +
            "        JOIN\n" +
            "    seat ON seat.id = seat_id\n" +
            "WHERE\n" +
            "    room_id = :id\n" +
            "ORDER BY seat.name", nativeQuery = true)
    List<ISeatRoomDto> findSeatRoomByRoomId(@Param("id") Integer id);
}
