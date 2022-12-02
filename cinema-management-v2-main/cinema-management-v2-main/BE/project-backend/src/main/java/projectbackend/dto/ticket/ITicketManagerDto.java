package projectbackend.dto.ticket;

import java.sql.Date;

public interface ITicketManagerDto {
    String getTicketId();
    String getCustomerId();
    String getCustomerName();
    String getIdCard();
    String getPhoneNumber();
    String getMovieName();
    Date getDateProjection();
    String getStartTime();
    String getRoomName();
    String getSeatName();
    String getStatusTicket();
}