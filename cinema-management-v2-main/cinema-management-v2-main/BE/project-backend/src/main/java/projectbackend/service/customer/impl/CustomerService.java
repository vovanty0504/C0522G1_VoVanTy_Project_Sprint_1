package projectbackend.service.customer.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projectbackend.dto.customer.ICustomerDto;
import projectbackend.dto.customer.ICustomerStatementDto;
import projectbackend.model.customer.Customer;
import projectbackend.model.decentralization.User;
import projectbackend.repository.customer.ICustomerRepository;
import projectbackend.service.customer.ICustomerService;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService implements ICustomerService {


    @Autowired
    private ICustomerRepository customerRepository;


    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }


    @Override
    public Optional<ICustomerDto> findCustomerByUsername(String username) {
        return customerRepository.findCustomerByUsername(username);
    }


    @Override
    public void saveCustomer(Customer customer) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        customerRepository.setPassword(customer.getUser().getUsername(),
                passwordEncoder.encode(customer.getUser().getPassword()));
        customerRepository.save(customer);
    }


    @Override
    public Optional<Customer> findByIdCustomer(Integer id) {
        return customerRepository.findByIdCustomer(id);
    }

    @Override
    public void update(Customer customer, String username) {
        customerRepository.updateCustomer(customer, username);
    }

    @Override
    public void saveCustomerByUser(Customer customer) {
        customerRepository.saveCustomer(customer);
    }

    @Override
    public Page<Customer> searchCustomer(String nameSearch, String addressSearch, String phoneSearch, Pageable pageable) {
        return customerRepository.searchCustomer(nameSearch, addressSearch, phoneSearch, pageable);
    }

    @Override
    public void updatePassword(User user, String newPassword) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        System.out.println(encodedPassword);

    }

    /**
     * creator: Phan Phước Đại
     * date:11/11/2022
     * method use statistical top customer positive
     */
    @Override
    public List<ICustomerStatementDto> getCustomerTop(int numberMonth) {
        if (numberMonth == 0) {
            return customerRepository.getCustomerTop();
        }
        return customerRepository.getCustomerTop(numberMonth);
    }

    /**
    Đạt
     */
    @Override
    public Customer findFakeMail(String email) {
        return customerRepository.findFakeMail(email);
    }

    @Override
    public int saveCreateGmail(Customer customer) {
        return customerRepository.saveCreateGmail(customer.getName(), customer.getEmail());
    }

    @Override
    public Customer findById(Integer id) {
        return customerRepository.findById(id).orElse(null);
    }

    @Override
    public List<Integer> findAllCusId() {
        return customerRepository.findAllCustomerIdById();
    }

    @Override
    public Customer findByUsername(String username) {
        return customerRepository.findByUsername(username);
    }
}