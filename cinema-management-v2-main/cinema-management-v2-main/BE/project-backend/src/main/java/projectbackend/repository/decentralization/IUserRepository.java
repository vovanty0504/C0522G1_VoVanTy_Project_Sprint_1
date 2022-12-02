package projectbackend.repository.decentralization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import projectbackend.dto.decentralization.IUserEmailDto;
import projectbackend.dto.decentralization.UserDto;
import projectbackend.model.decentralization.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, String> {
    User findByUsername(String name);

    @Query(value = "SELECT username from  user where username = ?1", nativeQuery = true)
    String existsByUserName(String username);

    @Query(value = "SELECT username, email " +
            "from  employee where email =:email " +
            "union all " +
            "select  username, email " +
            "from  customer " +
            "where email =:email", nativeQuery = true)
    Optional<IUserEmailDto> findByEmail(String email);

    @Query(value = "SELECT username, email " +
            "from  employee where username =:username " +
            "union all " +
            "select  username, email " +
            "from  customer " +
            "where username =:username", nativeQuery = true)
    Optional<IUserEmailDto> findByUsernameDto(String username);


    @Modifying
    @Transactional
    @Query(value = "update user set password =:newPassword where username =:username", nativeQuery = true)
    void saveNewPassword(@Param("newPassword") String newPassword, @Param("username") String username);

    @Query(value = "select * from user where user.username =:username", nativeQuery = true)
    Optional<User> showUsername(@Param("username") String username);

    @Query(value = "select * from user where username like %:username%", nativeQuery = true)
    Optional<User> findUserByUsername(@Param("username") String username);

    @Modifying
    @Transactional
    @Query(value = " update user set password =:#{#u.password} where username =:username", nativeQuery = true)
    void saveUser(@Param("u") User user, @Param("username") String username);

}
