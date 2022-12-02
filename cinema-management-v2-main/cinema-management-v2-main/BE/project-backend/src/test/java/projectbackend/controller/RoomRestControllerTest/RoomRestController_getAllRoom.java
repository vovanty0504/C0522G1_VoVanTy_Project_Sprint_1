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
public class RoomRestController_getAllRoom {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getAllRoom_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("api/admin/roomRest/"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void getAllRoom_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("api/admin/roomRest/?name=null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void getAllRoom_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("api/admin/roomRest/?name=PC01"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("content[0].id").value(1))
                .andExpect(jsonPath("content[0].name").value("PC01"))
                .andExpect(jsonPath("content[0].maximumSeatsInRoom").value(64));
    }
}
