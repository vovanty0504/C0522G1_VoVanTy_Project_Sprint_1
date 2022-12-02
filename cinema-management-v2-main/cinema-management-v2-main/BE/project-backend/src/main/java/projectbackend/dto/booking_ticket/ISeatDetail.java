package projectbackend.dto.booking_ticket;

public interface ISeatDetail {
    Integer getId();
    Integer getRoomId();
    Integer getSeatTypeId();
    String getSeatName();
    Integer getPrice();
    Integer getShowTimeId();
    Boolean getSeatStatus();
}
