package projectbackend.service.room.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectbackend.dto.room.ISeatRoomDto;
import projectbackend.repository.room.ISeatRoomRepository;
import projectbackend.service.room.ISeatRoomService;

import java.util.List;

@Service
public class SeatRoomService implements ISeatRoomService {

    @Autowired
    ISeatRoomRepository iSeatRoomRepository;

    @Override
    public void updateSeatRoom(Integer idSeatRoom, Integer idSeatType) {
        if (idSeatType == 1) {
            idSeatType = 2;
        } else {
            idSeatType = 1;
        }
        iSeatRoomRepository.updateSeatRoom(idSeatRoom, idSeatType);
    }

    @Override
    public ISeatRoomDto findSeatRoomById(Integer id) {
        return iSeatRoomRepository.findSeatRoomById(id);
    }

    @Override
    public List<ISeatRoomDto> findSeatRoomByRoomId(Integer id) {
         return iSeatRoomRepository.findSeatRoomByRoomId(id);
    }
}
