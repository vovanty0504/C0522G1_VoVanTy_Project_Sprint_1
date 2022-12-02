package projectbackend.repository.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import projectbackend.model.employee.Employee;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
public interface IEmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query(value = "select * from employee where name like concat('%', :searchVal, '%') and is_delete = 0 ", nativeQuery = true,
            countQuery = "select count(*) from (select * from employee where name like concat('%', :searchVal, '%') and is_delete = 0 ) employee")
    Page<Employee> findEmployeeByNameContaining(Pageable pageable, @Param("searchVal") String search);

    @Query(value = "select * from employee where name like %:nameSearch% and id_card like %:idCardSearch% and phone_number like %:phoneNumberSearch% and is_delete = 0 ", nativeQuery = true,
            countQuery = "select count(*) from (select * from employee where name like  %:nameSearch% and id_card like %:idCardSearch% and phone_number like %:phoneNumberSearch% and is_delete = 0 ) employee")
    Page<Employee> findEmployeeByAll(Pageable pageable,
                                     @Param("nameSearch") String nameSearch,
                                     @Param("idCardSearch") String idCardSearch,
                                     @Param("phoneNumberSearch") String phoneNumberSearch);


    @Modifying
    @Transactional
    @Query(value = " update employee set is_delete = 1 where id = :id ", nativeQuery = true)
    void deleteEmployeeById(int id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE `user` SET `user`.is_delete = 1 WHERE username IN (SELECT temp.username FROM (SELECT `user`.username FROM `user` JOIN employee ON employee.username = `user`.username WHERE employee.id = :id) temp); ", nativeQuery = true)
    void updateUserById(int id);


//    Huy


    @Query(value = "select e.id, e.address, e.day_of_birth, e.email, e.gender, " +
            " e.id_card,  e.image , e.name, e.phone_number, is_delete, e.username "
            + " from employee as e where id =:id and is_delete = 0 ", nativeQuery = true)
    Optional<Employee> findEmployeeById(@Param("id") Integer id);


    @Modifying
    @Query(value = "call sp_insert_employee( :#{#e.address}, :#{#e.dayOfBirth}, :#{#e.email}," +
            " :#{#e.gender}, :#{#e.idCard}, :#{#e.image}, :#{#e.name}, :#{#e.phoneNumber}, " +
            " :#{#e.user.username}, :#{#e.user.password})", nativeQuery = true)
    void saveEmployee(@Param("e") Employee employee);

    @Modifying
    @Query(value = "UPDATE employee SET address = :#{#u.address}," +
            "day_of_birth = :#{#u.dayOfBirth}, " +
            "email = :#{#u.email}," +
            " gender = :#{#u.gender}, " +
            "id_card = :#{#u.idCard},  " +
            "image = :#{#u.image}, " +
            "name = :#{#u.name}, " +
            "phone_number = :#{#u.phoneNumber}, " +
            " is_delete = 0 " +
            "WHERE id = :#{#u.id}", nativeQuery = true)
    void updateEmployee(@Param("u") Employee employee);

    @Modifying
    @Query(value = "update user set  password =:password where username = :username and is_delete = 0 ", nativeQuery = true)
    void updatePassword(@Param("password") String password, @Param("username") String username);

    @Query(value = "select * from employee where employee.username =:username and is_delete = 0", nativeQuery = true)
    Optional<Employee> findByUsername(@Param("username") String username);
}