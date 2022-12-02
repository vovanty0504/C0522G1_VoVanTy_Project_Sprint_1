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

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TicketRestController_editTicket {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    //test statusTicket = null => NOT Found
    @Test
    public void editTicket_statusTicket_13() throws Exception {
        TicketDto ticketDto = new TicketDto();
        ticketDto.setStatusTicket(null);
        this.mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v3/ticket/edit/1")
                        .content(this.objectMapper.writeValueAsString(ticketDto))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }


    //test statusTicket = number => OK
    @Test
    public void editTicket_statusTicket_14() throws Exception {
        TicketDto ticketDto = new TicketDto();
        ticketDto.setStatusTicket(2);
        this.mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v3/ticket/edit/1")
                        .content(this.objectMapper.writeValueAsString(ticketDto))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
