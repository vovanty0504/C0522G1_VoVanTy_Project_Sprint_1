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
public class TicketRestController_showAllSeatDetail {
    @Autowired
    private MockMvc mockMvc;

    // test idShowTime = null => Bad request;
    @Test
    public void showAllSeatDetail_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/seat-detail/null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    // test idShowTime = "" => Not found;
    @Test
    public void showAllSeatDetail_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/seat-detail/"))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    // test idShowTime = 9999 => No content;
    @Test
    public void showAllSeatDetail_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/seat-detail/9999"))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    // test idShowTime = 1 => OK;
    @Test
    public void showAllSeatDetail_4() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/seat-detail/1"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
