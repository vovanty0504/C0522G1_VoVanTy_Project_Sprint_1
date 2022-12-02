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
public class TicketRestController_showTimeByShowDate {
    @Autowired
    private MockMvc mockMvc;

    // test showDate = null => Bad request;
    @Test
    public void showTimeByShowDate_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/showtime/null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    // test showDate = "" => Not found;
    @Test
    public void showTimeByShowDate_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/showtime/"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    // test showDate = "2022-01-01" => No content;
    @Test
    public void showTimeByShowDate_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/showtime/2022-01-01"))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    // test showDate = "2022-11-13" => OK;
    @Test
    public void showTimeByShowDate_4() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/showtime/2022-11-13"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
