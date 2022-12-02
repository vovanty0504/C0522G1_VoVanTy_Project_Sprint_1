package projectbackend.service.employee.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import projectbackend.model.employee.Employee;
import projectbackend.repository.decentralization.IUserRepository;
import projectbackend.repository.employee.IEmployeeRepository;
import projectbackend.service.employee.IEmployeeService;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    private IEmployeeRepository employeeRepository;

    @Autowired
    private IUserRepository userRepository;


    @Override
    public Page<Employee> findAllEmployee(Pageable pageable, String searchName, String searchIdCard, String searchPhoneNumber) {
        return this.employeeRepository.findEmployeeByAll(pageable, searchName, searchIdCard, searchPhoneNumber);
    }

    @Override
    public void deleteEmployee(Integer id) {
        employeeRepository.deleteEmployeeById(id);
        employeeRepository.updateUserById(id);
    }

    @Override
    public void saveEmployee(Employee employee) {
        employeeRepository.saveEmployee(employee);
    }


    @Override
    public Optional<Employee> findEmployeeById(Integer id) {
        return employeeRepository.findEmployeeById(id);
    }

    @Override
    public Optional<Employee> findById(Integer id) {
        return employeeRepository.findById(id);
    }

    @Transactional
    @Override
    public void updateEmployee(Employee employee) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        employeeRepository.updatePassword(passwordEncoder.encode(employee.getUser().getPassword()),employee.getUser().getUsername());
        employeeRepository.save(employee);
    }
}