package projectbackend.repository.decentralization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import projectbackend.model.decentralization.Role;

import java.util.List;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Integer> {
    @Query(value = "select * from role", nativeQuery = true)
    List<Role> finAllRole();

    @Modifying
    @Transactional
    @Query(value = "insert into user_role (username, role_id) values (:email, 3)", nativeQuery = true)
    void insertRoleGmail(String email);

    @Query(value = "select role.* from role " +
            "join user_role on role.id = user_role.role_id where user_role.username =:username", nativeQuery = true)
    List<Role> findRoleByUsername(@Param("username") String username);
}
