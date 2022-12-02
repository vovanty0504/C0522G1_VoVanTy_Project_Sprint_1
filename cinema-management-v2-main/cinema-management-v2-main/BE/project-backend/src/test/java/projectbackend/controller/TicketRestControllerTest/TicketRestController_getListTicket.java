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
public class TicketRestController_getListTicket {

    @Autowired
    private MockMvc mockMvc;

    // test page = null => page = 0;
    @Test
    public void getListTicket_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?page=null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    // test page ="" => page =0;
    @Test
    public void getListTicket_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?page="))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    //test page = 2 => No content
    @Test
    public void getListTicket_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?page=2"))
                .andDo(print())
                .andExpect(status().isNoContent());
    }
    //test page = 0 => Ok
    @Test
    public void getListTicket_4() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?page=0"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("totalPages").value(2))
                .andExpect(jsonPath("totalElements").value(28));
    }
    // test ticketId = null => ticketId = 0;
    @Test
    public void getListTicket_searchTicketId_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?ticketId=null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    // test ticketId ="" => ticketId =0;
    @Test
    public void getListTicket_searchTicketId_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?ticketId="))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    //test ticketId = 1 => Ok
    @Test
    public void getListTicket_searchTicketId_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?ticketId=1"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    // test customerId = null => customerId = 0;
    @Test
    public void getListTicket_searchCustomerId_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?customerId=null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    // test customerId ="" => customerId =0;
    @Test
    public void getListTicket_searchCustomerId_2()  throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?customerId="))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    //test customerId = 1 => Ok
    @Test
    public void getListTicket_searchCustomerId_3()  throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?customerId=1"))
                .andDo(print())
                .andExpect(status().isOk());
    }
    // test idCard = null => idCard = 0;
    @Test
    public void getListTicket_searchIdCard_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?idCard=null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    // test idCard ="" => idCard =0;
    @Test
    public void getListTicket_searchIdCard_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?idCard="))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    //test idCard = 926846990 => Ok
    @Test
    public void getListTicket_searchIdCard_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?idCard=926846990"))
                .andDo(print())
                .andExpect(status().isOk());
    }
    // test phoneNumber = null => phoneNumber = 0;
    @Test
    public void getListTicket_searchPhoneNumber_1() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?phoneNumber=null"))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    // test phoneNumber ="" => phoneNumber =0;
    @Test
    public void getListTicket_searchPhoneNumber_2() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?phoneNumber="))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    //test phoneNumber = 0905128238 => phoneNumber =2
    @Test
    public void getListTicket_searchPhoneNumber_3() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?phoneNumber=0905128238"))
                .andDo(print())
                .andExpect(status().isOk());
    }
    @Test
    public void getListTicket_searchAll_4() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v3/ticket/list?ticketId=4&customerId=16&isCard=926846990&phoneNumber=0905128238"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("totalPages").value(1))
                .andExpect(jsonPath("totalElements").value(1))
                .andExpect(jsonPath("content[0].ticketId").value(4))
                .andExpect(jsonPath("content[0].customerId").value(16))
                .andExpect(jsonPath("content[0].idCard").value("926846990"))
                .andExpect(jsonPath("content[0].phoneNumber").value("0905128238"));

    }
}
