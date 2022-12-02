package projectbackend.service.ticket.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import projectbackend.dto.ticket.ITicketDto;
import projectbackend.dto.ticket.ITicketManagerDto;
import projectbackend.dto.ticket.ITicketTyDto;
import projectbackend.model.ticket.Ticket;
import projectbackend.repository.ticket.ISeatDetailRepository;
import projectbackend.repository.ticket.ITicketRepository;
import projectbackend.service.ticket.ITicketService;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class TicketService implements ITicketService {
    @Autowired
    private ITicketRepository ticketRepository;

    @Autowired
    private ISeatDetailRepository seatDetailRepository;

    @Override
    public Optional<Ticket> findById(Integer id) {
        return ticketRepository.findById(id);
    }

    @Override
    public void updateTicketByUserName(String userNameUpdate) {
        ticketRepository.updateTicketByUserName(userNameUpdate);
    }

    @Override
    public Optional<Ticket> findTicketCustomerByUserName(String userName) {
        return ticketRepository.findTicketCustomerByUserName(userName);
    }

    @Override
    public List<ITicketDto> findTicketByUsername(String findTicketByUserName) {
        return ticketRepository.findTicketByUsername(findTicketByUserName);
    }

    @Override
    public void saveTicket(Ticket ticket) {
        ticketRepository.save(ticket);

        seatDetailRepository.setStatusSeatIsPending(ticket.getSeatDetail().getId());
    }

    @Override
    public Page<ITicketManagerDto> findAllByTicketManagerDto(Pageable pageable,
//                                                             Integer ticketId,
//                                                             Integer customerId,
                                                  String idCard, String phoneNumber) {
        return ticketRepository.findAllByTicketManagerDto(
                pageable,
//                ticketId,
//                customerId,
                idCard, phoneNumber);
    }

    @Override
    public Optional<ITicketManagerDto> findTicketManagerById(int id) {
        return ticketRepository.findTicketManagerById(id);
    }

    @Override
    public void editTicketManager(Integer id) {
        ticketRepository.editTicketManager(id);
    }

    /**
     * creator
     * Võ Văn Tý
     *vé đã đặt
     */
    @Override
    public Page<ITicketTyDto> findAllBookingTickets(Pageable pageable, String username) {
        return ticketRepository.findAllBookingTickets(username, pageable);
    }

    /**
     * creator
     * Võ Văn Tý
     * vé đã hủy
     */
    @Override
    public Page<ITicketTyDto> findAllCanceledTickets(Pageable pageable, String username) {
        return ticketRepository.findAllCanceledTickets(username, pageable);
    }

    /**
     * creator
     * Võ Văn Tý
     * lịch sử điểm cộng thêm tìm kiếm
     */
    @Override
    public Page<ITicketTyDto> findAllHistoryPoint(String username, String startTime, String endTime, Pageable pageable) {
        return ticketRepository.findAllHistoryPoint(username, startTime, endTime, pageable);
    }

    /**
     * creator
     * Võ Văn Tý
     * lịch sử điểm cộng thêm tìm kiếm theo ngày và lịch sử cộng điểm
     */
    @Override
    public Page<ITicketTyDto> findAllOfPointsAdded(String username, String startTime, String endTime, Pageable pageable) {
        return ticketRepository.findAllOfPointsAdded(username, startTime, endTime, pageable);
    }

    /**
     * creator
     * Võ Văn Tý
     * lịch sử điểm cộng thêm tìm kiếm theo ngày và lịch sử dùng điểm
     */
    @Override
    public Page<ITicketTyDto> findAllOfUsePoints(String username, String startTime, String endTime, Pageable pageable) {
        return ticketRepository.findAllOfUsePoints(username, startTime, endTime, pageable);

    }

    @Override
    public Optional<Ticket> findTicketById(Integer id) {
        return ticketRepository.findByIdTicket(id);
    }


    /**
     * creator
     * Võ Văn Tý
     * xóa vé
     */
    @Override
    public void deleteTicket(Integer id) {
        ticketRepository.deleteTicket(id);
    }


    /**
     * creator
     * Võ Văn Tý
     * lấy tên khách hàng và tổng điểmoo
     */
    @Override
    public Optional<ITicketTyDto> findByCustomerNameAndPoint(String username) {
        return ticketRepository.findByCustomerNameAndPoint(username);
    }

}
