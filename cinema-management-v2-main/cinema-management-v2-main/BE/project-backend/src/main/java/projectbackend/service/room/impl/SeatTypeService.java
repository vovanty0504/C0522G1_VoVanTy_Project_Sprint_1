package projectbackend.service.room.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectbackend.model.room.SeatType;
import projectbackend.repository.room.ISeatTypeRepository;
import projectbackend.service.room.ISeatTypeService;

import java.util.List;

@Service
public class SeatTypeService implements ISeatTypeService {
    @Autowired
    private ISeatTypeRepository seatTypeRepository;

    @Override
    public List<SeatType> findAll() {
        return seatTypeRepository.findAll();
    }
}
