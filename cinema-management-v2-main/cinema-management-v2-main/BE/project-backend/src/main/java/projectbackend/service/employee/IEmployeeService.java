package projectbackend.service.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import projectbackend.model.employee.Employee;

import java.util.Optional;

public interface IEmployeeService {

    void deleteEmployee(Integer id);

    void saveEmployee(Employee employee );

    Optional<Employee> findEmployeeById(Integer id);

    Optional<Employee> findById(Integer id);

    void updateEmployee(Employee employee);

    Page<Employee> findAllEmployee(Pageable pageable, String searchName, String searchIdCard, String searchPhoneNumber);

}