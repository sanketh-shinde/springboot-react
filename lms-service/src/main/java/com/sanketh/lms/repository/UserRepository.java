package com.sanketh.lms.repository;

import com.sanketh.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmailId(String emailId);

    Optional<User> findByEmailIdAndPassword(String emailId, String password);

}
