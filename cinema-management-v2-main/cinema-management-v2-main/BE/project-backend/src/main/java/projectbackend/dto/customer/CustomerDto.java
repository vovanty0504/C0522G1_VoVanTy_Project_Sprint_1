package projectbackend.dto.customer;


import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import projectbackend.model.customer.CustomerType;
import projectbackend.model.decentralization.User;

import javax.validation.constraints.*;

public class CustomerDto implements Validator {
    private Integer id;

    @NotBlank(message = "vui lòng nhập tên!")
    @Size(max = 28)
    private String name;

    private boolean isDelete;

    @NotNull
    private String dayOfBirth;

    @NotNull(message = "Vui lòng chọn giới tính.")
    private Integer gender;

    @NotBlank(message = "Số CMND/CCCD không được để trống.")
    @Pattern(regexp = "^(\\d{9}|\\d{12})| *$",
            message = "Số CMND/CCCD phải đúng định dạng XXXXXXXXX hoặc XXXXXXXXXXXX (X là số 0-9).")
    private String idCard;

    @NotBlank(message = "Email không được để trống.")
    @Email(message = "Địa chỉ email phải đúng định dạng.")
    private String email;

    @NotBlank(message = "Địa chỉ không được để trống.")
    private String address;

    @NotNull
    @Size(max = 14)
    @NotBlank(message = "Số điện thoại không được để trống.")
    private String phoneNumber;

    private CustomerType customerType;
    private User user;

    public CustomerDto() {
    }

    public CustomerDto(Integer id, String name, boolean isDelete, String dayOfBirth, Integer gender, String idCard,
                       String email, String address, String phoneNumber, CustomerType customerType, User user) {
        this.id = id;
        this.name = name;
        this.isDelete = isDelete;
        this.dayOfBirth = dayOfBirth;
        this.gender = gender;
        this.idCard = idCard;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.customerType = customerType;
        this.user = user;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public String getDayOfBirth() {
        return dayOfBirth;
    }

    public void setDayOfBirth(String dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public void setCustomerType(CustomerType customerType) {
        this.customerType = customerType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        CustomerDto customerDto = (CustomerDto) target;

        if (!customerDto.name.matches("[A-Za-z ]+")){
            errors.rejectValue("name", "name.invalidFormat");

        }
    }
}