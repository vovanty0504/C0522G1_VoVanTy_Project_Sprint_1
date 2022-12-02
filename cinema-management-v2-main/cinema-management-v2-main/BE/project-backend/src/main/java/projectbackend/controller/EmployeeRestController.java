package projectbackend.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import projectbackend.dto.employee.EmployeeDto;
import projectbackend.model.employee.Employee;
import projectbackend.service.decentralization.IUserService;
import projectbackend.service.employee.IEmployeeService;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/employee")
public class EmployeeRestController {
    @Autowired
    private IEmployeeService employeeService;

    @Autowired
    private IUserService userService;

    @GetMapping("/list")
    public ResponseEntity<Page<Employee>> findAllEmployee(@PageableDefault(size = 5) Pageable pageable,
                                                          @RequestParam(value = "name", defaultValue = "") String nameSearch,
                                                          @RequestParam(value = "idCard", defaultValue = "") String idCardSearch,
                                                          @RequestParam(value = "phoneNumber", defaultValue = "") String phoneNumberSearch) {
        Page<Employee> employeePage = employeeService.findAllEmployee(pageable, nameSearch, idCardSearch, phoneNumberSearch);
        if (employeePage.hasContent()) {
            return new ResponseEntity<>(employeePage, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable int id) {
        this.employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    ;

    @PostMapping("/create")
    public ResponseEntity<?> createEmployee(@Valid @RequestBody EmployeeDto employeeDto,
                                            BindingResult bindingResult,
                                            String username) {
        new EmployeeDto().validate(employeeDto, bindingResult);
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(),
                    HttpStatus.BAD_REQUEST);
        }

        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeDto, employee);
        employee.getUser().setPassword(new BCryptPasswordEncoder().encode(employeeDto.getUser().getPassword()));
        employeeService.saveEmployee(employee);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<?> saveEditing(@Valid @RequestBody EmployeeDto employeeDto,
                                         @PathVariable Integer id,
                                         BindingResult bindingResult) {
        new EmployeeDto().validate(employeeDto, bindingResult);
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(),
                    HttpStatus.BAD_REQUEST);
        }

        Optional<Employee> employee = employeeService.findEmployeeById(id);
        if (employee.isPresent()) {
            BeanUtils.copyProperties(employeeDto, employee.get());
            employeeService.updateEmployee(employee.get());
            return new ResponseEntity<>(employee.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployee(@PathVariable Integer id) {
        Optional<Employee> employee = employeeService.findEmployeeById(id);
        if (!employee.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        EmployeeDto employeeDto = new EmployeeDto();
        BeanUtils.copyProperties(employee.get(), employeeDto);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

}