package projectbackend.service.ticket;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import projectbackend.dto.ticket.ITicketDto;
import projectbackend.dto.ticket.ITicketManagerDto;
import projectbackend.dto.ticket.ITicketTyDto;
import projectbackend.dto.ticket.TicketDto;
import projectbackend.model.ticket.Ticket;

import java.util.List;
import java.util.Optional;

public interface ITicketService {
    Optional<Ticket> findById(Integer id);

    void updateTicketByUserName(String userNameUpdate);

    Optional<Ticket> findTicketCustomerByUserName(String userName);

    List<ITicketDto> findTicketByUsername(String userName);

    void saveTicket(Ticket ticket);

    Page<ITicketManagerDto> findAllByTicketManagerDto(Pageable pageable,
//                                           Integer ticketId,
//                                           Integer customerId,
                                           String idCard,
                                           String phoneNumber
                                           );

    Optional<ITicketManagerDto> findTicketManagerById(int id);

    void editTicketManager(Integer id);

    Page<ITicketTyDto> findAllBookingTickets(Pageable pageable, String username);

    Page<ITicketTyDto> findAllCanceledTickets(Pageable pageable, String username);


    Page<ITicketTyDto> findAllHistoryPoint(String username, String startTime, String endTime, Pageable pageable);

    Page<ITicketTyDto> findAllOfPointsAdded(String username, String startTime, String endTime, Pageable pageable);

    Page<ITicketTyDto> findAllOfUsePoints(String username, String startTime, String endTime, Pageable pageable);


    void deleteTicket(Integer id);


    Optional<Ticket> findTicketById(Integer id);


    Optional<ITicketTyDto> findByCustomerNameAndPoint(String username);

}
