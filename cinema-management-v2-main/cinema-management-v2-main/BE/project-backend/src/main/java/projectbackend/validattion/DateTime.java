package projectbackend.validattion;

import org.springframework.validation.Errors;
import projectbackend.dto.employee.EmployeeDto;

import java.time.LocalDate;
import java.time.Period;

public class DateTime {
    public static void checkAge(EmployeeDto employeeDto, Errors errors) {
        try {
            String age = employeeDto.getDayOfBirth();
            LocalDate localDate = LocalDate.parse(age);
            int checkAge = Period.between(localDate, LocalDate.now()).getYears();
            if (checkAge < 18 || checkAge > 80) {
                errors.rejectValue("dayOfBirth", "", "age > 18  and age < 80");
            }
        } catch (Exception e) {
            errors.rejectValue("dayOfBirth", "", "please input");
        }
    }
}