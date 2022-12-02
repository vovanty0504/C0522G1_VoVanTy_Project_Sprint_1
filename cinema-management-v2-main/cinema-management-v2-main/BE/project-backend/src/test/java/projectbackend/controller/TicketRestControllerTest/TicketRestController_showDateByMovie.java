package projectbackend.controller.TicketRestControllerTest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TicketRestController_showDateByMovie {
    @Autowired
    private MockMvc mockMvc;

    // test idMovie = null => Bad request;
    @Test
    public void showDateByMovie_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/show-date/null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    // test idMovie = "" => Not found;
    @Test
    public void showDateByMovie_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/show-date/"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    // test idMovie = 1000 => No content;
    @Test
    public void showDateByMovie_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/show-date/1000"))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    // test idMovie = 1 => OK;
    @Test
    public void showDateByMovie_4() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/show-date/1"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
