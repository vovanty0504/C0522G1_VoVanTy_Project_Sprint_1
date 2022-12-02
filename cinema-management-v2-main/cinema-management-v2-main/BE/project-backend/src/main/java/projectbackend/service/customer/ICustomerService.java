package projectbackend.service.customer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import projectbackend.dto.customer.ICustomerDto;
import projectbackend.dto.customer.ICustomerStatementDto;
import projectbackend.model.customer.Customer;
import projectbackend.model.decentralization.User;

import java.util.List;
import java.util.Optional;

public interface ICustomerService {

    List<Customer> findAll();

    Optional<ICustomerDto> findCustomerByUsername(String username);

    Optional<Customer> findByIdCustomer(Integer id);

    void update(Customer customer, String username);

    void saveCustomerByUser(Customer customer);

    void saveCustomer(Customer customer);

    Page<Customer> searchCustomer(String nameSearch, String addressSearch, String phoneSearch, Pageable pageable);

    void updatePassword(User user, String newPassword);

    /**
     * creator: Phan Phước Đại
     * date:11/11/2022
     * method use statistical top customer positive
     */
    List<ICustomerStatementDto> getCustomerTop(int numberMonth);

    /*
    Đạt Phạm
     */
    Customer findFakeMail(String email);

    int saveCreateGmail(Customer customer);

    Customer findById(Integer id);

    List<Integer> findAllCusId();

    Customer findByUsername(String username);


}