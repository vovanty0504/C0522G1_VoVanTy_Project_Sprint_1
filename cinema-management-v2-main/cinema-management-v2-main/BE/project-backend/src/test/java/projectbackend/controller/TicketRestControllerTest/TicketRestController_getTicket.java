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
public class TicketRestController_getTicket {

    @Autowired
    private MockMvc mockMvc;

    // test id = null => Not Found
    @Test
    public void getInfoTicket_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                .get("/api/ticket/list-ticket/"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    // test id = "" => Not Found
    @Test
    public void getInfoTicket_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/ticket/list-ticket/"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    // id = 10000 => Not Found
    @Test
    public void getInfoTicket_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/ticket/list-ticket/10000"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    // id = 1 => Ok
    @Test
    public void getInfoTicket_4() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/ticket/list-ticket/1"))
                .andDo(print())
                .andExpect(status().isOk());
    }


}
