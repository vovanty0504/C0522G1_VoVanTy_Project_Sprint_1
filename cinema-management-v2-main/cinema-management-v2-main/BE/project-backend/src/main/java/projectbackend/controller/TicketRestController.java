package projectbackend.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectbackend.dto.booking_ticket.IMovie;
import projectbackend.dto.booking_ticket.ISeatDetail;
import projectbackend.dto.booking_ticket.IShowDates;
import projectbackend.dto.booking_ticket.IShowTimes;
import projectbackend.dto.ticket.ITicketDto;
import projectbackend.dto.ticket.ITicketManagerDto;
import projectbackend.dto.ticket.ITicketTyDto;
import projectbackend.dto.ticket.TicketDto;
import projectbackend.jwt.JwtTokenUtil;
import projectbackend.model.customer.Customer;
import projectbackend.model.decentralization.User;
import projectbackend.model.ticket.SeatDetail;
import projectbackend.model.ticket.Ticket;
import projectbackend.service.customer.ICustomerService;
import projectbackend.service.decentralization.IUserService;
import projectbackend.service.show_times.IShowTimesService;
import projectbackend.service.ticket.ISeatDetailService;
import projectbackend.service.ticket.ITicketService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ticket")
@CrossOrigin("*")
public class TicketRestController {
    @Autowired
    private IShowTimesService showTimesService;

    @Autowired
    private ISeatDetailService seatDetailService;

    @Autowired
    private ITicketService ticketService;

    @Autowired
    private ICustomerService customerService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private IUserService userService;

    @PutMapping("/update-ticket")
    public ResponseEntity<Ticket> updateStatusTicket(HttpServletRequest request) {
//        System.out.println(request);
//        String headerAuth = request.getHeader("Authorization");
//        String userNameUpdate = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));
//        System.out.println(userNameUpdate);
        String userNameUpdate = "customer";
        Optional<Ticket> ticket = ticketService.findTicketCustomerByUserName(userNameUpdate);
        if (ticket.isPresent()) {
            System.out.println(userNameUpdate);
            System.out.println(ticket.get().getStatusTicket());
            ticketService.updateTicketByUserName(userNameUpdate);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/list-ticket")
    public ResponseEntity<List<ITicketDto>> showInformationTicket(HttpServletRequest request) {

        String headerAuth = request.getHeader("Authorization");
        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));

        List<ITicketDto> ticketDto = ticketService.findTicketByUsername(username);
        System.out.println(username);
        if (ticketDto.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ticketDto, HttpStatus.OK);
    }

