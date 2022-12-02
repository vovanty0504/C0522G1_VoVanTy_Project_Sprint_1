package projectbackend.dto.ticket;

import java.sql.Date;

public interface ITicketDto {
    String getImage();
    String getNameMovie();
    String getNameCustomer();
    String getEmail();
    String getIdCard();
    String getPhoneNumber();
    String getNameRoom();
    Date getDateProjection();
    String getStartTime();
    String getNameSeat();
    Integer getPrice();

}
