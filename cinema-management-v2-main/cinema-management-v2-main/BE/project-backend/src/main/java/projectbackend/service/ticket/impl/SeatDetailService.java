package projectbackend.service.ticket.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectbackend.dto.booking_ticket.ISeatDetail;
import projectbackend.model.ticket.SeatDetail;
import projectbackend.repository.ticket.ISeatDetailRepository;
import projectbackend.service.ticket.ISeatDetailService;

import java.util.List;
import java.util.Optional;

@Service
public class SeatDetailService implements ISeatDetailService {
    @Autowired
    private ISeatDetailRepository seatDetailRepository;

    @Override
    public Optional<SeatDetail> findById(Integer id) {
        return seatDetailRepository.findById(id);
    }

    @Override
    public List<ISeatDetail> findAllSeatDetail(Integer idShowTime) {
        return seatDetailRepository.findAllSeatDetail(idShowTime);
    }
}
