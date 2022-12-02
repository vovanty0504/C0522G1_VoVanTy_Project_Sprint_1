package projectbackend.controller.TicketRestControllerTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import projectbackend.dto.ticket.TicketDto;
import projectbackend.model.customer.Customer;
import projectbackend.model.ticket.SeatDetail;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TicketRestController_addPendingTicket {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // test all [item] => OK;
    @Test
    public void addPendingTicket_18() throws Exception {
        TicketDto ticketDto = new TicketDto();
        ticketDto.setTicketBookingTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date().getTime()));

        Customer customer = new Customer();
        customer.setId(1);
        ticketDto.setCustomer(customer);

        SeatDetail seatDetail = new SeatDetail();
        seatDetail.setId(1);
        ticketDto.setSeatDetail(seatDetail);

        this.mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/booking-ticket/add-pending-ticket")
                .content(this.objectMapper.writeValueAsString(ticketDto))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
