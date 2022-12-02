package projectbackend.controller.TicketRestControllerTest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TicketRestController_updateStatusTicket {

    @Autowired
    private MockMvc mockMvc;

    // test id = null => Not Found
    @Test
    public void updateStatusTicket_19() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/ticket/update-ticket/"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    // test id = "" => Not Found
    @Test
    public void updateStatusTicket_20() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/ticket/update-ticket/"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    // test id = "" => Not Found
    @Test
    public void updateStatusTicket_21() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/ticket/update-ticket/1000"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    // test id = 1 => Ok
    @Test
    public void updateStatusTicket_22() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/ticket/update-ticket/1"))
                .andDo(print())
                .andExpect(status().isOk());
    }

}