    @GetMapping("/movie")
    public ResponseEntity<List<IMovie>> showMovieIn7NextDay() {
        List<IMovie> movies = showTimesService.findAllMovie();

        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/show-date/{idMovie}")
    public ResponseEntity<List<IShowDates>> showDateByMovie(@PathVariable Integer idMovie) {
        List<IShowDates> showDates = showTimesService.findAllShowDate(idMovie);

        if (showDates.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showDates, HttpStatus.OK);
    }

    @GetMapping("/showtime/{showDate}&{idMovie}")
    public ResponseEntity<List<IShowTimes>> showTimeByShowDate(@PathVariable("showDate") String showDate,
                                                               @PathVariable("idMovie") Integer idMovie) {
        List<IShowTimes> showTimes = showTimesService.findAllShowTimesInDay(showDate, idMovie);

        if (showTimes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(showTimes, HttpStatus.OK);
    }

    @GetMapping("/seat-detail/{idShowTime}")
    public ResponseEntity<List<ISeatDetail>> showAllSeatDetail(@PathVariable Integer idShowTime) {
        List<ISeatDetail> seatDetails = seatDetailService.findAllSeatDetail(idShowTime);

        if (seatDetails.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(seatDetails, HttpStatus.OK);
    }

    @PostMapping("/add-pending-ticket")
    public ResponseEntity<Ticket> addPendingTicket(@RequestBody TicketDto ticketDto) {
        Ticket ticket = new Ticket();
        BeanUtils.copyProperties(ticketDto, ticket);
        ticketService.saveTicket(ticket);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-customer")
    public ResponseEntity<Customer> getCustomerByUsername(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));
        Customer customer = customerService.findByUsername(username);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping("/seat/{idSeatDetail}")
    public ResponseEntity<SeatDetail> getSeatDetailById(@PathVariable Integer idSeatDetail) {
        Optional<SeatDetail> seatDetail = seatDetailService.findById(idSeatDetail);
        return seatDetail.map(detail -> new ResponseEntity<>(detail, HttpStatus.OK)).orElseGet(()
                -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/list-ticket-manager")
    public ResponseEntity<Page<ITicketManagerDto>> findAllTicket(
            Pageable pageable,
//            @RequestParam(value = "ticketId", defaultValue = "") Integer ticketId,
//            @RequestParam(value = "customerId", defaultValue = "") Integer customerId,
            @RequestParam(value = "idCard", defaultValue = "") String idCard,
            @RequestParam(value = "phoneNumber", defaultValue = "") String phoneNumber) {
        Page<ITicketManagerDto> iTicketManagerDtoList = ticketService.findAllByTicketManagerDto(
                pageable
//                , ticketId
//                , customerId
                , idCard
                , phoneNumber);
        if (iTicketManagerDtoList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(iTicketManagerDtoList, HttpStatus.OK);
        }
    }

    @PatchMapping("/edit-ticket-by/{id}")
    public ResponseEntity<Optional<ITicketManagerDto>> editTicketManagerDto(@PathVariable Integer id) {
        Optional<ITicketManagerDto> ticket = ticketService.findTicketManagerById(id);
        if (ticket.isPresent()) {
            ticketService.editTicketManager(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/find-ticket-by/{id}")
    public ResponseEntity<Optional<ITicketManagerDto>> findTicketManagerDtoById(@PathVariable Integer id) {
        Optional<ITicketManagerDto> ticketManagerDto = ticketService.findTicketManagerById(id);
        if (!ticketManagerDto.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ticketManagerDto, HttpStatus.OK);
    }

    /**
     * creator
     * Võ Văn Tý
     * Lấy điểm và lấy tên khách hàng
     */
    @GetMapping("/findCustomerName/and/point")
    public ResponseEntity<?> findByCustomerNameAndPoint(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));
        Optional<ITicketTyDto> ticketPage = ticketService.findByCustomerNameAndPoint(username);
        if (ticketPage.isPresent()) {
            return new ResponseEntity<>(ticketPage, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    /**
     * creator
     * Võ Văn Tý
     * Vé đã đặt
     */
    @GetMapping("/history/booking")
    public ResponseEntity<Page<ITicketTyDto>> showListBookingTicket(Pageable pageable, HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));
        System.out.println(username);
        Page<ITicketTyDto> ticketPage = ticketService.findAllBookingTickets(pageable, username);
        if (ticketPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ticketPage, HttpStatus.OK);
    }

    /**
     * creator
     * Võ Văn Tý
     * Vé đã hủy
     */
    @GetMapping("/history/canceled")
    public ResponseEntity<Page<ITicketTyDto>> showListCanceledTicket(@PageableDefault(value = 5) Pageable pageable, HttpServletRequest request) {
//        String username = ((MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        String headerAuth = request.getHeader("Authorization");
        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));
        Page<ITicketTyDto> ticketPage = ticketService.findAllCanceledTickets(pageable, username);
        if (ticketPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ticketPage, HttpStatus.OK);
    }


    /**
     * creator
     * Võ Văn Tý
     * lịch sử điểm cộng tìm kiếm theo ngày
     */
    @GetMapping("/history/point")
    public ResponseEntity<Page<ITicketTyDto>> showListHistoryPoint(
            Pageable pageable,
            @RequestParam(value = "startTime", defaultValue = "0000-00-00", required = false) String startTime,
            @RequestParam(value = "endTime", defaultValue = "3000-11-04", required = false) String endTime,
            @RequestParam(value = "point", defaultValue = "0") int point,
            HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));
        Page<ITicketTyDto> historyPointSearch;
        System.out.println(point);

        if (point == 0) {
            historyPointSearch = ticketService.findAllHistoryPoint(username, startTime, endTime, pageable);
        } else if (point > 0) {
            historyPointSearch = ticketService.findAllOfPointsAdded(username, startTime, endTime, pageable);
        } else {
            historyPointSearch = ticketService.findAllOfUsePoints(username, startTime, endTime, pageable);
        }


        if (historyPointSearch.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(historyPointSearch, HttpStatus.OK);
    }



    /**
     * creator
     * Võ Văn Tý
     * xóa vé đang trạng thái chờ nhận vé
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Ticket> deleteTicket(@PathVariable Integer id) {
        Optional<Ticket> ticket = ticketService.findTicketById(id);
        System.out.println();
        if (ticket.isPresent()) {
            ticketService.deleteTicket(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/findUsername")
    public ResponseEntity<?> showUsername(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        String username = jwtTokenUtil.getUsernameFromJwtToken(headerAuth.substring(7));
        System.out.println(username);
        Optional<User> user = userService.showUsername(username);
        if (user.isPresent()) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
