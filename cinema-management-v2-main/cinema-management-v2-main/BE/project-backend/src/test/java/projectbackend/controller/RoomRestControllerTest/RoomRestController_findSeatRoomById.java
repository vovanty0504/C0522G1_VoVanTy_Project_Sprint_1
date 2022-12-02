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
public class RoomRestController_findSeatRoomById {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void findSeatRoomById_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("api/admin/roomRest/seat-room/null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void findSeatRoomById_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("api/admin/roomRest/seat-room/"))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @Test
    public void findSeatRoomById_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("api/admin/roomRest/seat-room/5"))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

    @Test
    public void findSeatRoomById_4() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("api/admin/roomRest/seat-room/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("content[0].id").value(1))
                .andExpect(jsonPath("content[0].seatType").value(1))
                .andExpect(jsonPath("content[0].seatName").value("A1"))
                .andExpect(jsonPath("content[0].seatTypeName").value("Ghế Thường"));
    }

}
