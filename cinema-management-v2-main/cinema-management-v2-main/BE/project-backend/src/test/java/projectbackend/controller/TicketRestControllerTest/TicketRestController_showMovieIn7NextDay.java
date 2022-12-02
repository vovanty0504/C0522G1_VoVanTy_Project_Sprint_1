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
public class TicketRestController_showMovieIn7NextDay {
    @Autowired
    private MockMvc mockMvc;

    // test size > 0 => OK;
    @Test
    public void showMovieIn7NextDay_6() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/booking-ticket/movie"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
