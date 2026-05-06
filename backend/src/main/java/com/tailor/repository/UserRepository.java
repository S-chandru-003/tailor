package com.tailor.repository;

import com.tailor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(User.Role role);
    List<User> findByRoleAndCity(User.Role role, String city);
    List<User> findByRoleAndState(User.Role role, String state);
}
