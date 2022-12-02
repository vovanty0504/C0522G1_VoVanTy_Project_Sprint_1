package projectbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectbackend.dto.room.IRoomDto;
import projectbackend.dto.room.ISeatRoomDto;
import projectbackend.dto.room.IdSeatTypeDTo;
import projectbackend.model.room.Room;
import projectbackend.service.room.IRoomService;
import projectbackend.service.room.ISeatRoomService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/room")
public class RoomRestController {

    @Autowired
    private IRoomService roomService;

    @Autowired
    private ISeatRoomService iSeatRoomService;

    @GetMapping("/list")
    public ResponseEntity<List<Room>> getListRoom() {
        List<Room> rooms = roomService.getListRoom();

        if (rooms.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        }
    }

    @GetMapping(value = "")
    public ResponseEntity<List<IRoomDto>> getAllRoom(@RequestParam Optional<String> name) {

        String keywordName = name.orElse("");

        List<IRoomDto> roomList = roomService.findAllRoom(keywordName);
        if (roomList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(roomList, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<IRoomDto> findRoomById(@PathVariable String id) {

        IRoomDto room = roomService.findRoomById(id);
        if (room == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(room, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/seat-room/{id}")
    public ResponseEntity<List<ISeatRoomDto>> findSeatRoomByRoomId(@PathVariable(value = "id") Integer id) {

        List<ISeatRoomDto> seatList = iSeatRoomService.findSeatRoomByRoomId(id);
        if (seatList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(seatList, HttpStatus.OK);
    }

    @PatchMapping(value = "/updateStatusSeatRoom/{idSeatRoom}/{idSeatType}")
    public ResponseEntity<IdSeatTypeDTo> updateSeatRoom(@PathVariable("idSeatRoom") Integer idSeatRoom,
                                                        @PathVariable("idSeatType") Integer idSeatType) {
        if (idSeatRoom == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (iSeatRoomService.findSeatRoomById(idSeatRoom) == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        this.iSeatRoomService.updateSeatRoom(idSeatRoom, idSeatType);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
