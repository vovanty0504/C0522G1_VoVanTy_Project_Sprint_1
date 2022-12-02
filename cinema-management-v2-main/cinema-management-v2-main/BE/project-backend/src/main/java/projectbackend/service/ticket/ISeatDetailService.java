package projectbackend.service.ticket;

import projectbackend.dto.booking_ticket.ISeatDetail;
import projectbackend.model.ticket.SeatDetail;

import java.util.List;
import java.util.Optional;

public interface ISeatDetailService {
    Optional<SeatDetail> findById(Integer id);

    List<ISeatDetail> findAllSeatDetail(Integer idShowTime);
}
