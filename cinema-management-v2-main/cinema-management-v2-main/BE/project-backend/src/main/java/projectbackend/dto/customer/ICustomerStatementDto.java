package projectbackend.dto.customer;

public interface ICustomerStatementDto {

    Integer getId();

    String getName();

    int getCountTicket();

    int getTotalMoney();

    int getAccumulation();
}
