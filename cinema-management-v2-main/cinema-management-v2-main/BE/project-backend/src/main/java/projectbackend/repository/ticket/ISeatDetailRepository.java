package projectbackend.repository.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import projectbackend.dto.booking_ticket.ISeatDetail;
import projectbackend.model.ticket.SeatDetail;

import java.util.List;

@Transactional
public interface ISeatDetailRepository extends JpaRepository<SeatDetail, Integer> {
    @Query(value = "select seat_detail.id as id, seat_room.room_id as roomId, seat_room.seat_type_id as seatTypeId, " +
            "seat.name as seatName, seat_type.price as price, seat_detail.show_time_id as showTimeId, " +
            "seat_detail.status_seat as seatStatus " +
            "from seat_detail " +
            "join show_times on seat_detail.show_time_id=show_times.id " +
            "join seat_room on seat_detail.seat_room_id=seat_room.id join seat on seat.id=seat_room.seat_id " +
            "join seat_type on seat_type.id = seat_room.seat_type_id " +
            "where show_times.id = :idShowTime and seat_room.is_delete = 0 " +
            "order by seat_detail.id;",
            nativeQuery = true)
    List<ISeatDetail> findAllSeatDetail(@Param("idShowTime") Integer idShowTime);

    @Modifying
    @Query(value = "update seat_detail set status_seat = true where id = :idSeatDetail and is_delete = 0",
            nativeQuery = true)
    void setStatusSeatIsPending(@Param("idSeatDetail") Integer idSeatDetail);
}
