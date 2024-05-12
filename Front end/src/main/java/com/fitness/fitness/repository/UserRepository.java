package com.fitness.fitness.repository;

import com.fitness.fitness.entity.User;
import com.fitness.fitness.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findFirstByEmail(String email);

    User findByUserRole(UserRole userRole);
}
