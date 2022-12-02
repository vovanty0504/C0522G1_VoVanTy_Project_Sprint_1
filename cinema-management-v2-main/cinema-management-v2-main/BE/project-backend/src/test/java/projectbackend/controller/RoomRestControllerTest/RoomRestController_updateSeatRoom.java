package projectbackend.controller.RoomRestControllerTest;

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
public class RoomRestController_updateSeatRoom {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void updateSeatRoom_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .patch("api/admin/roomRest/updateStatusSeatRoom/"))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void updateSeatRoom_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .patch("api/admin/roomRest/updateStatusSeatRoom/null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void updateSeatRoom_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .patch("api/admin/roomRest/updateStatusSeatRoom/1000"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void updateSeatRoom_4() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .patch("api/admin/roomRest/updateStatusSeatRoom/10"))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
