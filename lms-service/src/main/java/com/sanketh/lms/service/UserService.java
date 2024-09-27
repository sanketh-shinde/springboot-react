package com.sanketh.lms.service;

import com.sanketh.lms.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    ResponseEntity<?> registerUser(User user);

    //ResponseEntity<?> updateUserEmail(String emailId);

//    ResponseEntity<?> updateUserPassword(String emailId, String password, String newPassword);

    ResponseEntity<?> updateUser(User user);

}
